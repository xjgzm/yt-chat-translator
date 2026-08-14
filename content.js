// YouTube Live Chat Translator - content script
// Runs inside the live_chat / live_chat_replay iframe.

(function () {
  "use strict";

  const DEFAULT_SETTINGS = {
    enabled: true,
    targetLang: (navigator.language || "en").split("-")[0],
    provider: "google", // "google" | "deepl" | "openrouter"
    apiKey: "",
    openrouterModel: "openai/gpt-4o-mini",
    showOriginal: true,
    customSkipWords: "", // user-defined comma-separated words to never translate
  };

  let settings = { ...DEFAULT_SETTINGS };
  const translationCache = new Map(); // text -> translated text (per session)
  const pending = new Set(); // texts currently being translated, to avoid duplicate requests

  function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
        settings = { ...DEFAULT_SETTINGS, ...items };
        resolve(settings);
      });
    });
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const key of Object.keys(changes)) {
      settings[key] = changes[key].newValue;
    }
  });

  function normalizeLang(code) {
    if (!code) return "";
    return code.toLowerCase().split("-")[0];
  }

  // --- Translation providers -------------------------------------------------

  async function translateGoogle(text, target) {
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
      encodeURIComponent(target) +
      "&dt=t&q=" +
      encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Google Translate request failed: " + res.status);
    const data = await res.json();
    const translated = (data[0] || []).map((seg) => seg[0]).join("");
    const detected = data[2] || "";
    return { translated, detected };
  }

  async function translateDeepL(text, target, apiKey) {
    const isFree = apiKey.endsWith(":fx");
    const base = isFree ? "https://api-free.deepl.com" : "https://api.deepl.com";
    const res = await fetch(base + "/v2/translate", {
      method: "POST",
      headers: {
        Authorization: "DeepL-Auth-Key " + apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: text,
        target_lang: target.toUpperCase(),
      }),
    });
    if (!res.ok) throw new Error("DeepL request failed: " + res.status);
    const data = await res.json();
    const t = data.translations && data.translations[0];
    return {
      translated: t ? t.text : text,
      detected: t ? (t.detected_source_language || "").toLowerCase() : "",
    };
  }

  async function translateOpenRouter(text, target, apiKey, model) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You translate live-stream chat messages. Reply with ONLY the translation into language code '" +
              target +
              "', no quotes, no explanations. If the text is already in that language, reply with the string NOTRANSLATE.",
          },
          { role: "user", content: text },
        ],
        temperature: 0.2,
        max_tokens: 200,
      }),
    });
    if (!res.ok) throw new Error("OpenRouter request failed: " + res.status);
    const data = await res.json();
    const out = data.choices?.[0]?.message?.content?.trim() || "";
    if (out === "NOTRANSLATE" || out === "") {
      return { translated: "", detected: target };
    }
    return { translated: out, detected: "" };
  }

  async function translate(text) {
    if (translationCache.has(text)) return translationCache.get(text);

    const target = normalizeLang(settings.targetLang);
    let result;
    try {
      if (settings.provider === "deepl" && settings.apiKey) {
        result = await translateDeepL(text, target, settings.apiKey);
      } else if (settings.provider === "openrouter" && settings.apiKey) {
        result = await translateOpenRouter(text, target, settings.apiKey, settings.openrouterModel);
      } else {
        result = await translateGoogle(text, target);
      }
    } catch (err) {
      console.warn("[YT Chat Translator] translation failed:", err);
      return null;
    }

    translationCache.set(text, result);
    // Keep cache from growing forever during long streams.
    if (translationCache.size > 2000) {
      const firstKey = translationCache.keys().next().value;
      translationCache.delete(firstKey);
    }
    return result;
  }

  // --- DOM handling ------------------------------------------------------------

  function extractText(messageEl) {
    // #message can contain emoji <img> tags mixed with text nodes.
    // Emoji (both standard unicode and channel-custom ones) are excluded
    // entirely - their alt text isn't reliably classifiable across
    // YouTube's markup and isn't meaningful to translate anyway.
    let text = "";
    messageEl.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === "IMG") {
          // skip - emoji image, not translatable text
        } else {
          text += node.textContent || "";
        }
      }
    });
    return text.trim();
  }

  function insertTranslation(rendererEl, messageEl, translatedText) {
    if (rendererEl.querySelector(".yct-translation")) return;
    const el = document.createElement("div");
    el.className = "yct-translation";
    el.textContent = translatedText;
    messageEl.insertAdjacentElement("afterend", el);
  }

  // Matches messages that are just laughter/reaction slang or contain no
  // actual translatable language - no point sending these to a translation
  // API (and it avoids nonsense translations of things like "wwwwww").
  function isNonLinguistic(text) {
    const t = text.trim();
    if (!t) return true;

    // Japanese-style laughter: w/ｗ repeated, optionally with 笑/草.
    if (/^[wWｗＷ]+$/.test(t)) return true;
    if (/^(笑|草|ｗ|w)+$/.test(t)) return true;

    // Common cross-language laughter/reaction slang.
    const laughterWords = new Set([
      "lol", "lmao", "lmfao", "rofl", "haha", "hahaha", "jaja", "jajaja",
      "kek", "kkk", "kkkk", "888", "666", "www",
    ]);
    if (laughterWords.has(t.toLowerCase())) return true;

    // Gaming slang used as-is across languages - not meaningful to translate.
    const gamingSlang = new Set([
      "gg", "ggwp", "wp", "gl", "glhf", "ez", "nt", "gj",
    ]);
    if (gamingSlang.has(t.toLowerCase())) return true;

    // User-defined words/phrases from the options page (comma-separated).
    const customWords = (settings.customSkipWords || "")
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
    if (customWords.includes(t.toLowerCase())) return true;

    // No letters at all (only emoji leftovers, numbers, punctuation,
    // repeated symbols like "!!!!!" or "?!?!") - nothing to translate.
    if (!/\p{L}/u.test(t)) return true;

    return false;
  }

  async function handleRenderer(rendererEl, attempt) {
    attempt = attempt || 0;
    if (!settings.enabled) return;
    if (rendererEl.dataset.yctProcessed === "1") return;

    const messageEl = rendererEl.querySelector("#message");
    if (!messageEl) {
      // Super Chat / membership renderers are more complex (amount
      // formatting, tier coloring) and can finish mounting slightly
      // after they're added to #items, so #message may not exist yet.
      // Retry a few times before giving up on this comment.
      if (attempt < 6) {
        setTimeout(() => handleRenderer(rendererEl, attempt + 1), 350);
      }
      return;
    }

    const text = extractText(messageEl);
    if (!text) {
      // Message element exists but text hasn't rendered into it yet -
      // same race as above, retry before giving up.
      if (attempt < 6) {
        setTimeout(() => handleRenderer(rendererEl, attempt + 1), 350);
        return;
      }
      rendererEl.dataset.yctProcessed = "1";
      return;
    }
    if (isNonLinguistic(text)) {
      rendererEl.dataset.yctProcessed = "1";
      return;
    }

    rendererEl.dataset.yctProcessed = "1";

    if (pending.has(text)) return;
    pending.add(text);
    const result = await translate(text);
    pending.delete(text);

    if (!result) return;

    const target = normalizeLang(settings.targetLang);
    const detected = normalizeLang(result.detected);

    // Skip if the API told us the source already matches the target,
    // or if it returned an empty translation for a same-language message.
    if (detected && detected === target) return;

    if (!result.translated || result.translated.trim() === text.trim()) return;

    insertTranslation(rendererEl, messageEl, result.translated);
  }

  const RENDERER_SELECTOR =
    "yt-live-chat-text-message-renderer, yt-live-chat-paid-message-renderer, yt-live-chat-membership-item-renderer";

  function scanExisting() {
    document.querySelectorAll(RENDERER_SELECTOR).forEach(handleRenderer);
  }

  function observeChat() {
    const itemsEl = document.querySelector("#items");
    if (!itemsEl) {
      // Chat list not mounted yet - retry shortly.
      setTimeout(observeChat, 500);
      return;
    }

    scanExisting();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const tag = node.tagName ? node.tagName.toLowerCase() : "";
          if (
            tag === "yt-live-chat-text-message-renderer" ||
            tag === "yt-live-chat-paid-message-renderer" ||
            tag === "yt-live-chat-membership-item-renderer"
          ) {
            handleRenderer(node);
          }
          // Dialogs/overlays (e.g. "this user's other messages" panel
          // opened by clicking a Super Chat) can be added as a whole
          // subtree in one go, with the renderers nested inside rather
          // than being the added node itself - catch those too.
          if (node.querySelectorAll) {
            node.querySelectorAll(RENDERER_SELECTOR).forEach(handleRenderer);
          }
        });
      }
    });

    // Observe the whole document (not just #items) with subtree:true so
    // renderers inside dialogs/overlays outside the main chat list are
    // also picked up.
    observer.observe(document.body, { childList: true, subtree: true });
  }

  loadSettings().then(observeChat);
})();
