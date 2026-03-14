document.addEventListener('DOMContentLoaded', () => {
    // ── Register GSAP ScrollTrigger ──
    gsap.registerPlugin(ScrollTrigger);

    // ── Background Pattern ──
    const bgPattern = document.getElementById('bgPattern');
    bgPattern.innerHTML = `<span>${'LUNAR+ '.repeat(120)}</span>`;

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Hero Entrance Timeline (GSAP) ──
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTL
        .from('.navbar', { y: -30, opacity: 0, duration: 0.8 })
        .from('.hero-left h1', { y: 50, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('.hero-left p', { y: 35, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { y: 25, opacity: 0, duration: 0.7, clearProps: 'all' }, '-=0.5')
        .from('.hero-green-bg', {
            scale: 0.9,
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-photo', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.9');

    // ── Hero parallax ──
    gsap.to('.hero-left', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // ── Background pattern parallax ──
    gsap.to('.bg-pattern', {
        y: -200,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
        }
    });

    // ── Showcase section reveal ──
    gsap.from('.showcase-inner', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.showcase',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // ── ERP / LMS Tab Switching ──
    const erpTabs = document.querySelectorAll('.erp-lms-tab');
    const erpPanels = document.querySelectorAll('.erp-lms-panel');

    erpTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            erpTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.dataset.tab === 'erp' ? 'erpPanel' : 'lmsPanel';

            erpPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.add('active');
                    gsap.fromTo(panel.querySelectorAll('.mini-stat-card'),
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
                    );
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // ── Bento Grid Scroll Reveal ──
    const bentoCards = document.querySelectorAll('.bento-card, .bento-desc');
    bentoCards.forEach((card, i) => {
        gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ── Bento card hover → update description text ──
    const bentoDescriptions = {
        bentoCard1: 'Digitize admissions from enquiry to enrollment with online forms, AI-driven lead tracking, and automated merit lists. Our Campus Management System ensures faster onboarding and UDISE+/CBCS-ready reporting.',
        bentoCard2: 'Track attendance via biometric, RFID, or mobile apps. The Campus Management System auto-syncs data with payroll and timetables, reducing manual work. Dashboards monitor leaves and punctuality while smart reports boost attendance and ensure HR compliance.',
        bentoCard3: 'Automate fee collection with Razorpay integration, generate instant receipts, and manage scholarships, fines, and refunds. Real-time dashboards keep finances transparent and audit-ready.',
        bentoCard4: 'Manage transport, library, and visitor operations effortlessly. GPS tracking, digital catalogues, and secure entry logs improve safety and transparency. The Campus Management System sends instant alerts and centralizes records for a connected, efficient campus.',
        bentoCard5: 'Generate conflict-free timetables in seconds with AI that considers faculty preferences, room availability, and course constraints. Auto-adjust for substitutions and exam schedules.',
        bentoCard6: 'Deliver courses online with live classes via Zoom, assignment submissions, discussion forums, and automated grading. SCORM-compliant and accessible from any device.'
    };

    const bentoDescText = document.getElementById('bentoDescText');
    Object.keys(bentoDescriptions).forEach(id => {
        const card = document.getElementById(id);
        if (card) {
            card.addEventListener('mouseenter', () => {
                gsap.to(bentoDescText, {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        bentoDescText.textContent = bentoDescriptions[id];
                        gsap.to(bentoDescText, { opacity: 1, duration: 0.25 });
                    }
                });
            });
        }
    });

    // ── Stakeholder Tab Switching ──
    const stakeTabs = document.querySelectorAll('.stake-tab');
    const stakePanels = document.querySelectorAll('.stake-panel');

    const stakeMap = {
        admin: 'panelAdmin',
        parents: 'panelParents',
        students: 'panelStudents',
        principals: 'panelPrincipals'
    };

    stakeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            stakeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetPanel = stakeMap[tab.dataset.stake];

            stakePanels.forEach(panel => {
                if (panel.id === targetPanel) {
                    panel.classList.add('active');
                    gsap.fromTo(panel.querySelectorAll('.stake-feature'),
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: 'power2.out' }
                    );
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // Stakeholder section scroll reveal
    gsap.from('.stakeholders-inner h2', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.stakeholders', start: 'top 80%' }
    });

    // ── Testimonials Slider ──
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');

    let testiIndex = 0;
    let autoSlide;
    const cardGap = 24; // 1.5rem

    function getCardWidth() {
        if (!cards.length) return 364;
        return cards[0].offsetWidth + cardGap;
    }

    function getVisibleCards() {
        const sliderWidth = document.getElementById('testimonialSlider').offsetWidth;
        return Math.floor(sliderWidth / getCardWidth());
    }

    function getMaxIndex() {
        const visible = getVisibleCards();
        return Math.max(0, cards.length - visible);
    }

    function slideTo(index) {
        const max = getMaxIndex();
        testiIndex = Math.max(0, Math.min(index, max));
        track.style.transform = `translateX(-${testiIndex * getCardWidth()}px)`;
    }

    function nextSlide() {
        if (testiIndex >= getMaxIndex()) {
            slideTo(0);
        } else {
            slideTo(testiIndex + 1);
        }
    }

    function prevSlide() {
        if (testiIndex <= 0) {
            slideTo(getMaxIndex());
        } else {
            slideTo(testiIndex - 1);
        }
    }

    function startAuto() {
        stopAuto();
        autoSlide = setInterval(nextSlide, 4000);
    }

    function stopAuto() {
        if (autoSlide) clearInterval(autoSlide);
    }

    nextBtn.addEventListener('click', () => { nextSlide(); startAuto(); });
    prevBtn.addEventListener('click', () => { prevSlide(); startAuto(); });

    const slider = document.getElementById('testimonialSlider');
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();

    // Testimonial section scroll reveal
    gsap.from('.testimonials-inner h2', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials', start: 'top 80%' }
    });

    // ── Footer scroll reveal ──
    gsap.from('.footer-inner', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 90%' }
    });

    // ── Hamburger Toggle (mobile) ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
});
