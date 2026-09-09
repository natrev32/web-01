/* Tatami Craft — interactions */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.querySelector(".nav__links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("is-open");
    });
  }

  /* ---------- Navbar condenses on scroll ---------- */
  var nav = document.getElementById("nav");

  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (staggered) ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach(function (el) {
      /* stagger siblings that enter together */
      var siblings = el.parentElement ? el.parentElement.children : [];
      var idx = Array.prototype.indexOf.call(siblings, el);
      var delay = Math.min(idx * 90, 360);
      el.style.transitionDelay = delay + "ms";
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Back to top ---------- */
  var backTop = document.getElementById("backTop");

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var onBackTopScroll = function () {
      backTop.classList.toggle("is-visible", window.scrollY > 600);
    };

    window.addEventListener("scroll", onBackTopScroll, { passive: true });
    onBackTopScroll();
  }

  /* ---------- Order form -> WhatsApp message ---------- */
  var form = document.getElementById("orderForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.trim();
      var product = form.elements.product.value;
      var notes = form.elements.notes.value.trim();

      var lines = [
        "Halo Tatami Craft, saya ingin memesan:",
        "",
        "Nama: " + (name || "-"),
        "Produk: " + product,
      ];

      if (phone) lines.push("Kontak: " + phone);
      if (notes) lines.push("Catatan: " + notes);

      var url = "https://wa.me/6281200000000?text=" +
        encodeURIComponent(lines.join("\n"));

      window.open(url, "_blank", "noopener");
    });
  }
})();
