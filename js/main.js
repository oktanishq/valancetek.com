// Valance Technologies - Optimized Main JavaScript
// Performance optimized and cleaned up version

(function() {
  'use strict';

  // Performance: Use requestAnimationFrame for smooth animations
  let animationFrameId = null;

  // Initialize all modules when DOM is ready
  function init() {
    initNavigation();
    initForms();
    initAnimations();
    initPageTransitions();
    initLoadingStates();
    initMicroInteractions();
    initVisualPolish();
    initPerformanceMonitoring();
    initUtilities();
    initAboutPageInteractions();

    // Initialize random services with a slight delay to ensure DOM is fully ready
    setTimeout(() => {
      initRandomServices();
    }, 100);

    // Also initialize on window load as backup
    window.addEventListener('load', () => {
      setTimeout(() => {
        initRandomServices();
      }, 200);
    }, { passive: true });

    // Initialize dynamic footer loading
    initDynamicFooter();

    // Initialize dynamic navbar loading
    initDynamicNavbar();
  }

  // Check if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/**
 * Initializes the navigation functionality including mobile menu toggle,
 * accessibility features, and event handlers.
 *
 * Features:
 * - Mobile menu toggle with ARIA attributes for accessibility
 * - Click outside to close menu
 * - Escape key to close menu
 * - Passive event listeners for performance
 */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) return;

  // Optimized event handlers with passive listeners where appropriate
  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  };

  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  };

  // Mobile menu toggle
  navToggle.addEventListener('click', toggleMenu, { passive: true });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
      closeMenu();
    }
  }, { passive: true });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  }, { passive: true });
}

/**
 * Initializes form validation and handling functionality.
 *
 * Features:
 * - Real-time field validation with visual feedback
 * - Contact form submission with required field validation
 * - Newsletter signup form handling
 * - Accessibility features with ARIA attributes
 * - Error message display and removal
 * - Form reset after successful submission
 *
 * @param {HTMLInputElement} field - The form field to validate
 * @returns {boolean} - True if field is valid, false otherwise
 */
function initForms() {
  // Optimized form validation with better performance
  const validateField = (field) => {
    const fieldContainer = field.closest('.form-group');
    const existingError = fieldContainer?.querySelector('.error-message');

    if (existingError) {
      existingError.remove();
    }

    const isValid = field.value.trim() !== '';
    field.style.borderColor = isValid ? '#28a745' : '#dc3545';
    field.setAttribute('aria-invalid', isValid ? 'false' : 'true');

    if (!isValid && fieldContainer) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'This field is required';
      errorMessage.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
      fieldContainer.appendChild(errorMessage);
    }

    return isValid;
  };

  // Contact form validation and submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      let firstInvalidField = null;

      requiredFields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });

      if (!isValid) {
        firstInvalidField?.focus();
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // Show success message
          showFormMessage(contactForm, result.message, 'success');
          contactForm.reset();

          console.log('Form submitted successfully');
        } else {
          // Show error message
          showFormMessage(contactForm, result.message, 'error');
          if (result.errors) {
            console.log('Validation errors:', result.errors);
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage(contactForm, 'Sorry, there was an error sending your message. Please try again.', 'error');
      } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }, { passive: false });
  }

  // Newsletter form handling
  const newsletterForm = document.querySelector('.signup-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(newsletterForm);
        const response = await fetch(newsletterForm.action, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          showFormMessage(newsletterForm, result.message, 'success');
          newsletterForm.reset();
          console.log('Newsletter submitted successfully');
        } else {
          showFormMessage(newsletterForm, result.message, 'error');
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        showFormMessage(newsletterForm, 'Sorry, there was an error subscribing. Please try again.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }, { passive: false });
  }

  // Helper function to show form messages
  function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 8px;
      font-weight: 500;
      text-align: center;
      ${type === 'success'
        ? 'background: rgba(0, 194, 80, 0.1); color: #00c250; border: 1px solid rgba(0, 194, 80, 0.3);'
        : 'background: rgba(220, 53, 69, 0.1); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.3);'
      }
    `;

    // Insert message after form
    form.appendChild(messageDiv);

    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 5000);
    }
  }

  // Real-time validation for all forms
  document.querySelectorAll('form').forEach((form) => {
    form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required')) {
          validateField(input);
        }
      }, { passive: true });
    });
  });
}

/**
 * Initializes all animation functionality for the website.
 *
 * Features:
 * - Scroll-triggered animations using Intersection Observer API
 * - Button ripple effects on click
 * - Card hover effects with transform animations
 * - Typing effect for hero title
 * - Loading animation for page initialization
 * - Performance optimized with passive event listeners
 *
 * Animation classes supported:
 * - .scroll-animate, .scroll-animate-left, .scroll-animate-right
 * - .scroll-zoom, .scroll-bounce, .scroll-stagger
 * - .scroll-fade-in, .scroll-slide-up, .scroll-slide-left
 * - .scroll-slide-right, .scroll-scale-in
 */
function initAnimations() {
  // Optimized scroll animations with Intersection Observer
  // Intersection Observer provides better performance than scroll event listeners
  // threshold: 0.15 means animation triggers when 15% of element is visible (more reliable)
  // rootMargin: '0px 0px -30px 0px' triggers animation 30px before element enters viewport
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.15, // Trigger when 15% of element is visible (more reliable)
      rootMargin: '0px 0px -30px 0px' // Start animation 30px before element enters viewport
    };

    // Create observer that adds 'animate' class when elements come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Only animate elements that are intersecting (visible in viewport)
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          entry.target.classList.remove('initial-state');
          // Debug: Log when animation is triggered
          console.log('Animation triggered for:', entry.target.className, 'Intersection ratio:', entry.intersectionRatio);
        }
      });
    }, observerOptions);

    // Target all scroll animation classes
    const animateElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-zoom, ' +
      '.scroll-bounce, .scroll-stagger, .scroll-fade-in, .scroll-slide-up, ' +
      '.scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
    );

    animateElements.forEach((element, index) => {
      // Ensure elements start in their initial state (invisible)
      if (!element.classList.contains('animate')) {
        element.classList.add('initial-state');
      }
      element.style.setProperty('--animation-order', index);
      observer.observe(element);
    });

    // Debug: Log how many elements are being observed
    console.log('Scroll animation elements found:', animateElements.length);
    console.log('Observer options:', observerOptions);
  }

  // Add loading animation to page
  document.body.classList.add('loaded');

  // Optimized button ripple effects
  // Creates a visual ripple effect that follows the user's click position
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // Create ripple element and add to button
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      button.appendChild(ripple);

      // Get button dimensions and click position
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height); // Use larger dimension for circle
      // Calculate position to center ripple on click point
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Position and size the ripple element
      Object.assign(ripple.style, {
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px'
      });

      // Remove ripple after animation completes (600ms matches CSS animation duration)
      setTimeout(() => ripple.remove(), 600);
    }, { passive: true });
  });

  // Optimized card hover effects
  const cards = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .portfolio-item, .team-member');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    }, { passive: true });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    }, { passive: true });
  });

  // Typing effect for hero title (optimized)
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && !heroTitle.classList.contains('typed')) {
    heroTitle.classList.add('typed');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }
}

/**
 * Initializes smooth page transitions between pages.
 *
 * Features:
 * - Page enter animations on load
 * - Page exit animations on navigation
 * - Transition overlay for visual feedback
 * - Loading states during navigation
 * - Performance optimized with requestAnimationFrame
 */
function initPageTransitions() {
  // Add page transition class to body
  document.body.classList.add('page-transition');

  // Create transition overlay and loader
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  const loader = document.createElement('div');
  loader.className = 'page-transition-loader';
  document.body.appendChild(loader);

  // Page enter animation
  const enterPage = () => {
    requestAnimationFrame(() => {
      document.body.classList.add('loaded');
      overlay.classList.remove('active');
      loader.classList.remove('active');
    });
  };

  // Page exit animation
  const exitPage = (callback) => {
    document.body.classList.add('exiting');
    overlay.classList.add('active');
    loader.classList.add('active');

    setTimeout(() => {
      if (callback) callback();
    }, 400);
  };

  // Handle navigation links for smooth transitions
  const handleNavigation = (event, href) => {
    event.preventDefault();

    exitPage(() => {
      window.location.href = href;
    });
  };

  // Add click handlers to navigation links
  const navLinks = document.querySelectorAll('a[href]');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Only handle internal links (not external or anchors)
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.includes('mailto:') && !href.includes('tel:')) {
      link.addEventListener('click', (event) => {
        handleNavigation(event, href);
      }, { passive: false });
    }
  });

  // Trigger page enter animation after a short delay
  setTimeout(enterPage, 100);

  // Handle browser back/forward buttons
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Page was restored from cache, trigger enter animation
      setTimeout(enterPage, 100);
    } else {
      // Page was loaded normally (including back/forward navigation)
      // Re-initialize dynamic components if they haven't loaded yet
      setTimeout(() => {
        const existingNavbar = document.querySelector('nav.navbar');
        const existingFooter = document.querySelector('footer.footer');

        // Add flag to prevent duplicate initialization
        if (!window.navbarInitialized && !existingNavbar) {
          console.log('Re-initializing navbar on page navigation');
          window.navbarInitialized = true;
          initDynamicNavbar();
        }
        if (!window.footerInitialized && !existingFooter) {
          console.log('Re-initializing footer on page navigation');
          window.footerInitialized = true;
          initDynamicFooter();
        }
      }, 100);
    }
  }, { passive: true });
}

/**
 * Initializes enhanced loading states and animations.
 *
 * Features:
 * - Image loading states with lazy loading
 * - Progressive content loading
 * - Enhanced form loading states
 * - Skeleton loading animations
 * - Performance optimized with Intersection Observer
 */
function initLoadingStates() {
  // Enhanced image loading with lazy loading
  const initImageLoading = () => {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src') || img.src;

            // Add loading class
            img.parentElement?.classList.add('image-loading');

            // Create new image to preload
            const newImg = new Image();
            newImg.onload = () => {
              img.src = src;
              img.classList.add('loaded');
              img.parentElement?.classList.remove('image-loading');
              imageObserver.unobserve(img);
            };
            newImg.src = src;
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });

      images.forEach(img => imageObserver.observe(img));
    }
  };

  // Progressive content loading
  const initProgressiveLoading = () => {
    const progressiveElements = document.querySelectorAll('.progressive-load');

    if ('IntersectionObserver' in window) {
      const progressiveObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('loaded');
              progressiveObserver.unobserve(entry.target);
            }, index * 100); // Stagger the loading
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      progressiveElements.forEach(element => progressiveObserver.observe(element));
    } else {
      // Fallback for browsers without Intersection Observer
      progressiveElements.forEach((element, index) => {
        setTimeout(() => element.classList.add('loaded'), index * 100);
      });
    }
  };

  // Enhanced form loading states
  const initFormLoadingStates = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');

        if (submitBtn && !this.classList.contains('form-loading')) {
          e.preventDefault();

          // Add loading state
          this.classList.add('form-loading');
          submitBtn.classList.add('btn-loading');
          submitBtn.disabled = true;

          // Simulate form processing (replace with actual form submission)
          setTimeout(() => {
            this.classList.remove('form-loading');
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Form submitted successfully!';
            successMsg.style.cssText = 'color: #28a745; font-size: 0.875rem; margin-top: 0.5rem;';
            this.appendChild(successMsg);

            setTimeout(() => successMsg.remove(), 3000);
          }, 2000);
        }
      }, { passive: false });
    });
  };

  // Skeleton loading for dynamic content
  const initSkeletonLoading = () => {
    const skeletonContainers = document.querySelectorAll('[data-skeleton]');

    skeletonContainers.forEach(container => {
      const skeletonType = container.getAttribute('data-skeleton');
      const skeletonHTML = generateSkeletonHTML(skeletonType);

      if (skeletonHTML) {
        container.innerHTML = skeletonHTML;
        container.classList.add('skeleton-loading');

        // Simulate content loading
        setTimeout(() => {
          container.classList.remove('skeleton-loading');
          // In real implementation, replace with actual content
        }, 2000);
      }
    });
  };

  // Generate skeleton HTML based on type
  const generateSkeletonHTML = (type) => {
    switch (type) {
      case 'card':
        return `
          <div class="skeleton-card">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
          </div>
        `;
      case 'text':
        return `
          <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 8px;"></div>
          <div class="skeleton" style="height: 16px; width: 80%; margin-bottom: 8px;"></div>
          <div class="skeleton" style="height: 16px; width: 90%;"></div>
        `;
      default:
        return `<div class="skeleton" style="height: 20px; width: 100%;"></div>`;
    }
  };

  // Initialize all loading states
  initImageLoading();
  initProgressiveLoading();
  initFormLoadingStates();
  initSkeletonLoading();
}

/**
 * Initializes micro-interactions for enhanced user feedback.
 *
 * Features:
 * - Enhanced button interactions with ripple effects
 * - Interactive form field animations
 * - Card hover effects with micro-animations
 * - Tooltip functionality
 * - Notification badge animations
 * - Heart/like animations
 * - Performance optimized with passive event listeners
 */
function initMicroInteractions() {
  // Enhanced button interactions
  const initButtonInteractions = () => {
    const buttons = document.querySelectorAll('.btn, .btn-secondary, button');

    buttons.forEach(button => {
      // Add click feedback with optimized timing
      button.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          this.style.transform = '';
          this.style.transition = '';
        }, 150);
      }, { passive: true });

      // Add hover micro-interactions
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      }, { passive: true });

      button.addEventListener('mouseleave', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  };

  // Interactive form fields
  const initFormInteractions = () => {
    const formFields = document.querySelectorAll('input, textarea, select');

    formFields.forEach(field => {
      // Focus animations
      field.addEventListener('focus', function() {
        this.parentElement?.classList.add('form-field-interactive');
      }, { passive: true });

      field.addEventListener('blur', function() {
        this.parentElement?.classList.remove('form-field-interactive');
      }, { passive: true });

      // Input feedback
      field.addEventListener('input', function() {
        if (this.value.length > 0) {
          this.classList.add('has-content');
        } else {
          this.classList.remove('has-content');
        }
      }, { passive: true });
    });
  };

  // Card micro-interactions
  const initCardInteractions = () => {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .portfolio-item, .team-member');

    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 194, 80, 0.2)';
      }, { passive: true });

      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, { passive: true });

      // Add click feedback with optimized timing
      card.addEventListener('click', function() {
        this.style.transform = 'translateY(-4px) scale(0.98)';
        this.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          this.style.transform = 'translateY(-8px) scale(1.02)';
          this.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 150);
      }, { passive: true });
    });
  };

  // Tooltip functionality
  const initTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
      element.classList.add('tooltip');
    });
  };

  // Heart/like animation
  const initHeartAnimation = () => {
    const hearts = document.querySelectorAll('.heart-animation');

    hearts.forEach(heart => {
      heart.addEventListener('click', function() {
        this.classList.toggle('liked');
      }, { passive: true });
    });
  };

  // Notification badge animation
  const initNotificationBadges = () => {
    const badges = document.querySelectorAll('.notification-badge');

    // Simulate notification updates
    setInterval(() => {
      badges.forEach(badge => {
        const currentCount = parseInt(badge.getAttribute('data-count') || '0');
        const newCount = Math.floor(Math.random() * 10);
        if (newCount !== currentCount) {
          badge.setAttribute('data-count', newCount);
          badge.style.animation = 'notification-pulse 2s infinite';
          setTimeout(() => {
            badge.style.animation = '';
          }, 2000);
        }
      });
    }, 10000); // Update every 10 seconds
  };

  // Toggle switch animation
  const initToggleSwitches = () => {
    const toggles = document.querySelectorAll('.toggle-switch');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        this.classList.toggle('active');
      }, { passive: true });
    });
  };

  // Progress bar animation
  const initProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
      const fill = bar.querySelector('.progress-fill');
      if (fill) {
        // Animate progress bar on scroll
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              fill.style.width = fill.getAttribute('data-progress') || '75%';
            }
          });
        }, { threshold: 0.5 });

        observer.observe(bar);
      }
    });
  };

  // Icon micro-interactions
  const initIconInteractions = () => {
    const icons = document.querySelectorAll('.icon-interactive, .social-link span, .contact-icon');

    icons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.color = '#00c250';
      }, { passive: true });

      icon.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.color = '';
      }, { passive: true });

      icon.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.1) rotate(5deg)';
        }, 100);
      }, { passive: true });
    });
  };

  // Initialize all micro-interactions
  initButtonInteractions();
  initFormInteractions();
  initCardInteractions();
  initTooltips();
  initHeartAnimation();
  initNotificationBadges();
  initToggleSwitches();
  initProgressBars();
  initIconInteractions();
}

/**
 * Initializes advanced visual polish effects.
 *
 * Features:
 * - Parallax scrolling effects
 * - Dynamic shadow animations
 * - Magnetic hover effects
 * - Advanced color transitions
 * - Performance optimized with requestAnimationFrame
 */
function initVisualPolish() {
  // Parallax scrolling effects
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');

    if (parallaxElements.length > 0) {
      let ticking = false;

      const updateParallax = () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
          const speed = element.classList.contains('parallax-slow') ? 0.5 :
                       element.classList.contains('parallax-medium') ? 0.75 : 1;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
    }
  };

  // Dynamic shadow animations
  const initDynamicShadows = () => {
    const shadowElements = document.querySelectorAll('.shadow-animated');

    shadowElements.forEach(element => {
      let animationId = null;
      let startTime = null;

      const animateShadow = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Create pulsing shadow effect
        const intensity = Math.sin(elapsed * 0.002) * 0.5 + 0.5;
        const shadowSize = 10 + (intensity * 20);

        element.style.boxShadow = `
          0 4px ${shadowSize}px rgba(0, 194, 80, ${0.1 + intensity * 0.2}),
          0 10px ${shadowSize * 2}px rgba(0, 194, 80, ${0.08 + intensity * 0.15})
        `;

        animationId = requestAnimationFrame(animateShadow);
      };

      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationId) {
            animationId = requestAnimationFrame(animateShadow);
          } else if (!entry.isIntersecting && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
    });
  };

  // Magnetic hover effects
  const initMagneticEffects = () => {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(element => {
      element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;

        this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
      }, { passive: true });

      element.addEventListener('mouseleave', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  };

  // Advanced color transitions
  const initColorTransitions = () => {
    const colorElements = document.querySelectorAll('.color-shift, .gradient-flow');

    colorElements.forEach(element => {
      // Add subtle mouse interaction
      element.addEventListener('mouseenter', function() {
        this.style.animationDuration = '2s';
      }, { passive: true });

      element.addEventListener('mouseleave', function() {
        this.style.animationDuration = '';
      }, { passive: true });
    });
  };

  // Morphing shapes animation
  const initMorphingShapes = () => {
    const morphShapes = document.querySelectorAll('.morph-shape');

    morphShapes.forEach(shape => {
      // Add interactive morphing on hover
      shape.addEventListener('mouseenter', function() {
        this.style.animationDuration = '2s';
        this.style.animationTimingFunction = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, { passive: true });

      shape.addEventListener('mouseleave', function() {
        this.style.animationDuration = '6s';
        this.style.animationTimingFunction = 'ease-in-out';
      }, { passive: true });
    });
  };

  // Floating elements with physics
  const initFloatingElements = () => {
    const floatingElements = document.querySelectorAll('.float-gentle');

    floatingElements.forEach(element => {
      let startTime = Date.now();
      let animationId = null;

      const float = () => {
        const elapsed = Date.now() - startTime;
        const yOffset = Math.sin(elapsed * 0.001) * 10;
        const rotation = Math.sin(elapsed * 0.0005) * 2;

        element.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;

        animationId = requestAnimationFrame(float);
      };

      // Start floating when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationId) {
            animationId = requestAnimationFrame(float);
          } else if (!entry.isIntersecting && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            element.style.transform = '';
          }
        });
      }, { threshold: 0.5 });

      observer.observe(element);
    });
  };

  // Holographic effects
  const initHolographicEffects = () => {
    const holographicElements = document.querySelectorAll('.holographic');

    holographicElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.style.animationDuration = '1.5s';
        this.style.filter = 'brightness(1.2) contrast(1.1)';
      }, { passive: true });

      element.addEventListener('mouseleave', function() {
        this.style.animationDuration = '3s';
        this.style.filter = '';
      }, { passive: true });
    });
  };

  // Breathing elements
  const initBreathingElements = () => {
    const breathingElements = document.querySelectorAll('.breathe');

    breathingElements.forEach(element => {
      // Pause breathing on interaction
      element.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.1)';
      }, { passive: true });

      element.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = '';
      }, { passive: true });
    });
  };

  // Initialize all visual polish effects
  initParallax();
  initDynamicShadows();
  initMagneticEffects();
  initColorTransitions();
  initMorphingShapes();
  initFloatingElements();
  initHolographicEffects();
  initBreathingElements();
}

/**
 * Initializes performance monitoring and optimization features.
 *
 * Features:
 * - Performance metrics tracking
 * - Animation frame rate monitoring
 * - Memory usage optimization
 * - Lazy loading optimization
 * - Performance budget monitoring
 */
function initPerformanceMonitoring() {
  // Performance metrics tracking
  const performanceMetrics = {
    initTime: Date.now(),
    animationsLoaded: 0,
    scrollEvents: 0,
    clickEvents: 0,
    memoryUsage: 0
  };

  // Track animation performance
  const trackAnimationPerformance = () => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        // Log low FPS for debugging
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}. Consider optimizing animations.`);
        }
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  };

  // Memory usage monitoring
  const monitorMemoryUsage = () => {
    if ('memory' in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        performanceMetrics.memoryUsage = Math.round(memInfo.usedJSHeapSize / 1048576); // MB

        // Warn if memory usage is high
        if (performanceMetrics.memoryUsage > 50) {
          console.warn(`High memory usage: ${performanceMetrics.memoryUsage}MB`);
        }
      }, 5000);
    }
  };

  // Optimize scroll performance
  const optimizeScrollPerformance = () => {
    let scrollTimeout;

    const throttledScrollHandler = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          performanceMetrics.scrollEvents++;
          scrollTimeout = null;
        }, 16); // ~60fps
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
  };

  // Optimize click performance
  const optimizeClickPerformance = () => {
    const clickHandler = (event) => {
      performanceMetrics.clickEvents++;

      // Add visual feedback for performance testing
      const element = event.target;
      if (element.classList.contains('btn') || element.classList.contains('interactive-element')) {
        element.style.transition = 'transform 0.1s ease';
        element.style.transform = 'scale(0.98)';

        setTimeout(() => {
          element.style.transform = '';
        }, 100);
      }
    };

    document.addEventListener('click', clickHandler, { passive: true });
  };

  // Performance budget monitoring
  const monitorPerformanceBudget = () => {
    // Monitor bundle size (simulated)
    const checkBundleSize = () => {
      // In a real implementation, this would check the actual bundle size
      const estimatedSize = 150; // KB

      if (estimatedSize > 200) {
        console.warn(`Bundle size (${estimatedSize}KB) exceeds budget (200KB)`);
      }
    };

    // Monitor Core Web Vitals (simulated)
    const checkCoreWebVitals = () => {
      if ('web-vitals' in window) {
        // In a real implementation, this would use the web-vitals library
        console.log('Core Web Vitals monitoring enabled');
      }
    };

    checkBundleSize();
    checkCoreWebVitals();
  };

  // Create performance monitor UI (hidden by default)
  const createPerformanceMonitor = () => {
    const monitor = document.createElement('div');
    monitor.className = 'performance-monitor';
    monitor.innerHTML = `
      <div>FPS: <span id="fps-display">--</span></div>
      <div>Memory: <span id="memory-display">--</span>MB</div>
      <div>Scroll: <span id="scroll-display">0</span></div>
      <div>Clicks: <span id="clicks-display">0</span></div>
    `;
    document.body.appendChild(monitor);

    // Update display
    setInterval(() => {
      const fpsDisplay = document.getElementById('fps-display');
      const memoryDisplay = document.getElementById('memory-display');
      const scrollDisplay = document.getElementById('scroll-display');
      const clicksDisplay = document.getElementById('clicks-display');

      if (fpsDisplay) fpsDisplay.textContent = window.currentFPS || '--';
      if (memoryDisplay) memoryDisplay.textContent = performanceMetrics.memoryUsage;
      if (scrollDisplay) scrollDisplay.textContent = performanceMetrics.scrollEvents;
      if (clicksDisplay) clicksDisplay.textContent = performanceMetrics.clickEvents;
    }, 1000);

    // Toggle monitor with keyboard shortcut (Ctrl+Shift+P)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        monitor.style.display = monitor.style.display === 'none' ? 'block' : 'none';
      }
    });
  };

  // Optimize Intersection Observer performance
  const optimizeIntersectionObserver = () => {
    // Use a single observer instance for better performance
    if (!window.sharedIntersectionObserver) {
      window.sharedIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Trigger animations or lazy loading
            const element = entry.target;

            if (element.classList.contains('scroll-animate') ||
                element.classList.contains('scroll-fade-in') ||
                element.classList.contains('scroll-slide-up')) {
              element.classList.add('animate');
            }

            // Lazy load images
            if (element.hasAttribute('data-src')) {
              const src = element.getAttribute('data-src');
              element.src = src;
              element.removeAttribute('data-src');
            }

            // Unobserve after triggering
            window.sharedIntersectionObserver.unobserve(element);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
      });
    }
  };

  // Initialize all performance monitoring features
  trackAnimationPerformance();
  monitorMemoryUsage();
  optimizeScrollPerformance();
  optimizeClickPerformance();
  monitorPerformanceBudget();
  createPerformanceMonitor();
  optimizeIntersectionObserver();

  // Store global FPS for monitoring
  window.currentFPS = 60;

  // Performance timing
  window.addEventListener('load', () => {
    const loadTime = Date.now() - performanceMetrics.initTime;
    console.log(`Page load time: ${loadTime}ms`);

    if (loadTime > 3000) {
      console.warn('Page load time exceeds 3 seconds. Consider optimization.');
    }
  });
}

/**
 * Initializes utility functions and interactive components.
 *
 * Features:
 * - Smooth scrolling for anchor links
 * - Back-to-top button with scroll-based visibility
 * - Cookie consent banner with localStorage persistence
 * - FAQ accordion with accessibility features
 * - Keyboard navigation for FAQ items
 * - Search functionality placeholder
 * - Performance optimized with passive event listeners and requestAnimationFrame
 */
function initUtilities() {
  // Optimized smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, { passive: false });
  });

  // Back to Top Button - Always visible floating action button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    console.log('Back-to-top button found, initializing...');

    // Ensure button is always visible and properly styled
    const ensureBackToTopVisibility = () => {
      backToTopBtn.classList.add('show'); // Always show
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
      backToTopBtn.style.pointerEvents = 'auto';
      backToTopBtn.style.zIndex = '999999';
      backToTopBtn.style.position = 'fixed';
      backToTopBtn.style.bottom = window.innerWidth <= 768 ? '4rem' : '3rem';
      backToTopBtn.style.right = window.innerWidth <= 768 ? '4rem' : '5rem';
      console.log('Back-to-top button: ensuring always visible');
    };

    // Make button always visible immediately
    ensureBackToTopVisibility();

    // Also ensure visibility after a short delay (backup)
    setTimeout(ensureBackToTopVisibility, 100);

    // Handle window resize for responsive positioning
    window.addEventListener('resize', () => {
      backToTopBtn.style.bottom = window.innerWidth <= 768 ? '4rem' : '3rem';
      backToTopBtn.style.right = window.innerWidth <= 768 ? '4rem' : '5rem';
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      console.log('Back-to-top button: clicked, scrolling to top');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, { passive: true });

    console.log('Back-to-top button initialized successfully - always visible');
  } else {
    console.warn('Back-to-top button not found in DOM');
  }

  // WhatsApp Floating Button - Always visible floating action button
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    console.log('WhatsApp floating button found, initializing...');

    // Ensure WhatsApp button is always visible and properly styled
    const ensureWhatsappVisibility = () => {
      whatsappBtn.classList.remove('js-hide'); // Remove any hide classes
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.visibility = 'visible';
      whatsappBtn.style.pointerEvents = 'auto';
      whatsappBtn.style.zIndex = '9999999'; // Maximum z-index for absolute visibility
      whatsappBtn.style.position = 'fixed';
      whatsappBtn.style.bottom = window.innerWidth <= 768 ? '4rem' : '3rem';
      whatsappBtn.style.right = window.innerWidth <= 768 ? '1rem' : '2rem';
      console.log('WhatsApp button: ensuring always visible');
    };

    // Make WhatsApp button always visible immediately
    ensureWhatsappVisibility();

    // Also ensure visibility after a short delay (backup)
    setTimeout(ensureWhatsappVisibility, 100);

    // Handle window resize for responsive positioning
    window.addEventListener('resize', () => {
      whatsappBtn.style.bottom = window.innerWidth <= 768 ? '4rem' : '3rem';
      whatsappBtn.style.right = window.innerWidth <= 768 ? '1rem' : '2rem';
    }, { passive: true });

    console.log('WhatsApp floating button initialized successfully - always visible');
  } else {
    console.warn('WhatsApp floating button not found in DOM');
  }

  // Telegram Floating Button - Always visible floating action button
  const telegramBtn = document.querySelector('.telegram-float');
  if (telegramBtn) {
    console.log('Telegram floating button found, initializing...');

    // Ensure Telegram button is always visible and properly styled
    const ensureTelegramVisibility = () => {
      telegramBtn.classList.remove('js-hide'); // Remove any hide classes
      telegramBtn.style.opacity = '1';
      telegramBtn.style.visibility = 'visible';
      telegramBtn.style.pointerEvents = 'auto';
      telegramBtn.style.zIndex = '999999';
      telegramBtn.style.position = 'fixed';
      telegramBtn.style.bottom = window.innerWidth <= 768 ? '7rem' : '6rem';
      telegramBtn.style.right = window.innerWidth <= 768 ? '1rem' : '2rem';
      console.log('Telegram button: ensuring always visible');
    };

    // Make Telegram button always visible immediately
    ensureTelegramVisibility();

    // Also ensure visibility after a short delay (backup)
    setTimeout(ensureTelegramVisibility, 100);

    // Handle window resize for responsive positioning
    window.addEventListener('resize', () => {
      telegramBtn.style.bottom = window.innerWidth <= 768 ? '7rem' : '6rem';
      telegramBtn.style.right = window.innerWidth <= 768 ? '1rem' : '2rem';
    }, { passive: true });

    console.log('Telegram floating button initialized successfully - always visible');
  } else {
    console.warn('Telegram floating button not found in DOM');
  }


  // Optimized FAQ Accordion with accessibility features
  // Implements accordion behavior where only one FAQ can be open at a time
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((question) => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close all other FAQ items first (accordion behavior)
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== this) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherQuestion.parentElement.removeAttribute('aria-expanded');
        }
      });

      // Toggle current FAQ item state
      this.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        // Opening this FAQ item
        faqItem.setAttribute('aria-expanded', 'true');
      } else {
        // Closing this FAQ item
        faqItem.removeAttribute('aria-expanded');
      }
    }, { passive: true });
  });

  // Keyboard accessibility for FAQ
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const focusedElement = document.activeElement;
      if (focusedElement?.classList.contains('faq-question')) {
        event.preventDefault();
        focusedElement.click();
      }
    }
  }, { passive: true });

  // Optimized Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput && searchBtn) {
    const performSearch = () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        alert(`Search functionality: Looking for "${query}"\n\nThis is a placeholder. In a real implementation, this would search through:\n- Page content\n- Services\n- Blog posts\n- Documentation\n- FAQs`);
        searchInput.value = '';
      }
    };

    searchBtn.addEventListener('click', performSearch, { passive: true });
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') performSearch();
    }, { passive: true });
  }

  // Initialize final enhancements
  initFinalEnhancements();

  // Initialize force visibility monitoring for floating buttons
  initForceVisibilityMonitoring();
}

/**
 * Initializes force visibility monitoring for floating buttons (Approach 3).
 *
 * Features:
 * - Periodic monitoring to ensure button visibility
 * - Force sets critical CSS properties via JavaScript
 * - Event listeners for scroll, resize, and load events
 * - Debugging console logs to track button state
 * - Overrides any interfering styles with force visibility mode
 */
function initForceVisibilityMonitoring() {
  console.log('Force visibility monitoring: Initializing...');

  // Target buttons for monitoring
  const buttons = [
    { selector: '.whatsapp-float', name: 'WhatsApp' },
    { selector: '.telegram-float', name: 'Telegram' },
    { selector: '#back-to-top', name: 'Back-to-Top' }
  ];

  // Critical CSS properties to force set
  const criticalStyles = {
    position: 'fixed',
    zIndex: '9999999',
    opacity: '1',
    visibility: 'visible',
    pointerEvents: 'auto',
    display: 'block'
  };

  // Force visibility function
  const forceButtonVisibility = (button, buttonName) => {
    if (!button) {
      console.warn(`Force visibility: ${buttonName} button not found`);
      return;
    }

    // Remove any hide classes
    button.classList.remove('js-hide', 'hidden', 'invisible');

    // Force set critical styles
    Object.assign(button.style, criticalStyles);

    // Set responsive positioning
    const isMobile = window.innerWidth <= 768;
    if (buttonName === 'WhatsApp') {
      button.style.bottom = isMobile ? '4rem' : '3rem';
      button.style.right = isMobile ? '1rem' : '2rem';
    } else if (buttonName === 'Telegram') {
      button.style.bottom = isMobile ? '7rem' : '6rem';
      button.style.right = isMobile ? '1rem' : '2rem';
    } else if (buttonName === 'Back-to-Top') {
      button.style.bottom = isMobile ? '4rem' : '3rem';
      button.style.right = isMobile ? '4rem' : '5rem';
    }

    // Debug logging
    const computedStyle = window.getComputedStyle(button);
    console.log(`Force visibility: ${buttonName} button state:`, {
      opacity: computedStyle.opacity,
      visibility: computedStyle.visibility,
      display: computedStyle.display,
      zIndex: computedStyle.zIndex,
      position: computedStyle.position,
      bottom: computedStyle.bottom,
      right: computedStyle.right
    });
  };

  // Periodic monitoring function
  const startPeriodicMonitoring = () => {
    console.log('Force visibility: Starting periodic monitoring...');

    const monitorInterval = setInterval(() => {
      buttons.forEach(({ selector, name }) => {
        const button = document.querySelector(selector);
        if (button) {
          // Check if button is visible
          const rect = button.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(button);

          const isVisible = computedStyle.opacity !== '0' &&
                           computedStyle.visibility !== 'hidden' &&
                           computedStyle.display !== 'none' &&
                           rect.width > 0 &&
                           rect.height > 0;

          if (!isVisible) {
            console.warn(`Force visibility: ${name} button not visible, forcing visibility...`);
            forceButtonVisibility(button, name);
          } else {
            console.log(`Force visibility: ${name} button is visible`);
          }
        }
      });
    }, 2000); // Check every 2 seconds

    // Store interval ID for cleanup if needed
    window.forceVisibilityInterval = monitorInterval;
  };

  // Event listeners for re-applying positioning
  const addEventListeners = () => {
    console.log('Force visibility: Adding event listeners...');

    // Scroll event
    window.addEventListener('scroll', () => {
      console.log('Force visibility: Scroll event detected, checking buttons...');
      buttons.forEach(({ selector, name }) => {
        const button = document.querySelector(selector);
        if (button) {
          forceButtonVisibility(button, name);
        }
      });
    }, { passive: true });

    // Resize event
    window.addEventListener('resize', () => {
      console.log('Force visibility: Resize event detected, updating positioning...');
      buttons.forEach(({ selector, name }) => {
        const button = document.querySelector(selector);
        if (button) {
          forceButtonVisibility(button, name);
        }
      });
    }, { passive: true });

    // Load event (backup)
    window.addEventListener('load', () => {
      console.log('Force visibility: Load event detected, ensuring visibility...');
      setTimeout(() => {
        buttons.forEach(({ selector, name }) => {
          const button = document.querySelector(selector);
          if (button) {
            forceButtonVisibility(button, name);
          }
        });
      }, 1000);
    }, { passive: true });

    // DOM content loaded (backup)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('Force visibility: DOMContentLoaded event detected...');
        setTimeout(() => {
          buttons.forEach(({ selector, name }) => {
            const button = document.querySelector(selector);
            if (button) {
              forceButtonVisibility(button, name);
            }
          });
        }, 500);
      }, { passive: true });
    }
  };

  // Initial force visibility on all buttons
  console.log('Force visibility: Applying initial force visibility...');
  buttons.forEach(({ selector, name }) => {
    const button = document.querySelector(selector);
    if (button) {
      forceButtonVisibility(button, name);
    }
  });

  // Start periodic monitoring
  startPeriodicMonitoring();

  // Add event listeners
  addEventListeners();

  console.log('Force visibility monitoring: Successfully initialized');
}

/**
 * Initializes interactive elements specific to the about page.
 *
 * Features:
 * - Interactive development process flowchart with step details
 * - Click-to-expand process steps with smooth animations
 * - Technology badge hover effects
 * - Statistics counter animations
 * - Process step highlighting and navigation
 */
function initAboutPageInteractions() {
  // Only run on about page
  if (!document.body.classList.contains('page-about')) return;

  // Interactive Development Process Flowchart
  const initProcessFlowchart = () => {
    const processSteps = document.querySelectorAll('.process-step');
    const processArrows = document.querySelectorAll('.process-arrow');
    let activeStep = null;

    processSteps.forEach((step, index) => {
      // Add click handler for each step
      step.addEventListener('click', function() {
        const stepNumber = this.getAttribute('data-step');

        // Remove active class from all steps
        processSteps.forEach(s => s.classList.remove('active'));
        processArrows.forEach(arrow => arrow.classList.remove('active'));

        // Add active class to clicked step
        this.classList.add('active');

        // Highlight corresponding arrow if not the last step
        if (index < processArrows.length) {
          processArrows[index].classList.add('active');
        }

        // Update active step reference
        activeStep = this;

        // Add visual feedback
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);

        // Track interaction
        if (typeof gtag !== 'undefined') {
          gtag('event', 'process_step_click', {
            'event_category': 'engagement',
            'event_label': `step_${stepNumber}`
          });
        }
      }, { passive: true });

      // Add hover effects
      step.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      }, { passive: true });

      step.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = '';
        }
      }, { passive: true });
    });

    // Auto-highlight first step on page load
    setTimeout(() => {
      if (processSteps.length > 0 && !activeStep) {
        processSteps[0].click();
      }
    }, 1000);
  };

  // Technology Badge Interactions
  const initTechBadgeInteractions = () => {
    const techBadges = document.querySelectorAll('.tech-badge');

    techBadges.forEach(badge => {
      badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 194, 80, 0.3)';
      }, { passive: true });

      badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, { passive: true });

      badge.addEventListener('click', function() {
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.1) translateY(-2px)';
        }, 100);

        // Track technology interest
        if (typeof gtag !== 'undefined') {
          gtag('event', 'tech_badge_click', {
            'event_category': 'engagement',
            'event_label': this.textContent.trim()
          });
        }
      }, { passive: true });
    });
  };

  // Statistics Counter Animation
  const initStatisticsAnimation = () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element, target, duration = 2000, isDecimal = false, suffix = '') => {
      const start = 0;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;

        if (isDecimal) {
          element.textContent = current.toFixed(1) + suffix;
        } else {
          const formatted = Math.floor(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          element.textContent = formatted + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    // Intersection Observer for triggering animations
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const statElement = entry.target;
            const textContent = statElement.textContent.trim();

            // Skip animation for infinity symbol
            if (textContent === '∞') {
              observer.unobserve(statElement);
              return;
            }

            let targetValue, isDecimal = false, suffix = '';

            if (textContent.includes('/')) {
              // Handle "4.8/5" format
              const parts = textContent.split('/');
              targetValue = parseFloat(parts[0]);
              suffix = '/' + parts[1];
              isDecimal = true;
            } else if (textContent.includes('+')) {
              // Handle "747+" format
              targetValue = parseInt(textContent.replace(/[^\d]/g, ''));
              suffix = '+';
            } else {
              // Handle regular numbers
              targetValue = parseInt(textContent.replace(/[^\d]/g, ''));
            }

            if (!isNaN(targetValue)) {
              animateCounter(statElement, targetValue, 2000, isDecimal, suffix);
            }
            observer.unobserve(statElement);
          }
        });
      }, { threshold: 0.5 });

      statNumbers.forEach(stat => observer.observe(stat));
    }
  };

  // Value Card Interactions
  const initValueCardInteractions = () => {
    const valueCards = document.querySelectorAll('.value-card');

    valueCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 194, 80, 0.15)';
      }, { passive: true });

      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, { passive: true });

      card.addEventListener('click', function() {
        // Add subtle click feedback
        this.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'translateY(-10px) scale(1.02)';
        }, 150);
      }, { passive: true });
    });
  };

  // Advantage Item Hover Effects
  const initAdvantageInteractions = () => {
    const advantageItems = document.querySelectorAll('.advantage-item');

    advantageItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(15px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 194, 80, 0.1)';
      }, { passive: true });

      item.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, { passive: true });
    });
  };

  // Quality Guarantee Badge Animation
  const initQualityGuaranteeAnimation = () => {
    const guaranteeBadge = document.querySelector('.guarantee-badge');

    if (guaranteeBadge) {
      // Add continuous subtle animation
      guaranteeBadge.style.animation = 'float 3s ease-in-out infinite';

      guaranteeBadge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
        this.style.boxShadow = '0 15px 40px rgba(0, 194, 80, 0.4)';
      }, { passive: true });

      guaranteeBadge.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, { passive: true });
    }
  };

  // Process Step Details Modal (Optional Enhancement)
  const initProcessStepModal = () => {
    const processSteps = document.querySelectorAll('.process-step');

    processSteps.forEach(step => {
      step.addEventListener('dblclick', function() {
        const stepNumber = this.getAttribute('data-step');
        const stepTitle = this.querySelector('h3').textContent;
        const stepDescription = this.querySelector('p').textContent;

        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'process-modal-overlay';
        modal.innerHTML = `
          <div class="process-modal">
            <div class="process-modal-header">
              <h3>Step ${stepNumber}: ${stepTitle}</h3>
              <button class="modal-close">&times;</button>
            </div>
            <div class="process-modal-content">
              <p>${stepDescription}</p>
              <div class="modal-features">
                ${Array.from(this.querySelectorAll('.feature-tag')).map(tag =>
                  `<span class="feature-tag">${tag.textContent}</span>`
                ).join('')}
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
          .process-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
          }
          .process-modal {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
          }
          .process-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #e9ecef;
          }
          .process-modal-header h3 {
            margin: 0;
            color: #333;
          }
          .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
          }
          .modal-close:hover {
            background: #f8f9fa;
            color: #333;
          }
          .process-modal-content {
            padding: 2rem;
          }
          .modal-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
          }
        `;
        document.head.appendChild(modalStyle);

        // Close modal handlers
        const closeModal = () => {
          modal.style.animation = 'fadeOut 0.3s ease';
          setTimeout(() => {
            modal.remove();
            modalStyle.remove();
          }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal, { passive: true });
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        }, { passive: true });

        document.addEventListener('keydown', function escHandler(e) {
          if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
          }
        }, { passive: true });
      }, { passive: true });
    });
  };

  // Initialize all about page interactions
  initProcessFlowchart();
  initTechBadgeInteractions();
  initStatisticsAnimation();
  initValueCardInteractions();
  initAdvantageInteractions();
  initQualityGuaranteeAnimation();
  initProcessStepModal();
}

/**
* Initializes random services preview section on homepage.
*
* Features:
* - Randomly selects 3 services from all available services
* - Displays service cards with technology stacks and features
* - Updates on each page reload for variety
* - Responsive design with hover effects
* - Links to full services page
*/
function initRandomServices() {
  // Only run on homepage
  if (!document.body.classList.contains('page-transition') ||
      !document.querySelector('#random-services-section')) {
    console.log('Random services: Not on homepage or section not found');
    return;
  }

  console.log('Random services: Initializing...');

  // Define all available services data
  const allServices = [
    {
      title: 'Web Development',
      description: 'Custom web applications and responsive websites built with modern technologies and best practices.',
      techStack: ['React', 'Node.js', 'HTML5', 'CSS3', 'JavaScript'],
      services: ['Frontend Development', 'Backend Development', 'E-commerce Solutions', 'CMS Development']
    },
    {
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for iOS and Android with seamless user experiences.',
      techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      services: ['iOS Development', 'Android Development', 'Cross-platform Solutions', 'App Store Optimization']
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to optimize your business operations.',
      techStack: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
      services: ['Cloud Migration', 'AWS/Azure Services', 'DevOps Implementation', 'Cloud Security']
    },
    {
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation consulting to modernize your business processes.',
      techStack: ['Python', 'TensorFlow', 'Power BI', 'Tableau', 'Automation'],
      services: ['Process Automation', 'Data Analytics', 'AI/ML Solutions', 'Digital Strategy']
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design services to create intuitive and engaging digital experiences.',
      techStack: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      services: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing']
    },
    {
      title: 'Consulting Services',
      description: 'Expert technology consulting to guide your digital initiatives and ensure success.',
      techStack: ['Agile', 'Scrum', 'Jira', 'Trello', 'Slack'],
      services: ['Technology Assessment', 'Architecture Design', 'Project Management', 'Quality Assurance']
    },
    {
      title: 'Data Analytics & Science',
      description: 'Advanced data analysis, machine learning, and business intelligence solutions to extract actionable insights from your data.',
      techStack: ['Python', 'Pandas', 'TensorFlow', 'Power BI', 'Tableau', 'SQL', 'Jupyter'],
      services: ['Data Analysis & Visualization', 'Machine Learning Models', 'Predictive Analytics', 'Business Intelligence Dashboards', 'Statistical Analysis', 'Data Mining & Processing']
    },
    {
      title: 'API Development & Integration',
      description: 'Custom API development, third-party integrations, and microservices architecture for seamless data flow and system connectivity.',
      techStack: ['REST APIs', 'GraphQL', 'Node.js', 'Express', 'Python', 'FastAPI', 'Postman'],
      services: ['RESTful API Development', 'GraphQL API Design', 'Third-party Integrations', 'API Documentation', 'Microservices Architecture', 'API Security & Authentication']
    },
    {
      title: 'Chatbot & Automation Bots',
      description: 'Intelligent chatbots and automation solutions for WhatsApp, Telegram, Discord, and other platforms to enhance customer engagement and streamline operations.',
      techStack: ['WhatsApp API', 'Telegram API', 'Discord API', 'Node.js', 'Python', 'Dialogflow', 'NLP'],
      services: ['WhatsApp Business Bots', 'Telegram Bots', 'Discord Bots', 'Customer Support Automation', 'E-commerce Bots', 'Lead Generation Bots', 'Workflow Automation']
    }
  ];

  // Function to get random services
  const getRandomServices = (services, count) => {
    const shuffled = [...services].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Function to generate service card HTML
  const generateServiceCard = (service) => {
    const techBadges = service.techStack.map(tech =>
      `<span class="tech-badge" role="listitem">${tech}</span>`
    ).join('');

    const serviceItems = service.services.map(item =>
      `<li role="listitem">${item}</li>`
    ).join('');

    return `
      <div class="service-card scroll-fade-in" role="article" aria-labelledby="${service.title.replace(/\s+/g, '-').toLowerCase()}-title">
        <h3 id="${service.title.replace(/\s+/g, '-').toLowerCase()}-title">${service.title}</h3>
        <p>${service.description}</p>
        <div class="tech-stack" role="list" aria-label="${service.title} Technologies">
          ${techBadges}
        </div>
        <ul role="list" aria-label="${service.title} Services">
          ${serviceItems}
        </ul>
      </div>
    `;
  };

  // Get random services and generate HTML
  const randomServices = getRandomServices(allServices, 3);
  console.log('Random services selected:', randomServices.map(s => s.title));

  const servicesHTML = randomServices.map(service => generateServiceCard(service)).join('');
  console.log('Generated HTML length:', servicesHTML.length);

  // Insert into DOM
  const servicesGrid = document.getElementById('random-services-grid');
  if (servicesGrid) {
    console.log('Found services grid, inserting content...');
    servicesGrid.innerHTML = servicesHTML;
    servicesGrid.style.opacity = '1';
    servicesGrid.style.visibility = 'visible';
    servicesGrid.style.display = 'grid';

    // Force visibility on all child elements
    const allElements = servicesGrid.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });

    console.log('Content inserted successfully');

    // Add hover effects to the new cards
    const newCards = servicesGrid.querySelectorAll('.service-card');
    console.log('Found', newCards.length, 'service cards');

    newCards.forEach((card) => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      }, { passive: true });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      }, { passive: true });
    });

    // Track service card interactions
    newCards.forEach(card => {
      card.addEventListener('click', function() {
        const serviceTitle = this.querySelector('h3').textContent;
        console.log('Service card clicked:', serviceTitle);
        if (typeof gtag !== 'undefined') {
          gtag('event', 'random_service_click', {
            'event_category': 'engagement',
            'event_label': serviceTitle
          });
        }
      }, { passive: true });
    });
  } else {
    console.error('Random services: Could not find #random-services-grid element');
  }
}

/**
 * Initializes dynamic footer loading for consistent footer across all pages.
 *
 * Features:
 * - Loads footer template from external HTML file
 * - Replaces footer placeholder with actual footer content
 * - Works with static hosting (no server-side includes needed)
 * - Graceful fallback if footer template fails to load
 * - Performance optimized with caching and error handling
 */
function initDynamicFooter() {
  // Skip if footer already exists (for pages that already have static footer)
  const existingFooter = document.querySelector('footer.footer');
  if (existingFooter || window.footerInitialized) {
    console.log('Dynamic footer: Footer already exists or initialized, skipping dynamic loading');
    // Still initialize footer interactions for existing footer
    initFooterInteractions();
    return;
  }

  console.log('Dynamic footer: Initializing...');

  // Create footer placeholder if it doesn't exist
  let footerPlaceholder = document.querySelector('#dynamic-footer-placeholder');
  if (!footerPlaceholder) {
    footerPlaceholder = document.createElement('div');
    footerPlaceholder.id = 'dynamic-footer-placeholder';
    footerPlaceholder.style.cssText = 'display: none;'; // Hide until content loads
    document.body.appendChild(footerPlaceholder);
  }

  // Function to load footer template
  const loadFooterTemplate = async () => {
    try {
      const response = await fetch('../components/footer-template.html');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const footerHTML = await response.text();

      // Create footer element from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = footerHTML.trim();

      const footerElement = tempDiv.firstElementChild;

      if (footerElement && footerElement.tagName === 'FOOTER') {
        // Replace placeholder with actual footer
        footerPlaceholder.parentNode.replaceChild(footerElement, footerPlaceholder);

        // Add fade-in animation
        footerElement.style.opacity = '0';
        footerElement.style.transition = 'opacity 0.3s ease';

        // Trigger animation on next frame
        requestAnimationFrame(() => {
          footerElement.style.opacity = '1';
        });

        console.log('Dynamic footer: Successfully loaded and inserted');

        // Set initialization flag to prevent duplicates
        window.footerInitialized = true;

        // Re-initialize any footer-related functionality
        initFooterInteractions();

      } else {
        throw new Error('Invalid footer HTML structure');
      }

    } catch (error) {
      console.error('Dynamic footer: Failed to load footer template:', error);

      // Fallback: Create a basic footer
      const fallbackFooter = document.createElement('footer');
      fallbackFooter.className = 'footer';
      fallbackFooter.innerHTML = `
        <div class="footer-content">
          <div class="footer-section">
            <h3>Innovative Solutions for a Digital World</h3>
            <p>Valance Technologies delivers cutting-edge solutions for B2B and B2C clients.</p>
          </div>
          <div class="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="services.html">Our Services</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Careers</a></li>
              <li>Blog(coming soon)</li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="https://wa.me/917428139556" class="social-link" aria-label="WhatsApp" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
              <a href="https://facebook.com/valancetek" class="social-link" aria-label="Facebook" target="_blank"><i class="fab fa-facebook"></i> Facebook</a>
              <a href="https://instagram.com/valancetek" class="social-link" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
              <a href="https://youtube.com/@valancetek" class="social-link" aria-label="YouTube" target="_blank"><i class="fab fa-youtube"></i> YouTube</a>
              <a href="https://linkedin.com/company/valance-technologies" class="social-link" aria-label="LinkedIn" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
            </div>
          </div>
          <div class="footer-section">
            <h3>Working Hours</h3>
            <ul>
              <li>Monday to Friday</li>
              <li>09:00 AM to 05:00 PM, IST</li>
            </ul>
            <h3>Contact Us</h3>
            <ul>
              <li>Sector 15, Rohini, Delhi, India</li>
              <li>Pin: 110089</li>
              <li><a href="mailto:contact@valancetek.com">contact@valancetek.com</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Valance Technologies. All rights reserved.</p>
          <div class="footer-links">
            <a href="privacy.html">Privacy Policy</a> |
            <a href="terms.html">Terms & Conditions</a>
          </div>
        </div>
      `;

      footerPlaceholder.parentNode.replaceChild(fallbackFooter, footerPlaceholder);
      console.log('Dynamic footer: Using fallback footer');

      // Set initialization flag to prevent duplicates
      window.footerInitialized = true;
    }
  };

  // Load footer template
  loadFooterTemplate();
}

/**
 * Initializes dynamic navbar loading for consistent navbar across all pages.
 *
 * Features:
 * - Loads navbar template from external HTML file
 * - Inserts navbar at the top of the page body
 * - Works with static hosting (no server-side includes needed)
 * - Graceful fallback if navbar template fails to load
 * - Performance optimized with caching and error handling
 * - Ensures navbar stays fixed at top with proper z-index
 */
function initDynamicNavbar() {
  // Skip if navbar already exists (for pages that already have static navbar)
  const existingNavbar = document.querySelector('nav.navbar');
  if (existingNavbar || window.navbarInitialized) {
    console.log('Dynamic navbar: Navbar already exists or initialized, skipping dynamic loading');
    return;
  }

  console.log('Dynamic navbar: Initializing...');

  // Function to load navbar template
  const loadNavbarTemplate = async () => {
    try {
      console.log('Dynamic navbar: Attempting to fetch ../components/nav.html');
      const response = await fetch('../components/nav.html');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const navbarHTML = await response.text();
      console.log('Dynamic navbar: Successfully fetched navbar HTML, length:', navbarHTML.length);

      // Create navbar element from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = navbarHTML.trim();

      const navbarElement = tempDiv.firstElementChild;

      if (navbarElement && navbarElement.tagName === 'NAV') {
        // Insert navbar at the beginning of body
        document.body.insertBefore(navbarElement, document.body.firstChild);

        // Ensure navbar is sticky and visible
        navbarElement.style.position = 'sticky';
        navbarElement.style.top = '0';
        navbarElement.style.left = '0';
        navbarElement.style.right = '0';
        navbarElement.style.zIndex = '1000';
        navbarElement.style.opacity = '0';
        navbarElement.style.transition = 'opacity 0.3s ease';

        // Trigger animation on next frame
        requestAnimationFrame(() => {
          navbarElement.style.opacity = '1';
        });

        console.log('Dynamic navbar: Successfully loaded and inserted');

        // Set initialization flag to prevent duplicates
        window.navbarInitialized = true;

        // Re-initialize navigation functionality
        initNavigation();

      } else {
        throw new Error('Invalid navbar HTML structure');
      }

    } catch (error) {
      console.error('Dynamic navbar: Failed to load navbar template:', error);

      // Fallback: Create a basic navbar
      console.log('Dynamic navbar: Using fallback navbar with absolute paths');
      const fallbackNavbar = document.createElement('nav');
      fallbackNavbar.className = 'navbar';
      fallbackNavbar.setAttribute('role', 'navigation');
      fallbackNavbar.setAttribute('aria-label', 'Main navigation');
      fallbackNavbar.innerHTML = `
        <div class="nav-container">
          <div class="nav-logo">
            <a href="/index.html" aria-label="Valance Technologies Home">
              <img src="/assets/4k Tran_logo.png" alt="Valance Technologies Logo" class="nav-logo-img" loading="eager">
              <img src="/assets/White Text.png" alt="Valance Technologies Text" class="nav-text-img" loading="eager">
            </a>
          </div>
          <div class="nav-right">
            <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" id="nav-toggle">
              <span aria-hidden="true">☰</span>
            </button>
          </div>
          <ul class="nav-menu" id="nav-menu" role="menubar">
            <li role="none"><a href="/index.html" role="menuitem">Home</a></li>
            <li role="none"><a href="/pages/about.html" role="menuitem">About</a></li>
            <li role="none"><a href="/pages/services.html" role="menuitem">Services</a></li>
            <li role="none"><a href="/pages/contact.html" role="menuitem">Contact</a></li>
          </ul>
        </div>
      `;

      // Insert fallback navbar
      document.body.insertBefore(fallbackNavbar, document.body.firstChild);

      // Ensure fallback navbar is sticky and visible
      fallbackNavbar.style.position = 'sticky';
      fallbackNavbar.style.top = '0';
      fallbackNavbar.style.left = '0';
      fallbackNavbar.style.right = '0';
      fallbackNavbar.style.zIndex = '1000';

      console.log('Dynamic navbar: Using fallback navbar');

      // Set initialization flag to prevent duplicates
      window.navbarInitialized = true;

      // Initialize navigation for fallback navbar
      initNavigation();
    }
  };

  // Load navbar template
  loadNavbarTemplate();
}

/**
 * Initializes footer-specific interactions after dynamic loading.
 *
 * Features:
 * - Social link hover effects
 * - Footer link animations
 * - Accessibility improvements
 * - Performance optimized event handlers
 */
function initFooterInteractions() {
  // Add hover effects to social links
  const socialLinks = document.querySelectorAll('.footer .social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    }, { passive: true });

    link.addEventListener('mouseleave', function() {
      this.style.transform = '';
    }, { passive: true });
  });

  // Add hover effects to footer links
  const footerLinks = document.querySelectorAll('.footer-section a');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(3px)';
    }, { passive: true });

    link.addEventListener('mouseleave', function() {
      this.style.transform = '';
    }, { passive: true });
  });

  console.log('Footer interactions initialized');
}

/**
  * Initializes final UI enhancements and performance optimizations.
  *
  * Features:
  * - Scroll progress indicator at the top of the page
  * - Throttled scroll event handling with requestAnimationFrame
  * - Form loading states with button text changes and disabled state
  * - Automatic form reset after processing timeout
  * - Performance optimized with passive event listeners
  */
 function initFinalEnhancements() {
   // Optimized scroll progress indicator
   const scrollProgress = document.createElement('div');
   scrollProgress.className = 'scroll-progress';
   scrollProgress.id = 'scroll-progress-indicator';
   Object.assign(scrollProgress.style, {
     position: 'fixed',
     top: '0',
     left: '0',
     width: '0%',
     height: '4px',
     background: 'linear-gradient(90deg, #00c250, #009a43)',
     zIndex: '1001',
     transition: 'width 0.3s ease',
     boxShadow: '0 1px 3px rgba(0, 194, 80, 0.3)'
   });

   // Ensure scroll progress is visible and properly positioned
   scrollProgress.style.opacity = '1';
   scrollProgress.style.visibility = 'visible';
   scrollProgress.style.pointerEvents = 'none';

   document.body.appendChild(scrollProgress);
   console.log('Scroll progress indicator created and appended to DOM');

   // Enhanced navbar sticky coordination
   let navbar = document.querySelector('.navbar');
   let navbarSticky = false;

   // Function to find navbar (in case it's loaded dynamically)
   const findNavbar = () => {
     if (!navbar) {
       navbar = document.querySelector('.navbar');
     }
     return navbar;
   };

   // Throttled scroll progress update using requestAnimationFrame for performance
   // Prevents excessive updates during scroll events
   let scrollTicking = false;
   const updateScrollProgress = () => {
     // Calculate how far user has scrolled
     const scrollTop = window.pageYOffset;
     // Calculate total scrollable height (document height - viewport height)
     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
     // Convert to percentage (0-100)
     const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
     // Update progress bar width
     scrollProgress.style.width = scrollPercent + '%';

     // Ensure scroll progress is always visible
     scrollProgress.style.opacity = '1';
     scrollProgress.style.visibility = 'visible';

     // Coordinate with navbar sticky state
     const currentNavbar = findNavbar();
     if (currentNavbar) {
       const shouldBeSticky = scrollTop > 50; // Threshold for sticky activation
       if (shouldBeSticky !== navbarSticky) {
         navbarSticky = shouldBeSticky;
         if (navbarSticky) {
           currentNavbar.classList.add('sticky-active');
           scrollProgress.classList.add('navbar-sticky');
           console.log('Navbar became sticky - coordinating scroll progress');
         } else {
           currentNavbar.classList.remove('sticky-active');
           scrollProgress.classList.remove('navbar-sticky');
           console.log('Navbar no longer sticky - resetting scroll progress');
         }
       }
     }

     // Reset ticking flag to allow next scroll event
     scrollTicking = false;
   };

   window.addEventListener('scroll', () => {
     if (!scrollTicking) {
       requestAnimationFrame(updateScrollProgress);
       scrollTicking = true;
     }
   }, { passive: true });

   // Force visibility check every 2 seconds
   setInterval(() => {
     if (scrollProgress) {
       const computedStyle = window.getComputedStyle(scrollProgress);
       if (computedStyle.opacity !== '1' || computedStyle.visibility !== 'visible') {
         console.log('Scroll progress not visible, forcing visibility...');
         scrollProgress.style.opacity = '1';
         scrollProgress.style.visibility = 'visible';
         scrollProgress.style.zIndex = '1001';
       }
     }
   }, 2000);

   // Initial visibility check
   setTimeout(() => {
     if (scrollProgress) {
       scrollProgress.style.opacity = '1';
       scrollProgress.style.visibility = 'visible';
       console.log('Scroll progress indicator initialized and visible');

       // Test the scroll progress by triggering an initial update
       updateScrollProgress();
     }
   }, 100);

   // Additional check after navbar loads (for dynamic navbar)
   setTimeout(() => {
     const navbarCheck = findNavbar();
     if (navbarCheck) {
       console.log('Navbar found, ensuring scroll progress coordination');
       updateScrollProgress();
     }
   }, 500);

  // Optimized loading states for forms
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', function() {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    }, { passive: true });
  });
}