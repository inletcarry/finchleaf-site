(function () {
  var gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;

  var mainImg = document.getElementById('gallery-main');
  var captionEl = document.getElementById('gallery-caption');
  var countEl = document.getElementById('gallery-count');
  var prevBtn = document.getElementById('gallery-prev');
  var nextBtn = document.getElementById('gallery-next');
  var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('.thumb'));

  if (!mainImg || !thumbs.length) return;

  var activeIndex = 0;

  function selectAngle(index) {
    var total = thumbs.length;
    var nextIdx = ((index % total) + total) % total;
    var btn = thumbs[nextIdx];
    var src = btn.getAttribute('data-src');
    var caption = btn.getAttribute('data-caption') || '';
    var alt = btn.getAttribute('data-alt') || caption;

    activeIndex = nextIdx;

    thumbs.forEach(function (t, i) {
      var isCurrent = i === activeIndex;
      t.classList.toggle('is-active', isCurrent);
      t.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    if (captionEl) captionEl.textContent = caption;
    if (countEl) countEl.textContent = '0' + (activeIndex + 1) + ' / 0' + total;

    if (mainImg.getAttribute('src') !== src) {
      mainImg.classList.add('is-fading');
      window.setTimeout(function () {
        mainImg.setAttribute('src', src);
        mainImg.setAttribute('alt', alt);
        mainImg.classList.remove('is-fading');
      }, 110);
    }
  }

  thumbs.forEach(function (btn, idx) {
    btn.addEventListener('click', function () {
      selectAngle(idx);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      selectAngle(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      selectAngle(activeIndex + 1);
    });
  }

  gallery.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectAngle(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectAngle(activeIndex - 1);
    }
  });
})();
