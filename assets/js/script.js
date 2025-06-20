// Background Slider - Simplified and Fixed
let currentImageIndex = 0;
let backgroundInterval;
let images;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing page...');
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
        console.log('✅ AOS initialized');
    }
    
    // Initialize Background Slider
    initBackgroundSlider();
    
    // Initialize Navigation Cards
    initNavigationCards();
    
    // Initialize other features
    initScrollIndicator();
    initKeyboardNavigation();
});

function initBackgroundSlider() {
    images = document.querySelectorAll('.background-image');
    console.log('🖼️ Found', images.length, 'background images');
    
    if (images.length < 2) {
        console.warn('⚠️ Need at least 2 images for slider');
        return;
    }
    
    // Reset all images
    images.forEach((img, index) => {
        img.classList.remove('active');
        img.style.opacity = '0';
        console.log(`Image ${index + 1} reset`);
    });
    
    // Set first image as active
    currentImageIndex = 0;
    images[currentImageIndex].classList.add('active');
    images[currentImageIndex].style.opacity = '1';
    console.log('✅ First image set as active');
    
    // Start automatic switching
    startBackgroundSlider();
    
    // Add manual control for testing
    document.addEventListener('keydown', function(e) {
        if (e.key === 'b' || e.key === 'B') {
            console.log('🎯 Manual background switch triggered');
            switchBackground();
        }
    });
}

function startBackgroundSlider() {
    if (backgroundInterval) {
        clearInterval(backgroundInterval);
    }
    
    backgroundInterval = setInterval(() => {
        console.log('⏰ Auto switch triggered');
        switchBackground();
    }, 4000);
    
    console.log('✅ Background slider started (4s interval)');
}

function switchBackground() {
    if (!images || images.length < 2) return;
    
    console.log(`🔄 Switching from image ${currentImageIndex + 1}`);
    
    // Hide current image
    images[currentImageIndex].classList.remove('active');
    images[currentImageIndex].style.opacity = '0';
    
    // Move to next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
    
    // Show new image after a short delay
    setTimeout(() => {
        images[currentImageIndex].classList.add('active');
        images[currentImageIndex].style.opacity = '1';
        console.log(`✅ Switched to image ${currentImageIndex + 1}`);
    }, 100);
}

// Pause/resume when page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('⏸️ Page hidden - pausing slider');
        if (backgroundInterval) {
            clearInterval(backgroundInterval);
            backgroundInterval = null;
        }
    } else {
        console.log('▶️ Page visible - resuming slider');
        if (!backgroundInterval && images && images.length >= 2) {
            startBackgroundSlider();
        }
    }
});

function initNavigationCards() {
    const cards = document.querySelectorAll('.nav-card');
    console.log('🎴 Initializing', cards.length, 'navigation cards');
    
    cards.forEach((card, index) => {
        // Make focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Chuyển đến trang ${card.textContent.trim()}`);
        
        // Click event
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                console.log('🔗 Navigating to:', href);
                // Uncomment for actual navigation
                // window.location.href = href;
                alert('Chuyển đến trang: ' + href);
                this.style.transform = '';
            }, 150);
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.content-section');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const cards = document.querySelectorAll('.nav-card');
        let currentFocus = document.activeElement;
        let currentIndex = Array.from(cards).indexOf(currentFocus);
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex === -1) {
                    cards[0].focus();
                } else {
                    currentIndex = (currentIndex + 1) % cards.length;
                    cards[currentIndex].focus();
                }
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex === -1) {
                    cards[cards.length - 1].focus();
                } else {
                    currentIndex = currentIndex <= 0 ? cards.length - 1 : currentIndex - 1;
                    cards[currentIndex].focus();
                }
                break;
                
            case 'Enter':
            case ' ':
                if (currentFocus.classList.contains('nav-card')) {
                    e.preventDefault();
                    currentFocus.click();
                }
                break;
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add visual debug indicator
function addDebugIndicator() {
    const indicator = document.createElement('div');
    indicator.innerHTML = '🔄 Background Slider Active - Press B to test';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 9999;
        font-family: monospace;
    `;
    document.body.appendChild(indicator);
    
    // Remove after 8 seconds
    setTimeout(() => {
        indicator.remove();
    }, 8000);
}

// Add debug indicator when page loads
window.addEventListener('load', addDebugIndicator);

// Lazy loading for background images
function lazyLoadBackgrounds() {
    const images = document.querySelectorAll('.background-image');
    images.forEach(img => {
        const bgImage = window.getComputedStyle(img).backgroundImage;
        if (bgImage !== 'none') {
            const imageUrl = bgImage.slice(4, -1).replace(/"/g, "");
            const tempImg = new Image();
            tempImg.onload = function() {
                img.style.backgroundImage = `url(${imageUrl})`;
            };
            tempImg.src = imageUrl;
        }
    });
}

// Initialize lazy loading
lazyLoadBackgrounds();

// Responsive navigation menu toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollPosition() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for background (optional)
    const backgrounds = document.querySelectorAll('.background-image');
    backgrounds.forEach(bg => {
        bg.style.transform = `translateY(${rate}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
}

// Uncomment for parallax effect
// window.addEventListener('scroll', requestTick);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.nav-card').forEach(card => {
    observer.observe(card);
});

// Error handling for images
document.querySelectorAll('.background-image').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Failed to load background image');
        this.style.backgroundColor = '#f0f0f0';
    });
});

// Preload next background image
function preloadNextImage() {
    const nextIndex = (currentImageIndex + 1) % images.length;
    if (images[nextIndex]) {
        const bgImage = window.getComputedStyle(images[nextIndex]).backgroundImage;
        if (bgImage !== 'none') {
            const imageUrl = bgImage.slice(4, -1).replace(/"/g, "");
            const img = new Image();
            img.src = imageUrl;
        }
    }
}

// Preload images for better performance
setTimeout(preloadNextImage, 1000);