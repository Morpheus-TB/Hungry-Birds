/* ==========================================================================
   HUNGRY BIRDS HOTEL & RESORT - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
   * 1. Sticky Navigation & Mobile Menu Toggle
   * -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile nav when clicking link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* --------------------------------------------------
   * 2. Room Category Filter
   * -------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      roomCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------
   * 3. Quick Reserve Button Linkage to Booking Form
   * -------------------------------------------------- */
  const bookRoomBtns = document.querySelectorAll('.book-room-btn');
  const roomSelect = document.getElementById('room-select');

  bookRoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedRoom = btn.getAttribute('data-room');
      if (roomSelect) {
        roomSelect.value = selectedRoom;
      }
    });
  });

  /* --------------------------------------------------
   * 4. Interactive Image Gallery Lightbox
   * -------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-src');
      lightboxImg.src = fullSrc;
      lightbox.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------
   * 5. Testimonial Carousel / Slider
   * -------------------------------------------------- */
  const testimonials = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentSlide = 0;

  function showSlide(index) {
    testimonials.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (idx === index) {
        slide.classList.add('active');
      }
    });
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonials.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
      showSlide(currentSlide);
    });

    // Auto-advance reviews every 6 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonials.length;
      showSlide(currentSlide);
    }, 6000);
  }

  /* --------------------------------------------------
   * 6. Booking Form Validation & Automatic Date Checks
   * -------------------------------------------------- */
  const bookingForm = document.getElementById('booking-form');
  const checkInInput = document.getElementById('check-in');
  const checkOutInput = document.getElementById('check-out');
  const bookingAlert = document.getElementById('booking-alert');
  const alertCloseBtn = document.getElementById('alert-close-btn');
  const alertDetails = document.getElementById('alert-details');

  // Enforce today's date as minimum for check-in
  if (checkInInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    checkInInput.addEventListener('change', () => {
      // Ensure check-out is at least 1 day after check-in
      if (checkInInput.value) {
        const checkInDate = new Date(checkInInput.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        checkOutInput.min = minCheckOut;
        if (checkOutInput.value && checkOutInput.value < minCheckOut) {
          checkOutInput.value = minCheckOut;
        }
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fullName = document.getElementById('full-name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const room = document.getElementById('room-select');

      // Simple Validation Helper
      const validateInput = (input) => {
        if (!input.value.trim()) {
          input.parentElement.classList.add('error');
          isValid = false;
        } else {
          input.parentElement.classList.remove('error');
        }
      };

      validateInput(fullName);
      validateInput(phone);
      validateInput(room);
      validateInput(checkInInput);
      validateInput(checkOutInput);

      // Email Pattern check
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.value.match(emailPattern)) {
        email.parentElement.classList.add('error');
        isValid = false;
      } else {
        email.parentElement.classList.remove('error');
      }

      if (isValid) {
        // Render success modal
        alertDetails.textContent = `Thank you, ${fullName.value}! Your reservation for the ${room.value} from ${checkInInput.value} to ${checkOutInput.value} has been confirmed. A confirmation email was sent to ${email.value}.`;
        bookingAlert.classList.remove('hidden');
        bookingForm.reset();
      }
    });
  }

  if (alertCloseBtn) {
    alertCloseBtn.addEventListener('click', () => {
      bookingAlert.classList.add('hidden');
    });
  }

  /* --------------------------------------------------
   * 7. Newsletter Form Handling
   * -------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Hungry Birds Hotel exclusive news!');
      newsletterForm.reset();
    });
  }

  /* --------------------------------------------------
   * 8. Scroll Back to Top Button
   * -------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});