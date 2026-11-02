/* Pepinstep — interactions */
(function () {
  /* Screenshot/capture mode: ?capture pins viewport-relative sizing */
  if (location.search.indexOf('capture') !== -1) {
    var cs = document.createElement('style');
    cs.textContent = '.hero{min-height:860px!important}';
    document.head.appendChild(cs);
  }

  var header = document.getElementById('siteHeader');
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  /* Header shrink on scroll */
  var onScroll = function () {
    header.classList.toggle('shrunk', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  menuToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Reveal on scroll */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var meters = document.querySelector('.meters');
  var ticking = false;
  function checkReveals() {
    ticking = false;
    var limit = window.innerHeight - 40;
    reveals = reveals.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add('in');
        return false;
      }
      return true;
    });
    if (meters && meters.getBoundingClientRect().top < limit) {
      meters.classList.add('on');
      meters = null;
    }
  }
  function queueCheck() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(checkReveals);
    }
  }
  window.addEventListener('scroll', queueCheck, { passive: true });
  window.addEventListener('resize', queueCheck, { passive: true });
  window.addEventListener('load', checkReveals);
  checkReveals();

  /* Wait-list form: submit into hidden iframe, then show success */
  var wlForm = document.getElementById('waitlistForm');
  var wlSuccess = document.getElementById('wlSuccess');
  if (wlForm && wlSuccess) {
    wlForm.addEventListener('submit', function () {
      setTimeout(function () {
        wlForm.hidden = true;
        wlSuccess.hidden = false;
        wlSuccess.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 400);
    });
  }

  /* Year */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
