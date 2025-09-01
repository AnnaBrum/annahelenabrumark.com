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
