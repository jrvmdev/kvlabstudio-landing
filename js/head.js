window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-ME85J1FH9J');

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
