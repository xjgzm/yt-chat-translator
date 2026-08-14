const DEFAULTS = {
  enabled: true,
  targetLang: (navigator.language || "en").split("-")[0],
};

const enabledEl = document.getElementById("enabled");
const targetLangEl = document.getElementById("targetLang");
const openOptionsEl = document.getElementById("openOptions");

chrome.storage.sync.get(DEFAULTS, (items) => {
  enabledEl.checked = !!items.enabled;
  if ([...targetLangEl.options].some((o) => o.value === items.targetLang)) {
    targetLangEl.value = items.targetLang;
  }
});

enabledEl.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: enabledEl.checked });
});

targetLangEl.addEventListener("change", () => {
  chrome.storage.sync.set({ targetLang: targetLangEl.value });
});

openOptionsEl.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});
