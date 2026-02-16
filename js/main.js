const nav = document.querySelector('nav');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
const heroShowcase = document.querySelector('.hero-showcase');
const aboutScene = document.querySelector('.about-placeholder');
const heroSection = document.querySelector('.hero');

const initHeroCinematicBackground = () => {
  if (!heroSection || prefersReducedMotion) return;
  if (isCoarsePointer || isMobileViewport) {
    heroSection.style.setProperty('--hero-pointer-x', '50%');
    heroSection.style.setProperty('--hero-pointer-y', '42%');
    return;
  }

  const pointer = { x: 0.5, y: 0.42, targetX: 0.5, targetY: 0.42 };
  let rafId = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const animate = () => {
    pointer.x += (pointer.targetX - pointer.x) * 0.055;
    pointer.y += (pointer.targetY - pointer.y) * 0.055;
    heroSection.style.setProperty('--hero-pointer-x', `${(pointer.x * 100).toFixed(2)}%`);
    heroSection.style.setProperty('--hero-pointer-y', `${(pointer.y * 100).toFixed(2)}%`);
    rafId = window.requestAnimationFrame(animate);
  };

  const updatePointer = (clientX, clientY) => {
    const rect = heroSection.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.targetX = clamp((clientX - rect.left) / rect.width, 0, 1);
    pointer.targetY = clamp((clientY - rect.top) / rect.height, 0, 1);
  };

  const onMouseMove = (event) => updatePointer(event.clientX, event.clientY);
  heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
  heroSection.addEventListener('mouseleave', () => {
    pointer.targetX = 0.5;
    pointer.targetY = 0.42;
  });

  animate();

  // Keep a reference so future enhancements can stop/restart this loop if needed.
  heroSection.dataset.heroFxRaf = String(rafId);
};

const getNavOffset = () => {
  const base = nav ? nav.offsetHeight : 88;
  return base + 2;
};

const updateNavState = () => {
  if (!nav) return;
  nav.classList.toggle('nav-scrolled', window.scrollY > 14);
};

updateNavState();
window.addEventListener('scroll', updateNavState, { passive: true });
initHeroCinematicBackground();

if (heroShowcase && !prefersReducedMotion) {
  const layers = heroShowcase.querySelectorAll('[data-depth]');

  const bringToFront = (activeLayer) => {
    layers.forEach((layer) => layer.classList.remove('is-front'));
    activeLayer.classList.add('is-front');
  };

  if (layers.length > 0) {
    bringToFront(layers[0]);
  }

  const moveLayers = (event) => {
    const rect = heroShowcase.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0');
      const offsetX = relX * 28 * depth;
      const offsetY = relY * 20 * depth;
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });
  };

  const resetLayers = () => {
    layers.forEach((layer) => {
      layer.style.transform = '';
    });
  };

  heroShowcase.addEventListener('mousemove', moveLayers);
  heroShowcase.addEventListener('mouseleave', resetLayers);

  layers.forEach((layer) => {
    layer.addEventListener('mouseenter', () => bringToFront(layer));
    layer.addEventListener('click', () => bringToFront(layer));
    layer.addEventListener('touchstart', () => bringToFront(layer), { passive: true });
  });
}

if (aboutScene && !prefersReducedMotion) {
  const layers = aboutScene.querySelectorAll(
    '[data-depth]:not(.about-orbit):not(.about-core):not(.about-micro-metrics)'
  );

  const moveLayers = (event) => {
    const rect = aboutScene.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
    const pointerY = ((event.clientY - rect.top) / rect.height) * 100;
    aboutScene.style.setProperty('--mx', `${pointerX}%`);
    aboutScene.style.setProperty('--my', `${pointerY}%`);

    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth') || '0');
      const offsetX = relX * 26 * depth;
      const offsetY = relY * 22 * depth;
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });
  };

  const resetLayers = () => {
    layers.forEach((layer) => {
      layer.style.transform = '';
    });
    aboutScene.style.removeProperty('--mx');
    aboutScene.style.removeProperty('--my');
    aboutScene.classList.remove('about-boost');
  };

  aboutScene.addEventListener('mouseenter', () => {
    aboutScene.classList.add('about-boost');
  });
  aboutScene.addEventListener('mousemove', moveLayers);
  aboutScene.addEventListener('mouseleave', resetLayers);
}

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    const expanded = nav.classList.contains('nav-open');
    mobileBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('nav-open'));
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav-open')) return;
    if (nav.contains(e.target)) return;
    nav.classList.remove('nav-open');
    mobileBtn.setAttribute('aria-expanded', 'false');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const anchorTarget =
      (href === '#contacto'
        ? target.querySelector('.contact-wrapper')
        : href === '#servicios'
          ? target.querySelector('.services-grid')
          : target.querySelector('.section-header, .hero-content')) || target;

    const performScroll = (behavior) => {
      const top =
        anchorTarget.getBoundingClientRect().top +
        window.pageYOffset -
        getNavOffset();
      window.scrollTo({ top, behavior });
    };

    performScroll(prefersReducedMotion ? 'auto' : 'smooth');

    if (!prefersReducedMotion) {
      // Segunda corrección para evitar cortes si cambia el layout durante el scroll.
      window.setTimeout(() => performScroll('auto'), 420);
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document
  .querySelectorAll('.service-card, .process-step, .faq-item, .feature-tag, .project-screenshot, .portfolio-card, .hero-showcase-main, .hero-project-card, .hero-mini-card')
  .forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

document.querySelectorAll('video').forEach((videoEl) => {
  const source = videoEl.querySelector('source[data-src]');
  if (!source) return;

  const loadVideo = () => {
    if (source.src) return;
    source.src = source.dataset.src || '';
    videoEl.load();
    videoEl.play().catch(() => {});
  };

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadVideo();
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '220px 0px', threshold: 0.12 }
    );

    videoObserver.observe(videoEl);
  } else {
    loadVideo();
  }
});

document.querySelectorAll('.js-obf-email').forEach((el) => {
  const user = el.getAttribute('data-u');
  const domain = el.getAttribute('data-d');
  const tld = el.getAttribute('data-t');
  if (!user || !domain || !tld) return;

  const email = `${user}@${domain}.${tld}`;
  el.setAttribute('href', `mailto:${email}`);
  el.textContent = email;
  el.setAttribute('aria-label', `Enviar email a ${email}`);
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const phone = document.getElementById('phone')?.value?.trim() || 'No especificado';
    const project = document.getElementById('project')?.value?.trim() || '';

    const message = [
      'Hola KvLabStudio, quiero consultar por un proyecto.',
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Telefono: ${phone}`,
      `Proyecto: ${project}`,
    ].join('\n');

    const wa = `https://wa.me/5491122773720?text=${encodeURIComponent(message)}`;
    window.open(wa, '_blank', 'noopener,noreferrer');

    contactForm.reset();
  });
}
