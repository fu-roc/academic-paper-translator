(function () {
  "use strict";

  var body = document.body;
  var toggle = document.getElementById("toc-toggle");
  var toc = document.getElementById("page-toc");

  if (!toggle || !toc) {
    return;
  }

  var media = window.matchMedia("(max-width: 1050px)");
  var storageKey = "academic-paper-toc-hidden";
  var stored = null;

  try {
    stored = window.localStorage.getItem(storageKey);
  } catch (_error) {
    stored = null;
  }

  var hidden = stored === null ? media.matches : stored === "true";

  function storePreference() {
    try {
      window.localStorage.setItem(storageKey, String(hidden));
    } catch (_error) {
      // The control remains functional when storage is unavailable.
    }
  }

  function render() {
    body.classList.toggle("toc-hidden", hidden);
    toggle.setAttribute("aria-expanded", String(!hidden));
    toggle.setAttribute("aria-label", hidden ? "显示目录" : "隐藏目录");
  }

  toggle.addEventListener("click", function () {
    hidden = !hidden;
    storePreference();
    render();
  });

  toc.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (media.matches) {
        hidden = true;
        storePreference();
        render();
      }
    });
  });

  render();
})();
