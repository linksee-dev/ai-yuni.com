// ============================================
// AWWWARDS-LEVEL JAVASCRIPT
// World's Best Interactive Experience 2026
// ============================================

(function() {
  'use strict';

  // ==========================================
  // 1. CUSTOM CURSOR
  // ==========================================
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;

    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .btn-magnetic, .project-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  // ==========================================
  // 2. LOADING ANIMATION
  // ==========================================
  const loader = document.querySelector('.loader');
  const loaderText = document.querySelector('.loader-text');
  const loaderProgress = document.querySelector('.loader-progress-bar');
  const loaderSpans = loaderText.querySelectorAll('span');

  // Animate loader text
  gsap.to(loaderSpans, {
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // Simulate loading
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);

      // Hide loader
      gsap.to(loader, {
        y: '-100%',
        duration: 1,
        delay: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          // Start page animations
          initPageAnimations();
        }
      });
    }
    loaderProgress.style.width = progress + '%';
  }, 100);

  // ==========================================
  // 3. PARTICLE BACKGROUND
  // ==========================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(235, 111, 70, 0.3)';
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(235, 111, 70, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize canvas
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ==========================================
  // 4. GSAP ANIMATIONS
  // ==========================================
  function initPageAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    const heroTitle = document.querySelectorAll('.hero-title .line span');
    gsap.to(heroTitle, {
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // Hero subtitle
    gsap.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });

    // Hero description
    gsap.to('.hero-description', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.7,
      ease: 'power3.out'
    });

    // Scroll indicator
    gsap.to('.scroll-indicator', {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: 'power3.out'
    });

    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      const chars = title.querySelectorAll('.char');

      gsap.fromTo(chars,
        {
          y: '100%',
          rotate: 10
        },
        {
          y: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Project cards reveal
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image reveal effect
      const imgReveal = card.querySelector('.img-reveal');
      if (imgReveal) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => imgReveal.classList.add('revealed')
        });
      }
    });

    // Stagger items
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
              counter.innerHTML = Math.ceil(counter.innerHTML).toLocaleString();
            }
          });
        }
      });
    });
  }

  // ==========================================
  // 5. MAGNETIC BUTTONS
  // ==========================================
  const magneticButtons = document.querySelectorAll('.btn-magnetic');

  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // ==========================================
  // 6. SMOOTH SCROLL (simplified version)
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 7. SOCIAL LINKS HOVER
  // ==========================================
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#EB6F46',
        duration: 0.3
      });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: '#666',
        duration: 0.3
      });
    });
  });

  // ==========================================
  // 8. PARALLAX EFFECT ON SCROLL
  // ==========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');

    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ==========================================
  // 9. PROJECT CARD TILT EFFECT
  // ==========================================
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        transformPerspective: 1000,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // ==========================================
  // 10. RESIZE HANDLER
  // ==========================================
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // ==========================================
  // 11. PERFORMANCE OPTIMIZATION
  // ==========================================
  // Reduce motion for users who prefer it
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable complex animations
    gsap.globalTimeline.timeScale(100);
  }

  // ==========================================
  // 12. EASTER EGG - KONAMI CODE
  // ==========================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Activate easter egg
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 10000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Add rainbow keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // ==========================================
  // 13. HORIZONTAL SCROLL PARALLAX FOR PRODUCTS
  // ==========================================
  const productHorizontalSections = document.querySelectorAll('.horizontal-scroll-wrapper');

  productHorizontalSections.forEach(section => {
    section.addEventListener('scroll', () => {
      const scrollLeft = section.scrollLeft;
      const items = section.querySelectorAll('.product-item');

      items.forEach((item, index) => {
        const offset = (scrollLeft - (index * 100)) * 0.1;
        const image = item.querySelector('.parallax-image-wrapper > div');
        if (image) {
          gsap.to(image, {
            x: offset,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });
  });

  // ==========================================
  // 14. SOCIAL CARDS STAGGER ANIMATION
  // ==========================================
  const socialCardsPrimary = document.querySelectorAll('.social-card-primary');
  gsap.fromTo(socialCardsPrimary,
    {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.social-primary-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Social mini icons animation
  const socialIconsMini = document.querySelectorAll('.social-icon-mini');
  gsap.fromTo(socialIconsMini,
    {
      opacity: 0,
      scale: 0.5
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: 0.03,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.social-secondary-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ==========================================
  // 15. BOOKMARK ITEMS REVEAL
  // ==========================================
  const bookmarkCategories = document.querySelectorAll('.bookmark-category');
  bookmarkCategories.forEach((category, index) => {
    const items = category.querySelectorAll('.bookmark-item');

    gsap.fromTo(items,
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: category,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // ==========================================
  // 16. PRODUCT ITEMS PARALLAX ON SCROLL
  // ==========================================
  const productItems = document.querySelectorAll('.product-item:not(.coming-soon)');
  productItems.forEach(item => {
    const image = item.querySelector('.product-image');
    if (image) {
      gsap.to(image, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  });

  // ==========================================
  // 17. AUTO HORIZONTAL SCROLL FOR BLOG (AWWWARDS STYLE)
  // ==========================================
  const blogSection = document.querySelector('#blog');
  const blogScrollContent = document.querySelector('.blog-scroll-content');

  if (blogSection && blogScrollContent) {
    // Calculate total scroll distance
    const blogCards = document.querySelectorAll('.blog-card');
    const cardWidth = 450; // width of each card
    const gap = 32; // 2rem gap
    const totalWidth = (cardWidth + gap) * blogCards.length;
    const scrollDistance = totalWidth - window.innerWidth;

    // Create horizontal scroll effect
    gsap.to(blogScrollContent, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: blogSection,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Animate individual blog cards as they come into view
    blogCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0.6,
          scale: 0.95,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: blogSection,
            start: () => `top+=${index * (cardWidth + gap) / 2} top`,
            end: () => `top+=${(index + 1) * (cardWidth + gap)} top`,
            scrub: 1,
            containerAnimation: gsap.to(blogScrollContent, {
              x: -scrollDistance,
              ease: 'none'
            })
          }
        }
      );
    });
  }

  // ==========================================
  // 18. CATEGORY LABELS ANIMATION
  // ==========================================
  const categoryLabels = document.querySelectorAll('.category-label');
  categoryLabels.forEach(label => {
    gsap.fromTo(label,
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: label,
          start: 'left 80%',
          horizontal: true,
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // ==========================================
  // 19. SOCIAL ICON ROTATION ON HOVER
  // ==========================================
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    const card = icon.closest('.social-card');

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        rotation: 360,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });

  // ==========================================
  // 20. PARALLAX BACKGROUND ELEMENTS
  // ==========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: scrolled * 0.5,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    // Parallax for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      const rect = title.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.1;
        gsap.to(title, {
          y: -offset,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  });

  // ==========================================
  // 21. MOUSE MOVE PARALLAX FOR CARDS
  // ==========================================
  const parallaxCards = document.querySelectorAll('.product-item, .social-card-primary');

  parallaxCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;

      gsap.to(card.querySelector('.product-image, .social-icon-large'), {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.product-image, .social-icon-large'), {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // ==========================================
  // 22. REVEAL ELEMENTS ON SCROLL
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .scale-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 23. BOOKMARK ITEM HOVER SOUND EFFECT (VISUAL)
  // ==========================================
  const bookmarkItems = document.querySelectorAll('.bookmark-item');
  bookmarkItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 10,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // ==========================================
  // 24. SMOOTH HORIZONTAL SCROLL WITH WHEEL (PRODUCTS ONLY)
  // ==========================================
  const productHorizontalScrolls = document.querySelectorAll('.horizontal-scroll-wrapper');

  productHorizontalScrolls.forEach(container => {
    container.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    });
  });

  // ==========================================
  // 25. TEXT SPLIT ANIMATION FOR DESCRIPTIONS
  // ==========================================
  function splitTextAnimation(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = text.split('').map(char =>
        `<span class="char-split">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      const chars = element.querySelectorAll('.char-split');

      gsap.fromTo(chars,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  // Apply to specific elements
  // splitTextAnimation('.product-info p');

  // ==========================================
  // CONSOLE MESSAGE
  // ==========================================
  console.log('%c🚀 Welcome to Yuni\'s Portfolio', 'font-size: 20px; font-weight: bold; color: #EB6F46;');
  console.log('%cDesigned for Awwwards 2026', 'font-size: 14px; color: #666;');
  console.log('%cBuilt with GSAP, vanilla JS, and lots of ☕', 'font-size: 12px; color: #999;');
  console.log('%c✨ Featuring:', 'font-size: 14px; font-weight: bold; color: #EB6F46;');
  console.log('%c   • Custom cursor with magnetic effects', 'font-size: 12px; color: #999;');
  console.log('%c   • Particle background system', 'font-size: 12px; color: #999;');
  console.log('%c   • Auto horizontal scroll (Awwwards style)', 'font-size: 12px; color: #999;');
  console.log('%c   • Horizontal scroll galleries for products', 'font-size: 12px; color: #999;');
  console.log('%c   • Advanced parallax effects', 'font-size: 12px; color: #999;');
  console.log('%c   • GSAP ScrollTrigger pin animations', 'font-size: 12px; color: #999;');
  console.log('%c   • 25+ custom animations', 'font-size: 12px; color: #999;');
  console.log('%c   • Primary + secondary social layout', 'font-size: 12px; color: #999;');

})();
