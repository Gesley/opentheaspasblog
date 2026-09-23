(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var links = document.querySelector("[data-nav-links]");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var path = location.pathname.replace(/\\/g, "/");
  document.querySelectorAll("[data-nav-links] a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    var hrefPath = href.split("#")[0];
    var file = hrefPath.split("/").pop();
    var pointsBlog = hrefPath.indexOf("blog") !== -1;
    var isHomeLink = !pointsBlog && (file === "index.html" || file === "" || file === ".");
    var onHome = /(?:^|\/)index\.html$/.test(path) || /\/$/.test(path);
    var onProjects = /(?:^|\/)projects\.html$/.test(path) || /(?:^|\/)projetos\/?$/.test(path);
    var onProjectDetail = /\/projetos\/.+\.html$/.test(path);
    var onBlog = /\/blog(?:\.html|\/|$)/.test(path);
    var onAbout = /(?:^|\/)sobre\.html$/.test(path);

    if (file === "sobre.html" && onAbout) {
      a.classList.add("is-active");
      return;
    }
    if (pointsBlog && onBlog) {
      a.classList.add("is-active");
      return;
    }
    if (file === "projects.html" && (onProjects || onProjectDetail)) {
      a.classList.add("is-active");
      return;
    }
    if (isHomeLink && !href.includes("#") && onHome && !onProjects && !onBlog) {
      a.classList.add("is-active");
    }
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  var thumbs = document.querySelectorAll("[data-full]");
  if (thumbs.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button type="button" class="lightbox-close" aria-label="Fechar">×</button><img alt="">';
    document.body.appendChild(box);
    var fullImg = box.querySelector("img");
    function closeLightbox() {
      box.hidden = true;
      document.body.style.overflow = "";
    }
    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pic = btn.querySelector("img");
        fullImg.src = btn.getAttribute("data-full");
        fullImg.alt = pic ? pic.alt : "";
        box.hidden = false;
        document.body.style.overflow = "hidden";
      });
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lightbox-close")) {
        closeLightbox();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  var buttons = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-kind]");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var kind = btn.getAttribute("data-filter");
      buttons.forEach(function (b) { b.classList.remove("is-on"); });
      btn.classList.add("is-on");
      cards.forEach(function (card) {
        var match = kind === "all" || card.getAttribute("data-kind") === kind;
        card.classList.toggle("hidden", !match);
      });
    });
  });
})();
