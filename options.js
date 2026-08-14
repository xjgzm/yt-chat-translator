const DEFAULTS = {
  enabled: true,
  targetLang: (navigator.language || "en").split("-")[0],
  provider: "google",
  apiKey: "",
  openrouterModel: "openai/gpt-4o-mini",
  customSkipWords: "",
};

const els = {
  enabled: document.getElementById("enabled"),
  targetLang: document.getElementById("targetLang"),
  provider: document.getElementById("provider"),
  deeplKey: document.getElementById("deeplKey"),
  openrouterKey: document.getElementById("openrouterKey"),
  openrouterModel: document.getElementById("openrouterModel"),
  customSkipWords: document.getElementById("customSkipWords"),
  save: document.getElementById("save"),
  status: document.getElementById("status"),
};

function updateProviderFields() {
  document
    .querySelectorAll(".provider-fields")
    .forEach((el) => el.classList.remove("active"));
  if (els.provider.value === "deepl") {
    document.getElementById("fields-deepl").classList.add("active");
  } else if (els.provider.value === "openrouter") {
    document.getElementById("fields-openrouter").classList.add("active");
  }
}

function load() {
  chrome.storage.sync.get(DEFAULTS, (items) => {
    els.enabled.checked = !!items.enabled;
    if ([...els.targetLang.options].some((o) => o.value === items.targetLang)) {
      els.targetLang.value = items.targetLang;
    }
    els.provider.value = items.provider;
    if (items.provider === "deepl") els.deeplKey.value = items.apiKey || "";
    if (items.provider === "openrouter") els.openrouterKey.value = items.apiKey || "";
    els.openrouterModel.value = items.openrouterModel || DEFAULTS.openrouterModel;
    els.customSkipWords.value = items.customSkipWords || "";
    updateProviderFields();
  });
}

function save() {
  const provider = els.provider.value;
  let apiKey = "";
  if (provider === "deepl") apiKey = els.deeplKey.value.trim();
  if (provider === "openrouter") apiKey = els.openrouterKey.value.trim();

  const data = {
    enabled: els.enabled.checked,
    targetLang: els.targetLang.value,
    provider,
    apiKey,
    openrouterModel: els.openrouterModel.value.trim() || DEFAULTS.openrouterModel,
    customSkipWords: els.customSkipWords.value.trim(),
  };

  chrome.storage.sync.set(data, () => {
    const savedMsg = (window.YCT_OPTIONS_I18N && window.YCT_OPTIONS_I18N.savedMessage) || "Saved \u2713";
    els.status.textContent = savedMsg;
    setTimeout(() => (els.status.textContent = ""), 2000);
  });
}

els.provider.addEventListener("change", updateProviderFields);
els.save.addEventListener("click", save);

load();
