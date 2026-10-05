document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. MOBILE MENU TOGGLE
  ========================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  /* ==========================================================
     2. HEADER SHADOW ON SCROLL + BACK-TO-TOP BUTTON
  ========================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 20);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 600);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================
     3. FAQ ACCORDION
  ========================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('active');

      // Close every other open item
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle the clicked item
      if (!isOpen) {
        faqItem.classList.add('active');
      }
    });
  });

  /* ==========================================================
     4. AUTO-SELECT SERVICE PACKAGE IN THE FORM
     (When a package button is clicked, the matching option
      is pre-selected in the dropdown before the page scrolls.)
  ========================================================== */
  const packageButtons = document.querySelectorAll('.select-service-btn');
  const serviceDropdown = document.getElementById('serviceInterest');

  packageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedService = btn.getAttribute('data-service');
      if (serviceDropdown && selectedService) {
        serviceDropdown.value = selectedService;
      }
    });
  });

  /* ==========================================================
     5. FORMSPREE FORM SUBMISSION (AJAX)
     Submits to https://formspree.io/f/xdeaojgy without
     leaving the page, then shows a success/error message.
  ========================================================== */
  const proposalForm = document.getElementById('proposalForm');
  const formStatus = document.getElementById('formStatus');

  if (proposalForm && formStatus) {
    proposalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = proposalForm.querySelector('button[type="submit"]');
      const authorNameInput = document.getElementById('authorName');
      const authorName = authorNameInput ? authorNameInput.value : '';

      // Disable button while sending
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      formStatus.className = 'form-status';
      formStatus.textContent = 'Sending your project details to Amber…';

      try {
        const response = await fetch(proposalForm.action, {
          method: 'POST',
          body: new FormData(proposalForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML =
            `✅ Thank you${authorName ? ', ' + authorName : ''}! Your project details have been sent successfully. ` +
            `Your written proposal will arrive at your email inbox within 1–2 business days.`;
          proposalForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.innerHTML =
            '⚠️ Something went wrong while sending. Please email your details directly to ' +
            '<a href="mailto:amberjoyce.media@gmail.com">amberjoyce.media@gmail.com</a>.';
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML =
          '⚠️ A network error occurred. Please email your details directly to ' +
          '<a href="mailto:amberjoyce.media@gmail.com">amberjoyce.media@gmail.com</a>.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Project Details';
      }
    });
  }

  /* ==========================================================
     6. SCROLL REVEAL ANIMATIONS
  ========================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for very old browsers: show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

});