document.addEventListener("DOMContentLoaded", () => {
  const normalize = (path) => {
    if (!path || path === "/") return "/";
    return path.replace(/\/$/, "").replace(/\.html$/, "");
  };

  const current = normalize(window.location.pathname);

  document.querySelectorAll("nav a[href]").forEach((a) => {
    // build absolute URL from href (works for relative and absolute)
    const url = new URL(a.getAttribute("href"), window.location.origin);

    // only handle same-origin internal links
    if (url.origin !== window.location.origin) return;

    const linkPath = normalize(url.pathname);

    // Home: only when you’re really on "/"
    if (linkPath === "/") {
      if (current === "/") a.classList.add("active");
      return;
    }

    // Exact match or subpath
    if (current === linkPath || current.startsWith(linkPath + "/")) {
      a.classList.add("active");
    }
  });
});

// Smooth <details> open/close
(function () {
  const DURATION = 300;
  const EASING = "ease";

  document.querySelectorAll("details").forEach((details) => {
    const summary = details.querySelector("summary");
    const panel = details.querySelector(".cv-panel");
    if (!summary || !panel) return;

    let animating = false;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function open() {
      details.open = true;
      if (prefersReduced) return;

      panel.style.height = "0px";
      panel.style.opacity = "0";
      panel.offsetHeight; // reflow
      panel.style.transition = `height ${DURATION}ms ${EASING}, opacity ${DURATION}ms ${EASING}`;
      panel.style.height = panel.scrollHeight + "px";
      panel.style.opacity = "1";

      animating = true;
      panel.addEventListener("transitionend", function te(e) {
        if (e.propertyName === "height") {
          animating = false;
          panel.style.transition = "";
          panel.style.height = ""; // reset to auto
          panel.removeEventListener("transitionend", te);
        }
      });
    }

    function close() {
      if (prefersReduced) {
        details.open = false;
        return;
      }

      panel.style.height = panel.scrollHeight + "px";
      panel.style.opacity = "1";
      panel.offsetHeight; // reflow
      panel.style.transition = `height ${DURATION}ms ${EASING}, opacity ${DURATION}ms ${EASING}`;
      panel.style.height = "0px";
      panel.style.opacity = "0";

      animating = true;
      panel.addEventListener("transitionend", function tc(e) {
        if (e.propertyName === "height") {
          details.open = false;
          animating = false;
          panel.style.transition = "";
          panel.style.height = "";
          panel.removeEventListener("transitionend", tc);
        }
      });
    }

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (animating) return;
      details.open ? close() : open();
    });

    // Able closing on Escape
    summary.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && details.open && !animating) close();
    });
  });
})();

