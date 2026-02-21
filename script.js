(function () {
  'use strict';

  // Hero video sequence: 2.mp4 -> hero-video.mp4 -> 3.mp4 -> loop
  var heroVideoSources = [
    'assets/hero-video-1.mp4',
    'assets/hero-video.mp4',
    'assets/hero-video-3.mp4'
  ];
  var heroVideoIndex = 0;
  var heroVideo = document.getElementById('heroVideo');

  if (heroVideo) {
    heroVideo.addEventListener('ended', function () {
      heroVideoIndex = (heroVideoIndex + 1) % heroVideoSources.length;
      heroVideo.querySelector('source').src = heroVideoSources[heroVideoIndex];
      heroVideo.load();
      heroVideo.play();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Meat selection: max 2 checkboxes
  var meatCheckboxes = document.querySelectorAll('.checkbox-group[data-max="2"] input[type="checkbox"]');
  var meatHint = document.getElementById('meatHint');
  var maxMeat = 2;

  meatCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      var checked = document.querySelectorAll('.checkbox-group[data-max="2"] input[type="checkbox"]:checked');
      if (checked.length >= maxMeat) {
        meatCheckboxes.forEach(function (other) {
          if (!other.checked) other.disabled = true;
        });
        meatHint.textContent = '2 selected';
      } else {
        meatCheckboxes.forEach(function (other) {
          other.disabled = false;
        });
        meatHint.textContent = checked.length === 1 ? 'Pick 1 more' : 'Pick 2';
      }
    });
  });

  // Form submission via Fetch (keeps user on page, shows success message)
  var form = document.getElementById('quoteForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('.submit-btn');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var formData = new FormData(form);
      formData.append('_next', window.location.href);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.style.display = 'none';
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          alert('Something went wrong. Please try calling (619) 207-2610 to request a quote.');
        });
    });
  }
})();
