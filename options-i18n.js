// i18n for options.html. Applies text based on the browser's UI language.
// Exposes window.YCT_OPTIONS_I18N so options.js can reuse the current
// language's strings (e.g. the "saved" confirmation message).
(function () {
  "use strict";

  var STRINGS = {
    ja: {
      title: "YouTube Live Chat Translator - 設定",
      legendBasic: "基本設定",
      enabledLabel: "拡張機能を有効にする",
      targetLangLabel: "自分の言語（この言語以外のコメントを翻訳します）",
      legendEngine: "翻訳エンジン",
      providerLabel: "プロバイダー",
      optGoogle: "Google翻訳（無料・APIキー不要）",
      optDeepl: "DeepL（要APIキー・高精度）",
      optOpenrouter: "OpenRouter（要APIキー・自分でモデル選択）",
      providerHint: "まずはGoogle翻訳（無料）でお試しいただけます。精度やレート制限が気になる場合はDeepLかOpenRouterのAPIキーを設定してください。",
      deeplKeyLabel: "DeepL APIキー",
      deeplHint: "無料プランのキーは末尾が \":fx\" になります。",
      openrouterKeyLabel: "OpenRouter APIキー",
      openrouterModelLabel: "モデル",
      openrouterHint: "お使いのBYOKアプリと同じキーを利用できます。",
      legendSkipWords: "翻訳しない単語",
      customSkipWordsLabel: "翻訳をスキップする単語(カンマ区切り)",
      customSkipWordsHint: "ここに入力した単語と完全一致するコメントは、翻訳せずそのまま表示します(大文字・小文字は区別しません)。「gg」「wwww」などの標準的なスラングは設定しなくても最初から除外されます。",
      customSkipWordsPlaceholder: "例: pog, poggers",
      saveButton: "保存",
      savedMessage: "保存しました ✓"
    },
    en: {
      title: "YouTube Live Chat Translator - Settings",
      legendBasic: "Basic settings",
      enabledLabel: "Enable the extension",
      targetLangLabel: "Your language (comments not in this language will be translated)",
      legendEngine: "Translation engine",
      providerLabel: "Provider",
      optGoogle: "Google Translate (free, no API key)",
      optDeepl: "DeepL (API key required, high accuracy)",
      optOpenrouter: "OpenRouter (API key required, choose your own model)",
      providerHint: "Try Google Translate (free) first. If accuracy or rate limits are a concern, set up an API key for DeepL or OpenRouter.",
      deeplKeyLabel: "DeepL API key",
      deeplHint: "Free-plan keys end with \":fx\".",
      openrouterKeyLabel: "OpenRouter API key",
      openrouterModelLabel: "Model",
      openrouterHint: "You can use the same key as your BYOK app.",
      legendSkipWords: "Words to never translate",
      customSkipWordsLabel: "Words to skip translating (comma-separated)",
      customSkipWordsHint: "Comments that exactly match a word here are shown as-is without translation (case-insensitive). Common slang like \"gg\" or \"wwww\" is already excluded by default.",
      customSkipWordsPlaceholder: "e.g. pog, poggers",
      saveButton: "Save",
      savedMessage: "Saved \u2713"
    },
    ko: {
      title: "YouTube Live Chat Translator - 설정",
      legendBasic: "기본 설정",
      enabledLabel: "확장 프로그램 사용",
      targetLangLabel: "내 언어(이 언어가 아닌 댓글을 번역합니다)",
      legendEngine: "번역 엔진",
      providerLabel: "제공업체",
      optGoogle: "구글 번역(무료, API 키 불필요)",
      optDeepl: "DeepL(API 키 필요, 고정확도)",
      optOpenrouter: "OpenRouter(API 키 필요, 모델 직접 선택)",
      providerHint: "먼저 구글 번역(무료)으로 시도해 보세요. 정확도나 요청 제한이 걱정되면 DeepL 또는 OpenRouter API 키를 설정하세요.",
      deeplKeyLabel: "DeepL API 키",
      deeplHint: "무료 플랜 키는 끝이 \":fx\"로 끝납니다.",
      openrouterKeyLabel: "OpenRouter API 키",
      openrouterModelLabel: "모델",
      openrouterHint: "사용 중인 BYOK 앱과 동일한 키를 사용할 수 있습니다.",
      legendSkipWords: "번역하지 않을 단어",
      customSkipWordsLabel: "번역을 건너뛸 단어(쉼표로 구분)",
      customSkipWordsHint: "여기에 입력한 단어와 정확히 일치하는 댓글은 번역하지 않고 그대로 표시합니다(대소문자 구분 없음). \"gg\", \"wwww\" 같은 일반적인 슬랭은 설정하지 않아도 기본으로 제외됩니다.",
      customSkipWordsPlaceholder: "예: pog, poggers",
      saveButton: "저장",
      savedMessage: "저장되었습니다 ✓"
    },
    zh: {
      title: "YouTube Live Chat Translator - 设置",
      legendBasic: "基本设置",
      enabledLabel: "启用扩展程序",
      targetLangLabel: "您的语言(将翻译非此语言的评论)",
      legendEngine: "翻译引擎",
      providerLabel: "提供商",
      optGoogle: "谷歌翻译(免费,无需API密钥)",
      optDeepl: "DeepL(需要API密钥,精度高)",
      optOpenrouter: "OpenRouter(需要API密钥,可自选模型)",
      providerHint: "建议先尝试谷歌翻译(免费)。如果担心准确度或速率限制,可以设置DeepL或OpenRouter的API密钥。",
      deeplKeyLabel: "DeepL API密钥",
      deeplHint: "免费版密钥以\":fx\"结尾。",
      openrouterKeyLabel: "OpenRouter API密钥",
      openrouterModelLabel: "模型",
      openrouterHint: "可以使用与您的BYOK应用相同的密钥。",
      legendSkipWords: "不翻译的词语",
      customSkipWordsLabel: "跳过翻译的词语(逗号分隔)",
      customSkipWordsHint: "与此处输入的词语完全匹配的评论将原样显示,不进行翻译(不区分大小写)。\"gg\"\"wwww\"等常见网络用语无需设置即可默认排除。",
      customSkipWordsPlaceholder: "例如: pog, poggers",
      saveButton: "保存",
      savedMessage: "已保存 ✓"
    },
    es: {
      title: "YouTube Live Chat Translator - Configuración",
      legendBasic: "Configuración básica",
      enabledLabel: "Activar la extensión",
      targetLangLabel: "Tu idioma (se traducirán los comentarios que no estén en este idioma)",
      legendEngine: "Motor de traducción",
      providerLabel: "Proveedor",
      optGoogle: "Google Translate (gratis, sin clave de API)",
      optDeepl: "DeepL (requiere clave de API, alta precisión)",
      optOpenrouter: "OpenRouter (requiere clave de API, elige tu propio modelo)",
      providerHint: "Prueba primero con Google Translate (gratis). Si te preocupa la precisión o los límites de solicitudes, configura una clave de API de DeepL u OpenRouter.",
      deeplKeyLabel: "Clave de API de DeepL",
      deeplHint: "Las claves del plan gratuito terminan en \":fx\".",
      openrouterKeyLabel: "Clave de API de OpenRouter",
      openrouterModelLabel: "Modelo",
      openrouterHint: "Puedes usar la misma clave que en tu app BYOK.",
      legendSkipWords: "Palabras que nunca se traducen",
      customSkipWordsLabel: "Palabras a excluir de la traducción (separadas por comas)",
      customSkipWordsHint: "Los comentarios que coincidan exactamente con una palabra aquí se muestran tal cual, sin traducir (no distingue mayúsculas/minúsculas). Jerga común como \"gg\" o \"wwww\" ya está excluida por defecto.",
      customSkipWordsPlaceholder: "p. ej.: pog, poggers",
      saveButton: "Guardar",
      savedMessage: "Guardado ✓"
    },
    fr: {
      title: "YouTube Live Chat Translator - Paramètres",
      legendBasic: "Paramètres de base",
      enabledLabel: "Activer l'extension",
      targetLangLabel: "Votre langue (les commentaires dans une autre langue seront traduits)",
      legendEngine: "Moteur de traduction",
      providerLabel: "Fournisseur",
      optGoogle: "Google Traduction (gratuit, sans clé API)",
      optDeepl: "DeepL (clé API requise, haute précision)",
      optOpenrouter: "OpenRouter (clé API requise, choix du modèle)",
      providerHint: "Essayez d'abord Google Traduction (gratuit). Si la précision ou les limites de requêtes vous préoccupent, configurez une clé API DeepL ou OpenRouter.",
      deeplKeyLabel: "Clé API DeepL",
      deeplHint: "Les clés du plan gratuit se terminent par \":fx\".",
      openrouterKeyLabel: "Clé API OpenRouter",
      openrouterModelLabel: "Modèle",
      openrouterHint: "Vous pouvez utiliser la même clé que dans votre application BYOK.",
      legendSkipWords: "Mots à ne jamais traduire",
      customSkipWordsLabel: "Mots à exclure de la traduction (séparés par des virgules)",
      customSkipWordsHint: "Les commentaires correspondant exactement à un mot ici sont affichés tels quels, sans traduction (insensible à la casse). Les expressions courantes comme « gg » ou « wwww » sont déjà exclues par défaut.",
      customSkipWordsPlaceholder: "ex. : pog, poggers",
      saveButton: "Enregistrer",
      savedMessage: "Enregistré ✓"
    },
    de: {
      title: "YouTube Live Chat Translator – Einstellungen",
      legendBasic: "Grundeinstellungen",
      enabledLabel: "Erweiterung aktivieren",
      targetLangLabel: "Ihre Sprache (Kommentare in anderen Sprachen werden übersetzt)",
      legendEngine: "Übersetzungs-Engine",
      providerLabel: "Anbieter",
      optGoogle: "Google Übersetzer (kostenlos, kein API-Schlüssel nötig)",
      optDeepl: "DeepL (API-Schlüssel erforderlich, hohe Genauigkeit)",
      optOpenrouter: "OpenRouter (API-Schlüssel erforderlich, Modell frei wählbar)",
      providerHint: "Probieren Sie zuerst Google Übersetzer (kostenlos) aus. Bei Bedenken wegen Genauigkeit oder Ratenlimits richten Sie einen API-Schlüssel für DeepL oder OpenRouter ein.",
      deeplKeyLabel: "DeepL API-Schlüssel",
      deeplHint: "Schlüssel des kostenlosen Plans enden auf \":fx\".",
      openrouterKeyLabel: "OpenRouter API-Schlüssel",
      openrouterModelLabel: "Modell",
      openrouterHint: "Sie können denselben Schlüssel wie in Ihrer BYOK-App verwenden.",
      legendSkipWords: "Wörter, die nie übersetzt werden",
      customSkipWordsLabel: "Von der Übersetzung auszuschließende Wörter (durch Komma getrennt)",
      customSkipWordsHint: "Kommentare, die genau mit einem hier eingetragenen Wort übereinstimmen, werden unübersetzt angezeigt (Groß-/Kleinschreibung wird ignoriert). Gängiger Slang wie „gg“ oder „wwww“ ist bereits standardmäßig ausgeschlossen.",
      customSkipWordsPlaceholder: "z. B.: pog, poggers",
      saveButton: "Speichern",
      savedMessage: "Gespeichert ✓"
    },
    pt: {
      title: "YouTube Live Chat Translator - Configurações",
      legendBasic: "Configurações básicas",
      enabledLabel: "Ativar a extensão",
      targetLangLabel: "Seu idioma (comentários que não estiverem neste idioma serão traduzidos)",
      legendEngine: "Mecanismo de tradução",
      providerLabel: "Provedor",
      optGoogle: "Google Tradutor (gratuito, sem chave de API)",
      optDeepl: "DeepL (requer chave de API, alta precisão)",
      optOpenrouter: "OpenRouter (requer chave de API, escolha seu próprio modelo)",
      providerHint: "Experimente primeiro o Google Tradutor (gratuito). Se a precisão ou os limites de requisições forem uma preocupação, configure uma chave de API do DeepL ou OpenRouter.",
      deeplKeyLabel: "Chave de API do DeepL",
      deeplHint: "Chaves do plano gratuito terminam em \":fx\".",
      openrouterKeyLabel: "Chave de API do OpenRouter",
      openrouterModelLabel: "Modelo",
      openrouterHint: "Você pode usar a mesma chave do seu app BYOK.",
      legendSkipWords: "Palavras que nunca são traduzidas",
      customSkipWordsLabel: "Palavras a excluir da tradução (separadas por vírgula)",
      customSkipWordsHint: "Comentários que correspondem exatamente a uma palavra aqui são exibidos como estão, sem tradução (não diferencia maiúsculas/minúsculas). Gírias comuns como \"gg\" ou \"wwww\" já são excluídas por padrão.",
      customSkipWordsPlaceholder: "ex.: pog, poggers",
      saveButton: "Salvar",
      savedMessage: "Salvo ✓"
    },
    ru: {
      title: "YouTube Live Chat Translator — Настройки",
      legendBasic: "Основные настройки",
      enabledLabel: "Включить расширение",
      targetLangLabel: "Ваш язык (комментарии не на этом языке будут переведены)",
      legendEngine: "Движок перевода",
      providerLabel: "Провайдер",
      optGoogle: "Google Переводчик (бесплатно, без API-ключа)",
      optDeepl: "DeepL (нужен API-ключ, высокая точность)",
      optOpenrouter: "OpenRouter (нужен API-ключ, выбор модели)",
      providerHint: "Сначала попробуйте Google Переводчик (бесплатно). Если важны точность или лимиты запросов, настройте API-ключ DeepL или OpenRouter.",
      deeplKeyLabel: "API-ключ DeepL",
      deeplHint: "Ключи бесплатного плана заканчиваются на \":fx\".",
      openrouterKeyLabel: "API-ключ OpenRouter",
      openrouterModelLabel: "Модель",
      openrouterHint: "Можно использовать тот же ключ, что и в вашем BYOK-приложении.",
      legendSkipWords: "Слова, которые никогда не переводятся",
      customSkipWordsLabel: "Слова, исключённые из перевода (через запятую)",
      customSkipWordsHint: "Комментарии, точно совпадающие со словом здесь, показываются без перевода (без учёта регистра). Распространённый сленг вроде «gg» или «wwww» уже исключён по умолчанию.",
      customSkipWordsPlaceholder: "например: pog, poggers",
      saveButton: "Сохранить",
      savedMessage: "Сохранено ✓"
    },
    th: {
      title: "YouTube Live Chat Translator - การตั้งค่า",
      legendBasic: "การตั้งค่าพื้นฐาน",
      enabledLabel: "เปิดใช้งานส่วนขยาย",
      targetLangLabel: "ภาษาของคุณ (ความคิดเห็นที่ไม่ใช่ภาษานี้จะถูกแปล)",
      legendEngine: "เอนจินแปลภาษา",
      providerLabel: "ผู้ให้บริการ",
      optGoogle: "Google แปลภาษา (ฟรี ไม่ต้องใช้ API key)",
      optDeepl: "DeepL (ต้องใช้ API key ความแม่นยำสูง)",
      optOpenrouter: "OpenRouter (ต้องใช้ API key เลือกโมเดลเองได้)",
      providerHint: "ลองใช้ Google แปลภาษา (ฟรี) ก่อน หากกังวลเรื่องความแม่นยำหรือขีดจำกัดคำขอ ให้ตั้งค่า API key ของ DeepL หรือ OpenRouter",
      deeplKeyLabel: "API key ของ DeepL",
      deeplHint: "คีย์แผนฟรีจะลงท้ายด้วย \":fx\"",
      openrouterKeyLabel: "API key ของ OpenRouter",
      openrouterModelLabel: "โมเดล",
      openrouterHint: "คุณสามารถใช้คีย์เดียวกับที่ใช้ในแอป BYOK ของคุณได้",
      legendSkipWords: "คำที่จะไม่แปล",
      customSkipWordsLabel: "คำที่จะข้ามการแปล (คั่นด้วยจุลภาค)",
      customSkipWordsHint: "ความคิดเห็นที่ตรงกับคำที่ระบุไว้ตรงนี้ทุกตัวอักษรจะแสดงตามเดิมโดยไม่แปล (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่) คำแสลงทั่วไปอย่าง \"gg\" หรือ \"wwww\" ถูกยกเว้นไว้แล้วโดยค่าเริ่มต้น",
      customSkipWordsPlaceholder: "เช่น pog, poggers",
      saveButton: "บันทึก",
      savedMessage: "บันทึกแล้ว ✓"
    },
    vi: {
      title: "YouTube Live Chat Translator - Cài đặt",
      legendBasic: "Cài đặt cơ bản",
      enabledLabel: "Bật tiện ích mở rộng",
      targetLangLabel: "Ngôn ngữ của bạn (bình luận không phải ngôn ngữ này sẽ được dịch)",
      legendEngine: "Công cụ dịch",
      providerLabel: "Nhà cung cấp",
      optGoogle: "Google Dịch (miễn phí, không cần khóa API)",
      optDeepl: "DeepL (cần khóa API, độ chính xác cao)",
      optOpenrouter: "OpenRouter (cần khóa API, tự chọn mô hình)",
      providerHint: "Hãy thử Google Dịch (miễn phí) trước. Nếu lo ngại về độ chính xác hoặc giới hạn yêu cầu, hãy thiết lập khóa API cho DeepL hoặc OpenRouter.",
      deeplKeyLabel: "Khóa API DeepL",
      deeplHint: "Khóa của gói miễn phí kết thúc bằng \":fx\".",
      openrouterKeyLabel: "Khóa API OpenRouter",
      openrouterModelLabel: "Mô hình",
      openrouterHint: "Bạn có thể dùng chung khóa với ứng dụng BYOK của mình.",
      legendSkipWords: "Từ không bao giờ dịch",
      customSkipWordsLabel: "Từ bỏ qua khi dịch (cách nhau bằng dấu phẩy)",
      customSkipWordsHint: "Bình luận khớp chính xác với từ ở đây sẽ được hiển thị nguyên văn, không dịch (không phân biệt hoa thường). Các từ lóng phổ biến như \"gg\" hoặc \"wwww\" đã được loại trừ mặc định.",
      customSkipWordsPlaceholder: "ví dụ: pog, poggers",
      saveButton: "Lưu",
      savedMessage: "Đã lưu ✓"
    },
    id: {
      title: "YouTube Live Chat Translator - Pengaturan",
      legendBasic: "Pengaturan dasar",
      enabledLabel: "Aktifkan ekstensi",
      targetLangLabel: "Bahasa Anda (komentar selain bahasa ini akan diterjemahkan)",
      legendEngine: "Mesin terjemahan",
      providerLabel: "Penyedia",
      optGoogle: "Google Translate (gratis, tanpa kunci API)",
      optDeepl: "DeepL (perlu kunci API, akurasi tinggi)",
      optOpenrouter: "OpenRouter (perlu kunci API, pilih model sendiri)",
      providerHint: "Coba Google Translate (gratis) dulu. Jika khawatir soal akurasi atau batas permintaan, atur kunci API DeepL atau OpenRouter.",
      deeplKeyLabel: "Kunci API DeepL",
      deeplHint: "Kunci paket gratis berakhiran \":fx\".",
      openrouterKeyLabel: "Kunci API OpenRouter",
      openrouterModelLabel: "Model",
      openrouterHint: "Anda bisa menggunakan kunci yang sama dengan aplikasi BYOK Anda.",
      legendSkipWords: "Kata yang tidak pernah diterjemahkan",
      customSkipWordsLabel: "Kata yang dilewati dari terjemahan (dipisah koma)",
      customSkipWordsHint: "Komentar yang cocok persis dengan kata di sini akan ditampilkan apa adanya tanpa diterjemahkan (tidak membedakan huruf besar/kecil). Slang umum seperti \"gg\" atau \"wwww\" sudah dikecualikan secara default.",
      customSkipWordsPlaceholder: "mis.: pog, poggers",
      saveButton: "Simpan",
      savedMessage: "Tersimpan ✓"
    }
  };

  var browserLang =
    (typeof chrome !== "undefined" && chrome.i18n && chrome.i18n.getUILanguage
      ? chrome.i18n.getUILanguage()
      : null) ||
    navigator.language ||
    "en";
  var lang = browserLang.toLowerCase().split("-")[0];
  var s = STRINGS[lang] || STRINGS.en;

  window.YCT_OPTIONS_I18N = s;

  document.title = s.title;
  document.documentElement.lang = lang;
  document.getElementById("optionsTitle").textContent = s.title;
  document.getElementById("legendBasic").textContent = s.legendBasic;
  document.getElementById("enabledLabel").textContent = s.enabledLabel;
  document.getElementById("targetLangLabel").textContent = s.targetLangLabel;
  document.getElementById("legendEngine").textContent = s.legendEngine;
  document.getElementById("providerLabel").textContent = s.providerLabel;
  document.getElementById("optGoogle").textContent = s.optGoogle;
  document.getElementById("optDeepl").textContent = s.optDeepl;
  document.getElementById("optOpenrouter").textContent = s.optOpenrouter;
  document.getElementById("providerHint").textContent = s.providerHint;
  document.getElementById("deeplKeyLabel").textContent = s.deeplKeyLabel;
  document.getElementById("deeplHint").textContent = s.deeplHint;
  document.getElementById("openrouterKeyLabel").textContent = s.openrouterKeyLabel;
  document.getElementById("openrouterModelLabel").textContent = s.openrouterModelLabel;
  document.getElementById("openrouterHint").textContent = s.openrouterHint;
  document.getElementById("legendSkipWords").textContent = s.legendSkipWords;
  document.getElementById("customSkipWordsLabel").textContent = s.customSkipWordsLabel;
  document.getElementById("customSkipWordsHint").textContent = s.customSkipWordsHint;
  document.getElementById("customSkipWords").placeholder = s.customSkipWordsPlaceholder;
  document.getElementById("save").textContent = s.saveButton;
})();
