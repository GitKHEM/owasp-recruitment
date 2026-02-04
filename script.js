// Navbar Glassmorphism Effect on Scroll
document.addEventListener('DOMContentLoaded', function () {
    // ===== LOADING SCREEN WITH TYPING ANIMATION =====
    const loadingScreen = document.getElementById('loading-screen');
    const bodyContainer = document.getElementById('body-container');
    const loadingOwasp = document.getElementById('loading-owasp');
    const owaspText = 'OWASP';
    
    // Typing animation for OWASP
    let charIndex = 0;
    const typingSpeed = 200; // ms per character
    
    function typeOwasp() {
        if (charIndex < owaspText.length) {
            loadingOwasp.textContent += owaspText.charAt(charIndex);
            charIndex++;
            setTimeout(typeOwasp, typingSpeed);
        }
    }
    
    // Start typing animation
    setTimeout(typeOwasp, 300);
    
    // After 3 seconds, hide loading screen and show main content
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        bodyContainer.classList.add('visible');
    }, 3000);
    
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add glassmorphic effect when scroll happens
        if (scrollTop > 50) {
            navbar.classList.add('glass-morphic');
        } else {
            navbar.classList.remove('glass-morphic');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ===== GSAP CANVAS PARTICLE NETWORK =====
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(window.innerWidth / 10, 80);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections between particles
    function drawConnections() {
        const connectionDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
            
            // Connect to mouse
            const mouseDx = particles[i].x - mouseX;
            const mouseDy = particles[i].y - mouseY;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            if (mouseDistance < connectionDistance * 1.5 && mouseX > 0 && mouseY > 0) {
                const opacity = (1 - mouseDistance / (connectionDistance * 1.5)) * 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    animate();
    
    // Track mouse for interactive effect
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // ===== GSAP ENTRANCE ANIMATIONS =====
    // Set initial states
    gsap.set('.scramble-hero .letter', { 
        opacity: 0, 
        y: 50,
        rotationX: -90
    });
    
    gsap.set('.hero-tagline', { 
        opacity: 0, 
        y: 30 
    });
    
    gsap.set('.hero-cta', { 
        opacity: 0, 
        y: 20 
    });
    
    // Create entrance timeline
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    
    heroTimeline
        // Animate letters with stagger
        .to('.scramble-hero .letter', {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
        })
        // Animate tagline
        .to('.hero-tagline', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.3')
        // Animate CTA button
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '-=0.4');
    
    // ===== GSAP FLOATING ANIMATION =====
    // Add floating effect to hero content
    gsap.to('.hero-content', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // ===== GSAP MOUSE INTERACTION =====
    const heroContent = document.querySelector('.hero-content');
    
    heroContent.addEventListener('mousemove', (e) => {
        const rect = heroContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateX = (e.clientY - centerY) / 50;
        const rotateY = (e.clientX - centerX) / 50;
        
        gsap.to('.hero-content', {
            rotateX: -rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    heroContent.addEventListener('mouseleave', () => {
        gsap.to('.hero-content', {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    // ===== GSAP SCROLL ANIMATION =====
    // Fade out hero on scroll
    gsap.to('.hero-section', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        opacity: 1,
        ease: 'none'
    });
    
    // ===== GSAP BUTTON HOVER EFFECTS =====
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('mouseenter', () => {
            gsap.to(heroBtn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        heroBtn.addEventListener('mouseleave', () => {
            gsap.to(heroBtn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
    
    // Scramble Text Animation: store originals, play on load and once-per-mouse-enter
    const letters = document.querySelectorAll('.letter');
    const chars = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const maxIterations = 15;
    const iterationSpeed = 40;

    // Store original characters on each letter element
    letters.forEach(letter => {
        const txt = letter.textContent;
        letter.dataset.original = txt;
    });

    // Scramble effect for a single element
    function scrambleEffect(element) {
        const originalChar = element.dataset.original || '';
        if (originalChar.trim() === '') return; // skip spaces
        if (element.dataset.animating === 'true') return; // avoid re-entrance
        element.dataset.animating = 'true';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.filter = 'none';
        let iterations = 0;

        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                element.textContent = originalChar;
                element.dataset.animating = 'false';
                // Restore hover capability after animation
                setTimeout(() => {
                    element.style.transform = '';
                    element.style.filter = '';
                }, 50);
                clearInterval(interval);
            } else {
                element.textContent = chars[Math.floor(Math.random() * chars.length)];
                iterations++;
            }
        }, iterationSpeed);
    }

    // Play the staggered scramble across all letters (like on page load)
    let isAnimating = false;
    function playLoadAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        letters.forEach((letter, index) => {
            if (letter.dataset.original.trim() === '') return; // skip spaces
            setTimeout(() => {
                scrambleEffect(letter);
            }, index * 100);
        });

        // estimate total duration then clear flag
        const totalDuration = letters.length * 100 + maxIterations * iterationSpeed + 200;
        setTimeout(() => { isAnimating = false; }, totalDuration);
    }

    // Trigger animation on page load
    playLoadAnimation();

    // Trigger same animation once when mouse enters the whole hero text
    const scrambleHero = document.querySelector('.scramble-hero');
    if (scrambleHero) {
        scrambleHero.addEventListener('mouseenter', () => {
            playLoadAnimation();
        });
    }

    // Trigger single scramble for the specific letter when mouse enters that letter
    letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            // Only trigger if not currently animating and not a space
            if (letter.dataset.animating !== 'true' && letter.dataset.original.trim() !== '') {
                scrambleEffect(letter);
            }
        });
    });

    // Smooth Page Scroll Animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // ===== EVENTS PORTAL INTERACTIONS =====
    // Event data
    const eventData = {
        'cyberbasics-1.0': {
            title: 'CyberBasics 1.0',
            date: 'April 12th, 2025',
            image: './img/event1.jpg',
            description: 'A specially designed guest lecture session introducing fundamental cybersecurity concepts to beginners.'
        },
        'owasp-manit-ctf': {
            title: 'OWASP MANIT CTF',
            date: 'April 13th, 2025',
            image: './img/event2.png',
            description: 'Round 1: Online technical quiz ,Round 2: Onsite Jeopardy-style CTF hosted in MANIT NTB.'
        },
        'cyberhunter-1.0': {
            title: 'CyberHunter 1.0 – Real World Hacking Game',
            date: 'April 11th – 13th, 2025',
            image: './img/event3.jpg',
            description: 'Practical workshop covering penetration testing, vulnerability assessment, and secure coding practices. Bring your laptop and get ready to learn.'
        },
        'cyberbasics 2.0': {
            title: 'CyberBasics 2.0',
            date: 'Coming Soon',
            image: './img/logo.jpg',
            description: 'Coming Soon'
        },
        'owasp-manit-ctf-2.0': {
            title: 'OWASP MANIT CTF 2.0',
            date: 'Coming Soon',
            image: './img/logo.jpg',
            description: 'Coming Soon'
        },
        'cyberhunter-2.0': {
            title: 'CyberHunter 2.0',
            date: 'Coming Soon',
            image: './img/logo.jpg',
            description: 'Coming Soon'
        }
    };

    // Initialize tablet device interactions
    initDevice('tablet');
    // Initialize phone device interactions
    initDevice('phone');

    function initDevice(deviceType) {
        const suffix = deviceType === 'phone' ? '-phone' : '';
        const folderGrid = document.getElementById(`folder-grid${suffix}`);
        const eventDetail = document.getElementById(`event-detail${suffix}`);
        const backBtn = document.getElementById(`back-btn${suffix}`);
        
        if (!folderGrid) return;

        // Tab switching
        const tabBtns = folderGrid.closest('.device-screen')?.querySelectorAll('.tab-btn');
        const tabContents = folderGrid.querySelectorAll('.tab-content');

        tabBtns?.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.content === tab) {
                        content.classList.add('active');
                    }
                });
            });
        });

        // Folder click - show event detail
        const folderItems = folderGrid.querySelectorAll('.folder-item');
        folderItems.forEach(folder => {
            folder.addEventListener('click', () => {
                const eventId = folder.dataset.event;
                const event = eventData[eventId];
                
                if (event && eventDetail) {
                    // Populate event details
                    const titleEl = document.getElementById(`event-title${suffix}`);
                    const dateEl = document.getElementById(`event-date${suffix}`);
                    const descEl = document.getElementById(`event-desc${suffix}`);
                    const imgEl = document.getElementById(`event-image${suffix}`);
                    
                    if (titleEl) titleEl.textContent = event.title;
                    if (dateEl) dateEl.textContent = `Date: ${event.date}`;
                    if (descEl) descEl.textContent = event.description;
                    if (imgEl) imgEl.src = event.image;
                    
                    // Show detail view with animation
                    eventDetail.classList.add('active');
                    gsap.fromTo(eventDetail, 
                        { opacity: 0, x: 50 },
                        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                    );
                }
            });
        });

        // Back button - return to folder view
        backBtn?.addEventListener('click', () => {
            if (eventDetail) {
                gsap.to(eventDetail, {
                    opacity: 0,
                    x: -50,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        eventDetail.classList.remove('active');
                        gsap.set(eventDetail, { x: 0 });
                    }
                });
            }
        });
    }

    // Smooth scroll for Events link
    document.querySelector('a[href="#events"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
    });

    // ===== HAMBURGER MENU TOGGLE =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-form');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check if form is valid
            if (contactForm.checkValidity()) {
                // Show success message
                successMessage.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // Re-initialize Lucide icons for success message
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            } else {
                // Trigger validation UI
                contactForm.reportValidity();
            }
        });

        // Reset button to show form again
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                successMessage.classList.remove('active');
            });
        }
    }

    // ===== NEWSLETTER FORM HANDLING =====
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (newsletterForm.checkValidity()) {
                // Show simple alert for now (could be replaced with a toast notification)
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });
    }
});
