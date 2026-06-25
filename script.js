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

// Floating Circle Menu Logic
        const trigger = document.getElementById('circle-menu-trigger');
        const wrapper = document.getElementById('circle-menu-wrapper');
        const items = document.querySelectorAll('.circle-menu-item');
        const iconOpen = document.getElementById('circle-icon-open');
        const iconClose = document.getElementById('circle-icon-close');
        
        let menuOpen = false;
        const radius = 110; // Radius of the arc

        if(trigger && wrapper) {
            trigger.addEventListener('click', () => {
                menuOpen = !menuOpen;
                wrapper.classList.toggle('open', menuOpen);
                trigger.classList.toggle('active', menuOpen);
                
                if(menuOpen) {
                    iconOpen.style.display = 'none';
                    iconClose.style.display = 'block';
                    
                    items.forEach((item, i) => {
                        const total = items.length;
                        // Fan out toward bottom-right (0 deg to 90 deg)
                        const startAngle = 0; // 0 degrees (right)
                        const endAngle = Math.PI / 2; // 90 degrees (down)
                        const theta = startAngle + (endAngle - startAngle) * (i / (total - 1));
                        
                        const x = radius * Math.cos(theta);
                        const y = radius * Math.sin(theta);
                        
                        setTimeout(() => {
                            item.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                        }, i * 40); // stagger
                    });
                } else {
                    iconClose.style.display = 'none';
                    iconOpen.style.display = 'block';
                    
                    items.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.transform = `translate(0px, 0px) scale(0)`;
                        }, (items.length - 1 - i) * 40);
                    });
                }
            });
        }
    