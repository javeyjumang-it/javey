// Travel Website Customer Script
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('booking');
    const bookingOverlay = document.getElementById('bookingOverlay');
    const bookingForm = document.getElementById('bookingForm');
    const closeBooking = document.getElementById('closeBooking');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const tourButtons = document.querySelectorAll('.btn-book');
    let currentTestimonial = 0;

    // Mobile Navbar Toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Login Modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        
        // Demo login
        if (email === 'admin@travelvista.com' && password === 'admin123') {
            localStorage.setItem('role', 'admin');
            window.location.href = 'admin.html';
        } else {
            alert('Invalid credentials. Use: admin@travelvista.com / admin123');
        }
    });

    // Booking Modal
    function openBooking() {
        bookingModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeBookingModal() {
        bookingModal.classList.add('hidden');
        document.body.style.overflow = '';
        bookingForm.reset();
    }

    bookNowBtn.addEventListener('click', openBooking);
    tourButtons.forEach(btn => btn.addEventListener('click', openBooking));

    bookingOverlay.addEventListener('click', closeBookingModal);
    closeBooking.addEventListener('click', closeBookingModal);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bookingData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            tour: document.getElementById('tourSelect').value,
            date: document.getElementById('travelDate').value,
            requirements: document.getElementById('specialReq').value,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage (shared with admin)
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        alert('Booking confirmed! Check admin panel or your email.');
        closeBookingModal();
    });

    // Testimonial Slider
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Auto slide
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Close modals on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBookingModal();
            loginModal.classList.add('hidden');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255,255,255,0.98)';
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255,255,255,0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });

    // Initialize first testimonial
    showTestimonial(0);
});
