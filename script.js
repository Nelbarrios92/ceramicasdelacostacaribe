document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            header.style.paddingTop = '12px';
            header.style.paddingBottom = '12px';
        } else {
            header.style.boxShadow = 'none';
            header.style.paddingTop = '20px';
            header.style.paddingBottom = '20px';
        }
    });

    // Sliding Nav-Header Logic (inspired by Framer Motion cursor tab)
    const navLinks = document.querySelector('.nav-links');
    const tabs = document.querySelectorAll('.nav-tab');
    const cursor = document.querySelector('.nav-cursor');

    if (navLinks && cursor) {
        tabs.forEach(tab => {
            tab.addEventListener('mouseenter', () => {
                const width = tab.offsetWidth;
                const left = tab.offsetLeft;
                cursor.style.width = `${width}px`;
                cursor.style.transform = `translateX(${left}px)`;
                cursor.style.opacity = '1';
            });
        });

        navLinks.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .info-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Custom CSS for observed elements
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksEl = document.querySelector('.nav-links');

    if (menuToggle && navLinksEl) {
        menuToggle.addEventListener('click', () => {
            const open = navLinksEl.classList.toggle('mobile-open');
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', open ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinksEl.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navLinksEl.classList.contains('mobile-open')) {
                    navLinksEl.classList.remove('mobile-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.setAttribute('data-lucide', 'menu');
                        lucide.createIcons();
                    }
                }
            }
        });

        // Close on resize to large screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinksEl.classList.contains('mobile-open')) {
                navLinksEl.classList.remove('mobile-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    }
});
