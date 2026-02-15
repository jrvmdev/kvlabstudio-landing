const nav = document.querySelector('nav');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

const getNavOffset = () => {
  const base = nav ? nav.offsetHeight : 88;
  return base + 2;
};

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
      target.querySelector('.section-header, .contact-info, .hero-content') || target;
    const top =
      anchorTarget.getBoundingClientRect().top +
      window.pageYOffset -
      getNavOffset();
    window.scrollTo({ top, behavior: 'smooth' });
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
  .querySelectorAll('.service-card, .process-step, .faq-item, .feature-tag, .project-screenshot')
  .forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

const projectVideo = document.querySelector('.project-video');
if (projectVideo) {
  const source = projectVideo.querySelector('source[data-src]');

  const loadVideo = () => {
    if (!source || source.src) return;
    source.src = source.dataset.src || '';
    projectVideo.load();
    projectVideo.play().catch(() => {});
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
      { rootMargin: '200px 0px', threshold: 0.1 }
    );

    videoObserver.observe(projectVideo);
  } else {
    loadVideo();
  }
}

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
