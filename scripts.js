document.addEventListener('DOMContentLoaded', function() {
    // Starfield Background
    createStarfield();
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="ph-x"></i>' : '<i class="ph-list"></i>';
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="ph-list"></i>';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate Stats Counter
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when sustainability section is visible
                if (entry.target.id === 'sustainability') {
                    statValues.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateValue(stat, 0, target, 2000);
                    });
                }
                
                // Add animation class to elements when they come into view
                if (entry.target.classList.contains('product-card')) {
                    entry.target.classList.add('animate');
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and elements
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    // Floating Chat Toggle
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    
    chatToggle.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
    });
    
    document.getElementById('chat-close').addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Create starfield background
    function createStarfield() {
        const starfield = document.getElementById('starfield');
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 2;
            
            // Random opacity
            const opacity = Math.random();
            
            // Random animation duration
            const duration = 5 + Math.random() * 10;
            
            // Random delay
            const delay = Math.random() * 5;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = opacity;
            star.style.animation = `twinkle ${duration}s ${delay}s infinite`;
            
            starfield.appendChild(star);
        }
        
        // Add CSS for twinkling animation
        const style = document.createElement('style');
        style.textContent = `
            .star {
                position: absolute;
                background-color: white;
                border-radius: 50%;
                pointer-events: none;
            }
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
});