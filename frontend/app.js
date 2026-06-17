/* ==========================================
   ANGLO MIRANTE PREMIUM
   APP.JS - PARTE 1
========================================== */

/* ==========================================
   LOADER MANAGER
========================================== */

class LoaderManager {
  constructor() {
   this.loader = document.getElementById("loader");
    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hideLoader();
      }, 1200);
    });
  }

  hideLoader() {
    if (!this.loader) return;

   this.loader.classList.add("loader-hide");

    setTimeout(() => {
      this.loader.remove();
    }, 800);
  }
}

/* ==========================================
   CURSOR GLOW
========================================== */

class CursorGlow {
  constructor() {
    this.cursor = document.querySelector(".cursor-glow");

    if (!this.cursor) return;

    this.mouseX = 0;
    this.mouseY = 0;

    this.currentX = 0;
    this.currentY = 0;

    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.animate();
  }

  animate() {
    this.currentX += (this.mouseX - this.currentX) * 0.15;
    this.currentY += (this.mouseY - this.currentY) * 0.15;

    this.cursor.style.left = `${this.currentX}px`;
    this.cursor.style.top = `${this.currentY}px`;

    requestAnimationFrame(() => this.animate());
  }
}

/* ==========================================
   SCROLL REVEAL
========================================== */

class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll(
      ".reveal, .fade-up, .fade-left, .fade-right, .zoom-in"
    );

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    this.elements.forEach((el) => observer.observe(el));
  }
}

/* ==========================================
   COUNTER ANIMATION
========================================== */

class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll("[data-counter]");

    if (!this.counters.length) return;

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    this.counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  animateCounter(counter) {
    const target = parseInt(counter.dataset.counter);

    let current = 0;

    const duration = 2500;
    const stepTime = 16;

    const increment = target / (duration / stepTime);

    const update = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = target.toLocaleString("pt-BR");
        return;
      }

      counter.textContent = Math.floor(current).toLocaleString("pt-BR");

      requestAnimationFrame(update);
    };

    update();
  }
}

/* ==========================================
   PERFORMANCE OPTIMIZER
========================================== */

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });

        ticking = true;
      }
    });
  }
}

/* ==========================================
   APP CORE
========================================== */

class App {
  constructor() {
    this.init();
  }

  init() {
    new LoaderManager();
    new CursorGlow();
    new ScrollReveal();
    new CounterAnimation();
    new PerformanceOptimizer();

    console.log("🚀 Anglo Mirante Premium iniciado");
  }
}

/* ==========================================
   START
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

/* ==========================================
   NAVIGATION MANAGER
========================================== */

class NavigationManager {
  constructor() {
    this.header = document.querySelector("header");
    this.links = document.querySelectorAll(".nav-links a");
    this.sections = document.querySelectorAll("section");

    this.init();
  }

  init() {
    this.handleScroll();
    this.activeLinks();
    this.smoothScroll();

    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    if (!this.header) return;

    if (window.scrollY > 50) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }
  }

  activeLinks() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          this.links.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        });
      },
      {
        threshold: 0.4,
      }
    );

    this.sections.forEach((section) => observer.observe(section));
  }

  smoothScroll() {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        if (!href.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(href);

        if (!target) return;

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }
}

/* ==========================================
   MOBILE MENU
========================================== */

class MobileMenu {
  constructor() {
    this.createButton();
  }

  createButton() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    const btn = document.createElement("button");

    btn.className = "mobile-menu-btn";
    btn.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    navbar.appendChild(btn);

    const links = document.querySelector(".nav-links");

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      links.classList.toggle("show");
    });
  }
}

/* ==========================================
   THEME MANAGER
========================================== */

class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "dark";

    this.createButton();
    this.applyTheme();
  }

  createButton() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    this.button = document.createElement("button");

    this.button.className = "theme-toggle";

    this.button.innerHTML = "🌙";

    navbar.appendChild(this.button);

    this.button.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  applyTheme() {
    document.body.classList.toggle(
      "light-mode",
      this.theme === "light"
    );

    if (this.button) {
      this.button.innerHTML =
        this.theme === "light" ? "☀️" : "🌙";
    }
  }

  toggleTheme() {
    this.theme =
      this.theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", this.theme);

    this.applyTheme();
  }
}

/* ==========================================
   BUTTON EFFECTS
========================================== */

class ButtonEffects {
  constructor() {
    this.buttons = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .btn-outline"
    );

    this.init();
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--x", `${x}px`);
        button.style.setProperty("--y", `${y}px`);
      });
    });
  }
}

/* ==========================================
   PARALLAX EFFECT
========================================== */

class ParallaxManager {
  constructor() {
    this.hero = document.querySelector(".hero");

    if (!this.hero) return;

    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      const offset = window.scrollY * 0.3;

      this.hero.style.transform =
        `translateY(${offset}px)`;
    });
  }
}

/* ==========================================
   UPDATE APP
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  new NavigationManager();
  new MobileMenu();
  new ThemeManager();
  new ButtonEffects();
  new ParallaxManager();
});

/* ==========================================
   PARTICLE ENGINE
========================================== */

class ParticleEngine {
  constructor() {
    this.container = document.querySelector("#particles");

    if (!this.container) return;

    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("span");

      particle.classList.add("particle");

      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDuration =
        Math.random() * 10 + 10 + "s";

      particle.style.animationDelay =
        Math.random() * 5 + "s";

      particle.style.opacity =
        Math.random() * 0.6;

      this.container.appendChild(particle);
    }
  }
}

/* ==========================================
   MAGNETIC BUTTONS
========================================== */

class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .btn-outline"
    );

    this.init();
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) * 0.15;
        const moveY = (y - rect.height / 2) * 0.15;

        button.style.transform =
          `translate(${moveX}px, ${moveY}px)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });
  }
}

/* ==========================================
   NOTIFICATION CENTER
========================================== */

class NotificationCenter {
  constructor() {
    this.createContainer();

    setTimeout(() => {
      this.show(
        "🎓 Bem-vindo ao Anglo Mirante Premium"
      );
    }, 2000);
  }

  createContainer() {
    this.container = document.createElement("div");

    this.container.className = "notifications";

    document.body.appendChild(this.container);
  }

  show(message) {
    const notification =
      document.createElement("div");

    notification.className = "notification";

    notification.innerHTML = message;

    this.container.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");

      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 4000);
  }
}

/* ==========================================
   TESTIMONIAL SLIDER
========================================== */

class TestimonialSlider {
  constructor() {
    this.cards = document.querySelectorAll(
      ".testimonial-card"
    );

    if (!this.cards.length) return;

    this.current = 0;

    this.start();
  }

  start() {
    this.cards.forEach((card, index) => {
      card.style.display =
        index === 0 ? "block" : "none";
    });

    setInterval(() => {
      this.next();
    }, 5000);
  }

  next() {
    this.cards[this.current].style.display =
      "none";

    this.current++;

    if (this.current >= this.cards.length) {
      this.current = 0;
    }

    this.cards[this.current].style.display =
      "block";
  }
}

/* ==========================================
   CURSOR INTERACTION
========================================== */

class InteractiveCursor {
  constructor() {
    this.cursor =
      document.querySelector(".cursor-glow");

    if (!this.cursor) return;

    this.init();
  }

  init() {
    const interactive =
      document.querySelectorAll(
        "button,a,.glass-card,.feature-card"
      );

    interactive.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        this.cursor.style.width = "120px";
        this.cursor.style.height = "120px";
      });

      item.addEventListener("mouseleave", () => {
        this.cursor.style.width = "40px";
        this.cursor.style.height = "40px";
      });
    });
  }
}

/* ==========================================
   PREMIUM APP EXTENSION
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    new ParticleEngine();
    new MagneticButtons();
    new NotificationCenter();
    new TestimonialSlider();
    new InteractiveCursor();

    console.log(
      "✨ Anglo Mirante Premium Systems Loaded"
    );
  }
);