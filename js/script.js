/* ==========================================================================
   Anna Bajorek — Portfolio
   Vanilla JS. No frameworks, no build step.
   Handles: horizontal gallery scroll (wheel + drag), plate counters,
   mobile menu, active nav state, footer year.
   ========================================================================== */

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Mobile menu toggle
     --------------------------------------------------------------------- */
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // close menu when a link is tapped
    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Active nav link on scroll
     --------------------------------------------------------------------- */
  var sections = ["photography", "film", "store", "bio", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var navLinks = document.querySelectorAll("[data-nav]");

  if (sections.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navLinks.forEach(function (link) {
              var match = link.getAttribute("href") === "#" + id;
              link.classList.toggle("is-active", match);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------------------------------------------------------------------
     Horizontal galleries: wheel -> horizontal scroll, drag-to-scroll,
     and a live plate counter ("01 / 07") driven by scroll position.
     --------------------------------------------------------------------- */
  var galleries = document.querySelectorAll("[data-gallery]");

  galleries.forEach(function (gallery) {
    var track = gallery.querySelector("[data-track]");
    var counter = gallery.querySelector("[data-count]");
    if (!track) return;

    var frames = Array.prototype.slice.call(track.querySelectorAll(".frame"));
    var total = frames.length;

    function pad(n) {
      return n < 10 ? "0" + n : "" + n;
    }

    function updateCounter() {
      if (!counter || !total) return;
      var trackCenter = track.scrollLeft + track.clientWidth / 2;
      var closestIndex = 0;
      var closestDist = Infinity;
      frames.forEach(function (frame, i) {
        var frameCenter = frame.offsetLeft + frame.offsetWidth / 2;
        var dist = Math.abs(frameCenter - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      counter.textContent = pad(closestIndex + 1) + " / " + pad(total);
    }

    updateCounter();

    var ticking = false;
    track.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateCounter();
          ticking = false;
        });
        ticking = true;
      }
    });

    // translate vertical wheel input into horizontal scroll (desktop only)
    var isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!isCoarsePointer) {
      track.addEventListener(
        "wheel",
        function (e) {
          // ignore mostly-horizontal gestures (trackpads already scroll x)
          if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        },
        { passive: false }
      );

      // drag-to-scroll with mouse
      var isDown = false;
      var startX = 0;
      var startScroll = 0;

      track.addEventListener("mousedown", function (e) {
        isDown = true;
        startX = e.pageX;
        startScroll = track.scrollLeft;
      });

      window.addEventListener("mouseup", function () {
        isDown = false;
      });

      window.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        var delta = e.pageX - startX;
        track.scrollLeft = startScroll - delta;
      });

      // prevent native image drag ghost while dragging the track
      track.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("dragstart", function (e) { e.preventDefault(); });
      });
    }
  });
})();
