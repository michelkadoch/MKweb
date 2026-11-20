// Adds a Français / English toggle under every embedded YouTube video.
// Choosing a language reloads the player with that language (hl=...).
// YouTube offers no official way to force a dubbed audio track from an
// embed, so a short tip explains the manual fallback (gear > Audio track).
// The choice is remembered across pages.
document.addEventListener("DOMContentLoaded", function() {
  var STORAGE_KEY = "video-language";
  var LANGS = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" }
  ];
  var TIPS = {
    fr: "",
    en: "If the audio is still in French: click ⚙ (Settings) in the player, " +
        "then Audio track → English."
  };

  var iframes = document.querySelectorAll('iframe[src*="youtube.com/embed/"]');
  if (!iframes.length) return;

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || "fr"; } catch (e) { return "fr"; }
  }
  function saveLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
  }

  function srcFor(iframe, code) {
    var url = new URL(iframe.dataset.baseSrc);
    url.searchParams.set("hl", code);
    return url.toString();
  }

  var controls = [];

  function apply(code, reload) {
    controls.forEach(function(c) {
      c.buttons.forEach(function(b) {
        var on = b.dataset.lang === code;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      c.tip.textContent = TIPS[code] || "";
      c.tip.hidden = !TIPS[code];
      if (reload) c.iframe.src = srcFor(c.iframe, code);
    });
  }

  iframes.forEach(function(iframe) {
    iframe.dataset.baseSrc = iframe.src;

    var bar = document.createElement("div");
    bar.className = "video-lang-bar";

    var label = document.createElement("span");
    label.className = "video-lang-label";
    label.textContent = "Audio :";
    bar.appendChild(label);

    var group = document.createElement("div");
    group.className = "btn-group btn-group-sm";
    group.setAttribute("role", "group");

    var buttons = LANGS.map(function(lang) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn btn-outline-primary";
      b.dataset.lang = lang.code;
      b.textContent = lang.label;
      b.addEventListener("click", function() {
        if (getLang() === lang.code) return;
        saveLang(lang.code);
        apply(lang.code, true);
      });
      group.appendChild(b);
      return b;
    });
    bar.appendChild(group);

    var tip = document.createElement("p");
    tip.className = "video-lang-tip";
    tip.hidden = true;

    // Quarto wraps the iframe in a responsive div; place the bar after it.
    var anchor = iframe.closest(".quarto-video") || iframe;
    anchor.insertAdjacentElement("afterend", tip);
    anchor.insertAdjacentElement("afterend", bar);

    controls.push({ iframe: iframe, buttons: buttons, tip: tip });
  });

  var initial = getLang();
  apply(initial, initial !== "fr");
});
