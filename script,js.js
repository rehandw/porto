// Project Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Slider elements
    const slider = document.querySelector('.project-slider');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const slideWidth = slides[0].offsetWidth + 30; // width + gap
    
    // Function to update slider position
    function updateSlider() {
        slider.scrollTo({
            left: currentSlide * slideWidth,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }
    
    // Next slide
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlider();
            }
        });
    }
    
    // Previous slide
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateSlider();
        } else if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlider();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isSwiping = false;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        e.preventDefault();
    });
    
    slider.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Swipe threshold
        if (Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSlide < slides.length - 1) {
                // Swipe left - next slide
                currentSlide++;
            } else if (diffX < 0 && currentSlide > 0) {
                // Swipe right - previous slide
                currentSlide--;
            }
            updateSlider();
        }
        
        isSwiping = false;
    });
    
    // Mouse wheel navigation
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0 && currentSlide < slides.length - 1) {
            // Scroll down - next slide
            currentSlide++;
        } else if (e.deltaY < 0 && currentSlide > 0) {
            // Scroll up - previous slide
            currentSlide--;
        }
        updateSlider();
    });
    
    // Auto slide (optional - uncomment if you want auto sliding)
    /*
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto slide on load
    startAutoSlide();
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    */
    
    // Initial update
    updateSlider();
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || 'Pengunjung';
            
            // Show success message
            alert(`Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan menghubungi Anda segera.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.project-card, .stat, .skill-item, .contact-info').forEach(el => {
        observer.observe(el);
    });
});