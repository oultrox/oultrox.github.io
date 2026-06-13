// =============================================================
//  Jesús Pérez — Portfolio interactions
// =============================================================

const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const backToTop = document.getElementById("back-to-top");

// --- Navbar background + back-to-top on scroll -------------------
const onScroll = () => {
  if (window.scrollY >= 60) {
    header.classList.add("header-bg");
  } else {
    header.classList.remove("header-bg");
  }

  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }

  highlightActiveSection();
};

// --- Back to top -------------------------------------------------
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", onScroll);

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

// --- Highlight nav link for the section in view ------------------
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

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
}

// --- Hero corner parallax (desktop, fine pointer only) ----------
const hero = document.getElementById("home");
const finePointer = window.matchMedia(
  "(min-width: 769px) and (hover: hover) and (pointer: fine)"
);

if (hero && finePointer.matches) {
  const MAX = 26;
  let raf = null;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      hero.style.setProperty("--px", (nx * MAX).toFixed(1) + "px");
      hero.style.setProperty("--py", (ny * MAX).toFixed(1) + "px");
      raf = null;
    });
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--px", "0px");
    hero.style.setProperty("--py", "0px");
  });
}

// Initial state on load
onScroll();
