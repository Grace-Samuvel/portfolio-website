/* ==========================
     Portfolio script.js
     - Menu toggle (mobile)
     - Smooth scroll helper
     - Skill bar animations using IntersectionObserver
     - Contact form validation (frontend only)
     - Small accessibility helpers
     ==========================
*/

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // --- Menu toggle for small screens ---
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    let menuOpen = false;

    menuBtn && menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        // toggle visible navigation by adding/removing a data attribute
        nav.style.display = menuOpen ? 'block' : 'none';
        // animate hamburger
        menuBtn.classList.toggle('open', menuOpen);
    });

    // Hide nav on resize for consistent behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) { nav.style.display = ''; }
    });

    // --- Smooth scrolling for anchor links (enhanced) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            // Let browser handle external links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // close mobile menu after click
                if (window.innerWidth <= 900 && nav) { nav.style.display = 'none'; menuOpen = false; menuBtn.classList.remove('open'); }
            }
        });
    });

    // --- Animate skill bars when visible ---
    const fills = document.querySelectorAll('.fill');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const pct = el.getAttribute('data-fill') || 0;
                    el.style.width = pct + '%';
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.35 });
        fills.forEach(f => observer.observe(f));
    } else {
        // fallback: set widths immediately
        fills.forEach(f => { f.style.width = (f.getAttribute('data-fill') || 0) + '%'; });
    }

    // --- Contact form handling (frontend only) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                formStatus.textContent = 'Please complete all fields before sending.';
                formStatus.style.color = '#ffb4b4';
                return;
            }

            // Basic email pattern check
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.style.color = '#ffb4b4';
                return;
            }

            // Simulate sending (no backend) — show success message
            formStatus.textContent = 'Thanks, your message was sent (demo).';
            formStatus.style.color = '#bfeacb';
            contactForm.reset();
        });
    }

    // --- Set current year in footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Small accessibility: close menu on Escape key ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            menuOpen = false; nav.style.display = 'none'; menuBtn.classList.remove('open');
        }
    });

    // --- Optional: reveal animations for sections using IntersectionObserver ---
    const sections = document.querySelectorAll('section, .project-card');
    if ('IntersectionObserver' in window) {
        const secObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        sections.forEach(s => secObs.observe(s));
    }

});

/* End of script.js */
