// Self-contained i18n for the popup only - keeps popup.js untouched.
// UI language follows the browser's own UI language, not the
// "translate to" setting (those are two different things: this is
// about which language the popup itself is displayed in).
(function () {
  "use strict";

  var STRINGS = {
    ja: {
      title: "YouTube Live Chat Translatorの設定",
      enable: "翻訳を有効にする",
      targetLang: "翻訳先の言語",
      footerPrefix: "詳細設定(APIキー・エンジン)や翻訳除外ワードの設定は",
      linkText: "オプション画面",
      footerSuffix: "から。"
    },
    en: {
      title: "YouTube Live Chat Translator Settings",
      enable: "Enable translation",
      targetLang: "Translate to",
      footerPrefix: "Advanced settings (API key, engine) and excluded words are in the",
      linkText: "Options page",
      footerSuffix: "."
    },
    ko: {
      title: "YouTube Live Chat Translator 설정",
      enable: "번역 사용",
      targetLang: "번역할 언어",
      footerPrefix: "API 키, 엔진 등 고급 설정과 번역 제외 단어는",
      linkText: "옵션 화면",
      footerSuffix: "에서 설정하세요."
    },
    zh: {
      title: "YouTube Live Chat Translator 设置",
      enable: "启用翻译",
      targetLang: "翻译目标语言",
      footerPrefix: "高级设置(API密钥、引擎)和翻译排除词请在",
      linkText: "选项页面",
      footerSuffix: "中设置。"
    },
    es: {
      title: "Configuración de YouTube Live Chat Translator",
      enable: "Activar traducción",
      targetLang: "Traducir a",
      footerPrefix: "La configuración avanzada (clave de API, motor) y las palabras excluidas están en la",
      linkText: "página de opciones",
      footerSuffix: "."
    },
    fr: {
      title: "Paramètres de YouTube Live Chat Translator",
      enable: "Activer la traduction",
      targetLang: "Traduire vers",
      footerPrefix: "Les paramètres avancés (clé API, moteur) et les mots exclus se trouvent dans la",
      linkText: "page des options",
      footerSuffix: "."
    },
    de: {
      title: "YouTube Live Chat Translator – Einstellungen",
      enable: "Übersetzung aktivieren",
      targetLang: "Übersetzen nach",
      footerPrefix: "Erweiterte Einstellungen (API-Schlüssel, Engine) und ausgeschlossene Wörter finden Sie auf der",
      linkText: "Optionsseite",
      footerSuffix: "."
    },
    pt: {
      title: "Configurações do YouTube Live Chat Translator",
      enable: "Ativar tradução",
      targetLang: "Traduzir para",
      footerPrefix: "As configurações avançadas (chave de API, mecanismo) e palavras excluídas estão na",
      linkText: "página de opções",
      footerSuffix: "."
    },
    ru: {
      title: "Настройки YouTube Live Chat Translator",
      enable: "Включить перевод",
      targetLang: "Переводить на",
      footerPrefix: "Расширенные настройки (ключ API, движок) и исключённые слова находятся на",
      linkText: "странице параметров",
      footerSuffix: "."
    },
    th: {
      title: "การตั้งค่า YouTube Live Chat Translator",
      enable: "เปิดใช้งานการแปล",
      targetLang: "แปลเป็นภาษา",
      footerPrefix: "การตั้งค่าขั้นสูง (API key, เอนจิน) และคำที่ไม่ต้องแปล อยู่ใน",
      linkText: "หน้าตัวเลือก",
      footerSuffix: ""
    },
    vi: {
      title: "Cài đặt YouTube Live Chat Translator",
      enable: "Bật dịch",
      targetLang: "Dịch sang",
      footerPrefix: "Cài đặt nâng cao (khóa API, công cụ) và từ loại trừ có trong",
      linkText: "trang Tùy chọn",
      footerSuffix: "."
    },
    id: {
      title: "Pengaturan YouTube Live Chat Translator",
      enable: "Aktifkan terjemahan",
      targetLang: "Terjemahkan ke",
      footerPrefix: "Pengaturan lanjutan (kunci API, mesin) dan kata yang dikecualikan ada di",
      linkText: "halaman Opsi",
      footerSuffix: "."
    }
  };

  function applyLang(langRaw) {
    var lang = (langRaw || "en").toLowerCase().split("-")[0];
    var s = STRINGS[lang] || STRINGS.en;
    document.getElementById("popupTitle").textContent = s.title;
    document.title = s.title;
    document.getElementById("enableLabel").textContent = s.enable;
    document.getElementById("targetLangLabel").textContent = s.targetLang;
    document.getElementById("footerPrefix").textContent = s.footerPrefix;
    document.getElementById("openOptions").textContent = s.linkText;
    document.getElementById("footerSuffix").textContent = s.footerSuffix;
    document.documentElement.lang = lang;
  }

  var browserLang =
    (typeof chrome !== "undefined" && chrome.i18n && chrome.i18n.getUILanguage
      ? chrome.i18n.getUILanguage()
      : null) ||
    navigator.language ||
    "en";
  applyLang(browserLang);
})();
