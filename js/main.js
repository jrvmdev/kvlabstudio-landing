const nav = document.querySelector('nav');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
const heroShowcase = document.querySelector('.hero-showcase');
const aboutScene = document.querySelector('.about-placeholder');
const heroSection = document.querySelector('.hero');
const portfolioModal = document.getElementById('portfolioModal');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-project]');
let navHeight = nav ? Math.round(nav.getBoundingClientRect().height) : 88;
const portfolioData = {
  'sentinl-commerce': {
    state: 'Caso destacado · 2026',
    title: 'Sentinl Commerce, inteligencia operativa para ventas B2B',
    summary:
      'Sistema para detectar desvíos de compra, ordenar prioridades y activar alertas antes de que una oportunidad se pierda.',
    problem:
      'El seguimiento manual hacía que los desvíos comerciales se detectaran tarde y que las acciones dependieran de revisar información dispersa.',
    solution:
      'Se diseñó una capa operativa con señales por entidad, alertas automáticas y prioridades visibles para actuar con contexto.',
    result:
      'Información más ordenada, menos seguimiento manual y decisiones comerciales con mejor contexto.',
    link: '',
  },
  'bukta-shop': {
    state: 'E-commerce · CMS',
    title: 'Bukta Shop, e-commerce custom',
    summary:
      'Tienda online reconstruida desde cero con catálogo, carrito, flujo de pedido y CMS propio para la gestión diaria.',
    problem:
      'El cliente venía de una web rota, con baja confiabilidad operativa y sin una estructura clara para gestionar productos, pedidos y futuras integraciones de pago.',
    solution:
      'Se desarrolló una experiencia e-commerce custom con CMS propio, catálogo editable, checkout asistido y hardening web para una futura integración bancaria.',
    result:
      'La marca pasó a tener una tienda administrable, con infraestructura propia y una base técnica más preparada para evolucionar.',
    link: 'https://buktashop.com',
  },
  spmp: {
    state: 'Web corporativa · Industrial',
    title: 'SPMP, presencia corporativa industrial',
    summary:
      'Sitio corporativo industrial para transformar una presencia obsoleta en una herramienta comercial clara y orientada a cotización.',
    problem:
      'La empresa tenía una web desactualizada que no reflejaba su trayectoria, capacidad operativa, flota ni cobertura real en proyectos petroleros, mineros y civiles.',
    solution:
      'Se diseñó una arquitectura con capacidades, flota, cobertura y contacto, junto con un CMS personalizado para mantenimiento interno.',
    result:
      'SPMP quedó con una plataforma más sólida para presentar servicios técnicos y respaldar conversaciones comerciales de cotización.',
    link: 'https://spmp.com.ar',
  },
  viagen: {
    state: 'Web corporativa · Industria',
    title: 'ViaGen, presencia digital para operaciones industriales',
    summary:
      'Sitio corporativo para traducir capacidad operativa —flota, cobertura y recursos en campo— en una propuesta clara para proyectos exigentes.',
    problem:
      'La empresa necesitaba presentar servicios, equipos, áridos y cobertura regional de forma ordenada, sin depender de explicaciones manuales en cada consulta.',
    solution:
      'Se diseñó una experiencia con servicios, flota categorizada, actividades principales, cobertura en Neuquén, La Pampa y Río Negro, y acceso directo a consultas por WhatsApp.',
    result:
      'La capacidad operativa queda mejor explicada y cada consulta puede llegar con más contexto sobre el proyecto, los recursos y la zona requerida.',
    link: 'https://www.viagen.com.ar/',
  },
  academia: {
    state: 'Academia · Scouting',
    title: 'Academia, talento venezolano',
    summary:
      'Presencia digital pensada para ordenar la oferta, explicar mejor el valor y facilitar el primer contacto con una propuesta lista para compartir.',
    problem:
      'La propuesta necesitaba orden visual y narrativa para mostrar talento con más seriedad, generar confianza y evitar depender de explicaciones manuales en cada contacto.',
    solution:
      'Se construyó una landing con mensaje más claro, mejor jerarquía de contenidos y una estructura pensada para presentar el servicio de forma profesional.',
    result:
      'La propuesta gana claridad, transmite más confianza desde el primer vistazo y queda mejor preparada para abrir conversaciones comerciales.',
    link: '',
  },
  'sentinl-narrativa': {
    state: 'SaaS · Tiempo real',
    title: 'Sentinl Narrativa, inteligencia narrativa en tiempo real',
    summary:
      'Plataforma SaaS para centralizar señales de mercado y detectar contexto útil sin perder velocidad.',
    problem:
      'La información estaba dispersa entre múltiples fuentes y era difícil detectar tendencias o cambios relevantes a tiempo.',
    solution:
      'Se diseñó una experiencia que centraliza fuentes, resalta señales relevantes y facilita el monitoreo continuo.',
    result:
      'Menos ruido, mejor lectura del contexto y una base más útil para actuar a tiempo.',
    link: '',
  },
  'threat-intelligence': {
    state: 'Mapa en vivo',
    title: 'Threat Intelligence, mapa de amenazas en vivo',
    summary:
      'Visualización enfocada en monitoreo y priorización para pasar de datos complejos a decisiones más claras.',
    problem:
      'Los datos eran difíciles de leer en conjunto y eso complicaba priorizar incidentes o señales relevantes.',
    solution:
      'Se creó una capa visual en vivo que simplifica la lectura y organiza mejor la información crítica.',
    result:
      'Mayor visibilidad operativa y una respuesta más ordenada frente a escenarios cambiantes.',
    link: '',
  },
  'clinica-dental': {
    state: 'Landing · Salud',
    title: 'Clínica Dental, turnos y captación',
    summary:
      'Landing orientada a captar consultas con recorrido simple, CTA directo y foco en confianza para pacientes que necesitan decidir rápido.',
    problem:
      'La clínica necesitaba transformar interés en consultas reales sin depender solo del teléfono ni de recorridos confusos que enfrían la intención del paciente.',
    solution:
      'Se planteó una landing de alta conversión con CTA a WhatsApp, contenido claro, señales de confianza y un flujo de contacto más simple.',
    result:
      'Más facilidad para consultar, menos fricción para reservar y una presencia mejor preparada para captar búsquedas locales con intención real.',
    link: '',
  },
  propi360: {
    state: 'SaaS · Inmobiliarias',
    title: 'Propi360, plataforma multi-tenant para inmobiliarias',
    summary:
      'Infraestructura digital para gestionar propiedades, contactos, oportunidades y sitios propios por inmobiliaria.',
    problem:
      'Cada inmobiliaria necesitaba operar con datos, usuarios y gestión propios sin perder visibilidad sobre sus oportunidades.',
    solution:
      'Se armó una arquitectura multi-tenant con gestión de propiedades, CRM, sitios por cliente y métricas de origen de leads.',
    result:
      'Cada operación tiene su propio entorno de trabajo y mejores condiciones para gestionar oportunidades con contexto.',
    link: '',
  },
  'arcana-noir': {
    state: 'Landing · Boutique',
    title: 'Arcana Noir, tarot premium',
    summary:
      'Landing premium construida para reforzar percepción de valor y convertir interés en conversaciones.',
    problem:
      'La marca necesitaba diferenciarse y transmitir una experiencia más cuidada para justificar mejor su propuesta.',
    solution:
      'Se trabajó una interfaz con identidad fuerte, narrativa clara y CTA directo a conversación.',
    result:
      'La oferta se percibe con más valor, más personalidad y mayor confianza para dar el siguiente paso.',
    link: '',
  },
  'elite-voyages': {
    state: 'Landing · Travel',
    title: 'Elite Voyages, agencia boutique',
    summary:
      'Propuesta digital orientada a captar leads de mayor intención en una categoría donde la confianza pesa mucho.',
    problem:
      'El negocio necesitaba comunicar experiencia premium y reducir dudas rápido para convertir interés en contacto.',
    solution:
      'Se definió una landing con recorrido claro, mejor jerarquía de información y señales visuales de confianza.',
    result:
      'Más claridad comercial y una experiencia más alineada con clientes que comparan valor antes de escribir.',
    link: '',
  },
  'neuro-balance': {
    state: 'Landing · Wellness',
    title: 'NeuroBalance, bienestar mental',
    summary:
      'Landing pensada para vender productos digitales con narrativa simple y CTA directo.',
    problem:
      'La propuesta necesitaba explicar mejor el valor de las guías y facilitar el paso a la conversación o compra.',
    solution:
      'Se diseñó una estructura de venta con copy más claro, recorrido liviano y foco en conversión.',
    result:
      'La oferta queda mejor explicada y el usuario encuentra más rápido el siguiente paso para avanzar.',
    link: '',
  },
};

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
  return navHeight + 2;
};

const updateNavState = () => {
  if (!nav) return;
  nav.classList.toggle('nav-scrolled', window.scrollY > 14);
};

updateNavState();
window.addEventListener('scroll', updateNavState, { passive: true });

if (nav && 'ResizeObserver' in window) {
  const navObserver = new ResizeObserver(([entry]) => {
    if (entry) {
      navHeight = Math.round(entry.contentRect.height) || navHeight;
    }
  });
  navObserver.observe(nav);
}

window.addEventListener(
  'load',
  () => {
    const startHeroEffects = () => initHeroCinematicBackground();
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(startHeroEffects, { timeout: 2500 });
      return;
    }
    window.setTimeout(startHeroEffects, 600);
  },
  { once: true }
);

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
  if (isCoarsePointer || isMobileViewport) {
    aboutScene.classList.remove('about-boost');
  } else {
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
  .querySelectorAll('.service-card, .process-step, .faq-item, .feature-tag, .project-screenshot, .portfolio-card')
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

const buildWhatsappUrl = (rawNumber, message) => {
  if (!rawNumber) return null;
  const digits = rawNumber.replace(/\D/g, '');
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

const trackConversion = (eventName, eventLabel) => {
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    event_category: 'conversion',
    event_label: eventLabel,
  });
};

document.querySelectorAll('.js-obf-wa, .js-obf-wa-float').forEach((el) => {
  const rawNumber = el.getAttribute('data-n');
  const rawMessage = el.getAttribute('data-m');
  const decodedMessage = rawMessage ? decodeURIComponent(rawMessage) : '';
  const waUrl = buildWhatsappUrl(rawNumber, decodedMessage);
  if (!waUrl) return;

  el.setAttribute('href', waUrl);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener noreferrer');
  el.setAttribute('aria-label', 'Contactar por WhatsApp');
});

document.querySelectorAll('a[href*="wa.me"]').forEach((el) => {
  el.addEventListener('click', () => trackConversion('whatsapp_click', el.textContent.trim() || 'WhatsApp CTA'));
});

document.querySelectorAll('a[href^="mailto:"]').forEach((el) => {
  el.addEventListener('click', () => trackConversion('email_click', el.textContent.trim() || 'Email CTA'));
});

if (portfolioModal && portfolioCards.length > 0) {
  const modalTitle = document.getElementById('portfolioModalTitle');
  const modalState = document.getElementById('portfolioModalState');
  const modalSummary = document.getElementById('portfolioModalSummary');
  const modalProblem = document.getElementById('portfolioModalProblem');
  const modalSolution = document.getElementById('portfolioModalSolution');
  const modalResult = document.getElementById('portfolioModalResult');
  const modalLink = document.getElementById('portfolioModalLink');
  let lastFocusedCard = null;

  const closeModal = () => {
    portfolioModal.classList.remove('is-open');
    portfolioModal.setAttribute('aria-hidden', 'true');
    portfolioModal.setAttribute('inert', '');
    document.body.classList.remove('modal-open');
    if (lastFocusedCard) {
      lastFocusedCard.focus();
    }
  };

  const openModal = (projectId, sourceCard) => {
    const project = portfolioData[projectId];
    if (!project) return;

    lastFocusedCard = sourceCard || null;
    modalState.textContent = project.state;
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalProblem.textContent = project.problem;
    modalSolution.textContent = project.solution;
    modalResult.textContent = project.result;

    if (project.link) {
      modalLink.hidden = false;
      modalLink.href = project.link;
    } else {
      modalLink.hidden = true;
      modalLink.removeAttribute('href');
    }

    portfolioModal.classList.add('is-open');
    portfolioModal.setAttribute('aria-hidden', 'false');
    portfolioModal.removeAttribute('inert');
    document.body.classList.add('modal-open');
    portfolioModal.querySelector('.portfolio-modal__close')?.focus();
  };

  portfolioCards.forEach((card) => {
    const projectId = card.getAttribute('data-project');
    const trigger = card.querySelector('.portfolio-trigger');
    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openModal(projectId, card);
      });
    }

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      openModal(projectId, card);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openModal(projectId, card);
    });
  });

  portfolioModal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', () => closeModal());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && portfolioModal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
