window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-ME85J1FH9J');

function loadAnalytics() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ME85J1FH9J';
  document.head.appendChild(script);
}

window.addEventListener(
  'load',
  function () {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 4000 });
      return;
    }

    window.setTimeout(loadAnalytics, 1200);
  },
  { once: true }
);

document.addEventListener(
  'error',
  function (event) {
    var el = event.target;
    if (!el || el.tagName !== 'IMG' || el.dataset.assetFallbackTried === 'true') return;

    var src = el.getAttribute('src') || '';
    if (src.indexOf('/images/') === 0) {
      el.dataset.assetFallbackTried = 'true';
      el.src = src.slice(1);
    } else if (src.indexOf('images/') === 0 && window.location.protocol !== 'file:') {
      el.dataset.assetFallbackTried = 'true';
      el.src = '/' + src;
    }
  },
  true
);
