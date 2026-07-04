(function () {
  var STORAGE_KEY = "siteLang";
  var SUPPORTED = ["ja", "en", "tl"];
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-set-lang]");

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) {
      lang = "ja";
    }
    SUPPORTED.forEach(function (code) {
      root.classList.remove("lang-" + code);
    });
    root.classList.add("lang-" + lang);
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);

    buttons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === lang);
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable */
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-set-lang"));
    });
  });

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable */
  }

  applyLang(saved || root.getAttribute("data-lang") || "ja");
})();
