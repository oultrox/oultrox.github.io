// =============================================================
//  Jesús Pérez — Portfolio interactions
// =============================================================

const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const backToTop = document.getElementById("back-to-top");

// --- Back-to-top + active section on scroll ----------------------
const onScroll = () => {
  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }
  highlightActiveSection();
};

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", onScroll, { passive: true });

// --- Mobile menu toggle ------------------------------------------
const closeMenu = () => {
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Open navigation menu");
};

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close the menu after clicking a link
navLinks.forEach((link) => link.addEventListener("click", closeMenu));

// Reset menu state when resizing back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

// --- Highlight menu entry for the section in view ----------------
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function highlightActiveSection() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  let activeId = sections[0] ? sections[0].id : null;

  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      activeId = section.id;
    }
  }
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2
  ) {
    activeId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
}

// --- Wipe-in reveal for panels -----------------------------------
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reduceMotion.matches) {
  let pending = Array.from(
    document.querySelectorAll(
      ".home-projects__intro, .home-skills__intro, .game-card, .home-project-card, .home-skills__column, .home-about__shell"
    )
  );

  pending.forEach((el) => el.classList.add("reveal"));

  const revealInView = () => {
    if (!pending.length) return;
    const line = window.innerHeight * 0.95;

    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < line) {
        el.classList.add("is-in");
        return false;
      }
      return true;
    });

    if (!pending.length) {
      window.removeEventListener("scroll", revealInView);
      window.removeEventListener("resize", revealInView);
    }
  };

  window.addEventListener("scroll", revealInView, { passive: true });
  window.addEventListener("resize", revealInView);
  window.addEventListener("load", revealInView);
  revealInView();
}

// Initial state on load
onScroll();
