/* JavaScript for homepage interactions */

// Simple counter animation for stats
// Start counters when stats are visible
// Animate a numeric stat from zero to its target value
function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const isPercent = counter.textContent.trim().endsWith("%");
  let start = 0;
  const duration = 1400;
  const stepTime = Math.max(16, Math.floor(duration / Math.max(1, target)));
  const step = () => {
    start += Math.ceil(target / (duration / stepTime));
    if (start >= target) {
      counter.textContent = isPercent
        ? `${target}%`
        : target >= 1000
          ? target.toLocaleString() + "+"
          : target + "+";
    } else {
      counter.textContent = isPercent
        ? `${start}%`
        : start >= 1000
          ? start.toLocaleString() + "+"
          : start + "+";
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

// Wait until DOM is ready before attaching interactions
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".count");
  const stats = document.querySelector(".stats");

  if ("IntersectionObserver" in window && stats) {
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((c) => animateCounter(c));
            o.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(stats);
  } else {
    counters.forEach((c) => animateCounter(c));
  }

  // Mobile navigation toggle behavior
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  // Logo marquee animation controls
  const marquee = document.getElementById("logoMarquee");
  const track = document.getElementById("logoTrack");
  const logos = [
    "Cadbury logo.png",
    "Dangote logo.png",
    "Unilever logo.png",
    "Nestle logo.png",
    "Coca Cola Logo PNG.png",
    "Reebok Logo PNG.png",
    "Slot logo.png",
    "Champion Clothing Logo PNG.png",
    "Total Energies Logo PNG.png",
  ];

  function createLogoItem(filename) {
    const item = document.createElement("div");
    item.className = "logo-item";
    const img = document.createElement("img");
    img.src = `VendHub_logos/${filename}`;
    img.alt = filename.replace(/\.(png|jpg|jpeg)$/i, "");
    item.appendChild(img);
    return item;
  }

  if (track && marquee) {
    logos.forEach((file) => track.appendChild(createLogoItem(file)));
    logos.forEach((file) => track.appendChild(createLogoItem(file)));

    let speed = 0.6;
    let animationFrame;

    function step() {
      marquee.scrollLeft += speed;
      if (marquee.scrollLeft >= track.scrollWidth / 2) {
        marquee.scrollLeft -= track.scrollWidth / 2;
      }
      animationFrame = requestAnimationFrame(step);
    }

    step();

    marquee.addEventListener("mouseenter", () =>
      cancelAnimationFrame(animationFrame),
    );
    marquee.addEventListener("mouseleave", () => step());
  }
});
