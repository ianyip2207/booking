/* ============================================================
   Ally Interiors — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     SHARED UTILITY — VOICE ALERT
     ========================================================= */
  function speakVoiceAlert(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }


  /* =========================================================
     MODULE 1 — NAVBAR
     ========================================================= */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Sticky style on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 80);
  }, { passive: true });

  // Trigger once on load in case page is already scrolled
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 80);

  // Mobile hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('navbar__links--open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('navbar__links--open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Active link via IntersectionObserver
  const sections    = document.querySelectorAll('section[id]');
  const navAnchors  = document.querySelectorAll('.navbar__links .nav-link');

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.navbar__links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => sectionObserver.observe(s));
  }


  /* =========================================================
     MODULE 2 — SCROLL REVEAL
     ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));
  }


  /* =========================================================
     MODULE 3 — PORTFOLIO FILTER
     ========================================================= */
  const filterBtns     = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // Ensure inline transition style is present
  portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      portfolioItems.forEach(item => {
        const matches = filter === 'all' || item.dataset.category === filter;

        if (matches) {
          // Make visible: restore display first, then animate in
          item.style.display = '';
          // rAF ensures display change renders before opacity transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.93)';
          // After transition completes, remove from layout flow
          const onEnd = () => {
            if (item.style.opacity === '0') item.style.display = 'none';
            item.removeEventListener('transitionend', onEnd);
          };
          item.addEventListener('transitionend', onEnd);
        }
      });
    });
  });


  /* =========================================================
     MODULE 4 — TESTIMONIALS CAROUSEL
     ========================================================= */
  const track         = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');

  if (track && dotsContainer && prevBtn && nextBtn) {
    const slides = Array.from(track.querySelectorAll('.carousel__slide'));
    let current  = 0;
    let visCount = getVisibleCount();
    let autoTimer;

    function getVisibleCount() {
      if (window.innerWidth >= 1024) return Math.min(3, slides.length);
      if (window.innerWidth >= 768)  return Math.min(2, slides.length);
      return 1;
    }

    function totalPages() {
      return Math.ceil(slides.length / visCount);
    }

    function setSlideWidths() {
      slides.forEach(s => {
        s.style.minWidth = `${100 / visCount}%`;
      });
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages(); i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
        dot.setAttribute('role', 'tab');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      document.querySelectorAll('.carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
        dot.setAttribute('aria-selected', String(i === current));
      });
    }

    function goTo(index) {
      const max = totalPages() - 1;
      current = Math.max(0, Math.min(index, max));
      // Move by one slide at a time for smooth experience
      const offset = -(current * visCount * (100 / visCount));
      track.style.transform = `translateX(${-(current * 100)}%)`;
      updateDots();
    }

    function startAutoplay() {
      stopAutoplay();
      autoTimer = setInterval(() => {
        goTo(current < totalPages() - 1 ? current + 1 : 0);
      }, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoTimer);
    }

    // Init
    setSlideWidths();
    buildDots();
    startAutoplay();

    prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAutoplay);
    track.parentElement.addEventListener('mouseleave', startAutoplay);

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        goTo(delta > 0 ? current + 1 : current - 1);
        startAutoplay();
      }
    }, { passive: true });

    // Rebuild on resize if visible count changes
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newCount = getVisibleCount();
        if (newCount !== visCount) {
          visCount = newCount;
          current  = 0;
          setSlideWidths();
          buildDots();
          goTo(0);
        }
      }, 200);
    }, { passive: true });
  }


  /* =========================================================
     MODULE 5 — CONTACT FORM (FormSubmit AJAX)
     ========================================================= */
  const contactForm   = document.getElementById('contactForm');
  const submitBtn     = document.getElementById('submitBtn');
  const notification  = document.getElementById('formNotification');

  if (contactForm && submitBtn && notification) {
    const validators = {
      name:    v => v.trim().length >= 2  ? '' : 'Please enter your full name (min. 2 characters).',
      email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
      phone:   v => !v.trim() || /^[\d\s+\-().]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.',
      message: v => v.trim().length >= 10 ? '' : 'Please enter a message (min. 10 characters).',
    };

    function validateField(field) {
      const name     = field.name;
      const rule     = validators[name];
      if (!rule) return true;
      const error    = rule(field.value);
      const errorEl  = document.getElementById(`${name}Error`);
      if (errorEl) errorEl.textContent = error;
      field.classList.toggle('is-error', !!error);
      return !error;
    }

    // Live validation
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      if (field.name === '_honey') return;
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-error')) validateField(field);
      });
    });

    function showNotification(type, message) {
      notification.hidden  = false;
      notification.className = `form-notification form-notification--${type}`;
      notification.querySelector('.form-notification__msg').textContent = message;
      // Smooth scroll to notification
      notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { notification.hidden = true; }, 7000);
    }

    function setLoading(isLoading) {
      submitBtn.disabled = isLoading;
      submitBtn.querySelector('.btn__text').hidden  = isLoading;
      submitBtn.querySelector('.btn__spinner').hidden = !isLoading;
    }

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      // Validate all fields
      const fields   = contactForm.querySelectorAll('input:not([name="_honey"]), textarea');
      let   allValid = true;
      fields.forEach(f => { if (!validateField(f)) allValid = false; });
      if (!allValid) return;

      setLoading(true);
      notification.hidden = true;

      try {
        const formData = new FormData(contactForm);
        const payload  = {};
        formData.forEach((val, key) => { payload[key] = val; });

        const response = await fetch('https://formsubmit.co/ajax/yipchunkit2000@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':        'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && String(data.success) === 'true') {
          contactForm.reset();
          // Clear any lingering error states
          contactForm.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));
          contactForm.querySelectorAll('.form-error').forEach(el => el.textContent = '');
          showNotification('success', 'Thank you! Your message has been received. We will be in touch within 24 hours.');
          speakVoiceAlert('Hurray. Your voice is heard!');
        } else {
          throw new Error(data.message || `Server responded with status ${response.status}`);
        }
      } catch (err) {
        console.error('Form submission error:', err);
        const isActivation = err.message && /activat/i.test(err.message);
        const msg = isActivation
          ? 'Almost there! A confirmation email was sent to the site owner — submissions will be live once it is activated.'
          : 'Something went wrong. Please try again or reach us directly at hello@Allyinteriors.com.';
        showNotification('error', msg);
      } finally {
        setLoading(false);
      }
    });
  }


  /* =========================================================
     MODULE 6 — LIGHTBOX GALLERY
     ========================================================= */
  const portfolioGrid   = document.getElementById('portfolioGrid');
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose   = document.getElementById('lightboxClose');
  const lightboxPrev    = document.getElementById('lightboxPrev');
  const lightboxNext    = document.getElementById('lightboxNext');

  if (portfolioGrid && lightbox) {
    let lightboxItems = [];
    let lightboxIndex = 0;

    function getVisibleItems() {
      return Array.from(portfolioGrid.querySelectorAll('.portfolio-item')).filter(
        item => item.style.display !== 'none' && item.style.opacity !== '0'
      );
    }

    function openLightbox(index) {
      lightboxItems = getVisibleItems().map(item => ({
        src:     item.querySelector('img').src,
        alt:     item.querySelector('img').alt,
        caption: item.querySelector('h3')?.textContent || '',
      }));
      lightboxIndex = Math.max(0, Math.min(index, lightboxItems.length - 1));
      updateLightboxImage();
      lightbox.hidden         = false;
      lightboxBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.hidden         = true;
      lightboxBackdrop.hidden = true;
      document.body.style.overflow = '';
    }

    function updateLightboxImage() {
      if (!lightboxItems.length) return;
      const item = lightboxItems[lightboxIndex];
      // Load a higher-res version for the lightbox
      lightboxImg.src = item.src.replace(/w=\d+/, 'w=1200');
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.caption;
    }

    // Delegate click on grid
    portfolioGrid.addEventListener('click', e => {
      const item = e.target.closest('.portfolio-item');
      if (!item) return;
      // Skip if item is hidden
      if (item.style.display === 'none' || item.style.opacity === '0') return;

      const visibleItems = getVisibleItems();
      const idx = visibleItems.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);

    lightboxPrev.addEventListener('click', () => {
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      updateLightboxImage();
    });

    lightboxNext.addEventListener('click', () => {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft') {
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        updateLightboxImage();
      }
      if (e.key === 'ArrowRight') {
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        updateLightboxImage();
      }
    });
  }


  /* =========================================================
     MODULE 7 — DARK MODE TOGGLE
     ========================================================= */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl      = document.documentElement;

  function updateToggleIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'dark') {
      // Sun icon — click to go light
      themeToggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      // Moon icon — click to go dark
      themeToggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Load saved preference, fall back to OS preference
  const savedTheme = localStorage.getItem('Ally-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  htmlEl.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('Ally-theme', next);
      updateToggleIcon(next);
    });
  }


  /* =========================================================
     MODULE 8 — ANIMATED STATISTICS COUNTER
     ========================================================= */
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const target   = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const startTime = performance.now();

        function tick(now) {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(n => counterObserver.observe(n));
  }


  /* =========================================================
     MODULE 9 — BACK TO TOP & SMOOTH SCROLL
     ========================================================= */
  const backToTopFab = document.getElementById('backToTopFab');

  if (backToTopFab) {
    window.addEventListener('scroll', () => {
      backToTopFab.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTopFab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll with navbar offset for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href   = link.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH    = navbar ? navbar.offsetHeight : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });


  /* =========================================================
     MODULE 10 — SOCIAL ICON CLICK HOOKS
     ========================================================= */
  const facebookIcon = document.querySelector('a[aria-label="Facebook"]');
  if (facebookIcon) {
    facebookIcon.addEventListener('click', () => {
      speakVoiceAlert('Hurray. Your voice is heard!');
    });
  }

}); // end DOMContentLoaded
