/* ========================================
   SILVER GYM — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Hero Slider ---
  const heroSlides = document.querySelectorAll('.hero-bg');
  let currentSlide = 0;

  function showSlide(index) {
    heroSlides.forEach(function (slide) {
      slide.classList.remove('active');
    });
    heroSlides[index].classList.add('active');
  }

  if (heroSlides.length > 1) {
    showSlide(0);
    setInterval(function () {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // --- Scroll Animations ---
  const animateElements = document.querySelectorAll('.animate-in');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Gallery Lightbox ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const imgSrc = item.querySelector('img').src;
      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightbox) lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function () {
      if (lightbox) lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Gallery Page Branch Filter & Tab Handler ---
  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryPortalCards = document.querySelectorAll('.gallery-portal-card');
  const gallerySections = document.querySelectorAll('.gallery-branch-section');

  function setBranchGallery(branchId, smoothScroll) {
    if (!branchId) branchId = 'all';

    // 1. Update Tab buttons
    galleryTabBtns.forEach(function (btn) {
      if (btn.getAttribute('data-branch') === branchId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Update Portal cards
    galleryPortalCards.forEach(function (card) {
      if (card.getAttribute('data-branch') === branchId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 3. Show / hide branch sections
    gallerySections.forEach(function (sec) {
      const secBranch = sec.getAttribute('data-branch');
      if (branchId === 'all' || secBranch === branchId) {
        sec.style.display = 'block';
        sec.classList.add('animate-in', 'visible');
      } else {
        sec.style.display = 'none';
      }
    });

    // 4. Smooth scroll to gallery content if requested
    if (smoothScroll) {
      const targetElement = branchId === 'all'
        ? document.querySelector('.section-gallery-page')
        : document.getElementById('gallery-' + branchId);
      if (targetElement) {
        const offset = 90;
        const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  }

  // Hook tab buttons
  galleryTabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const branch = this.getAttribute('data-branch');
      setBranchGallery(branch, false);
    });
  });

  // Hook portal cards
  galleryPortalCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const branch = this.getAttribute('data-branch');
      setBranchGallery(branch, true);
    });
  });

  // Support URL params e.g. gallery.html?branch=rayarbag or hash e.g. #rayarbag
  const urlParams = new URLSearchParams(window.location.search);
  const branchParam = urlParams.get('branch');
  const hashParam = window.location.hash ? window.location.hash.replace('#', '') : null;

  if (branchParam) {
    setBranchGallery(branchParam, true);
  } else if (hashParam && (hashParam === 'rayarbag' || hashParam === 'south-banasree' || hashParam === 'rampura')) {
    setBranchGallery(hashParam, true);
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Form Submission ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your message has been sent. We will contact you shortly.');
      contactForm.reset();
    });
  }

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

});
