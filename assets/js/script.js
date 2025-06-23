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
    // initNavigationCards();
    
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
// window.addEventListener('load', addDebugIndicator);

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

// Course Navigation Enhancement
document.addEventListener("DOMContentLoaded", () => {
  // Add click tracking for navigation cards
  const navCards = document.querySelectorAll(".nav-card")
  navCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Remove the preventDefault and alert, allow normal navigation
      // Add loading effect
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Add hover effects for course cards
  const courseCards = document.querySelectorAll(".course-card")
  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Function to navigate to specific course category
function navigateToCourse(category) {
  window.location.href = `courses.html?category=${category}`
}

// Add to global scope for inline usage
window.navigateToCourse = navigateToCourse

// Course data for modal display
const courseData = {
  1: {
    title: "Chiến lược tăng vốn từ vựng tiếng Anh cho người mất căn bản",
    instructor: "John Smith",
    duration: "15 giờ",
    level: "Cơ bản",
    students: "234 học viên",
    rating: "4.8/5",
    currentPrice: "360.000₫",
    originalPrice: "650.000₫",
    discount: "35%",
    image: "/assets/img/course.png",
    description:
      "Khóa học giúp bạn nắm vững các kỹ năng tăng vốn từ vựng tiếng Anh một cách hiệu quả và bền vững. Phù hợp cho người mới bắt đầu hoặc muốn củng cố lại kiến thức cơ bản.",
    highlights: [
      "Học 1000+ từ vựng thông dụng nhất",
      "Phương pháp ghi nhớ từ vựng hiệu quả",
      "Luyện tập với các tình huống thực tế",
      "Tài liệu học tập đầy đủ",
      "Hỗ trợ 24/7 từ giảng viên",
    ],
  },
  2: {
    title: "Chiến lược học ngữ pháp tiếng Anh cho người mất căn bản",
    instructor: "Sarah Johnson",
    duration: "20 giờ",
    level: "Cơ bản",
    students: "189 học viên",
    rating: "4.9/5",
    currentPrice: "490.000₫",
    originalPrice: "510.000₫",
    discount: "4%",
    image: "/assets/img/course.png",
    description:
      "Khóa học ngữ pháp tiếng Anh từ cơ bản đến nâng cao, giúp bạn hiểu rõ cấu trúc câu và sử dụng ngữ pháp một cách chính xác trong giao tiếp.",
    highlights: [
      "12 chủ đề ngữ pháp cơ bản",
      "Bài tập thực hành phong phú",
      "Giải thích dễ hiểu, sinh động",
      "Ứng dụng ngay vào giao tiếp",
      "Kiểm tra đánh giá định kỳ",
    ],
  },
  3: {
    title: "Chiến lược học phát âm và phản xạ nói tiếng Anh cho người mất căn bản",
    instructor: "Michael Brown",
    duration: "18 giờ",
    level: "Trung cấp",
    students: "156 học viên",
    rating: "4.7/5",
    currentPrice: "550.000₫",
    originalPrice: "680.000₫",
    discount: "19%",
    image: "/assets/img/course.png",
    description:
      "Khóa học tập trung vào việc cải thiện phát âm và khả năng phản xạ nói tiếng Anh tự nhiên, giúp bạn giao tiếp tự tin hơn.",
    highlights: [
      "Luyện phát âm chuẩn quốc tế",
      "Phát triển phản xạ nói tự nhiên",
      "Thực hành với giảng viên bản ngữ",
      "Ghi âm và nhận xét chi tiết",
      "Cải thiện ngữ điệu và nhấn âm",
    ],
  },
}

// Initialize course detail modal functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle view details button clicks
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-view-details")) {
      const courseId = e.target.closest(".btn-view-details").getAttribute("data-course-id")
      showCourseDetail(courseId)
    }

    // Handle enroll from modal
    if (e.target.closest("#enrollFromModal")) {
      const courseTitle = document.getElementById("courseDetailModalLabel").textContent
      alert(`Đăng ký thành công khóa học: ${courseTitle}`)

      // Close modal
      const modalElement = document.getElementById("courseDetailModal")
      const modal = bootstrap.Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
    }
  })
})

// Update the modal content generation to include add to cart button
function showCourseDetail(courseId) {
  const course = courseData[courseId]
  if (!course) return

  // Update modal title
  document.getElementById("courseDetailModalLabel").textContent = course.title

  // Generate modal content
  const modalBody = document.getElementById("courseDetailModalBody")
  modalBody.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-detail-image">
        
        <div class="course-detail-meta">
            <div class="meta-item">
                <i class="bi bi-person-fill"></i>
                <div>
                    <div class="meta-label">Giảng viên</div>
                    <div class="meta-value">${course.instructor}</div>
                </div>
            </div>
            <div class="meta-item">
                <i class="bi bi-clock-fill"></i>
                <div>
                    <div class="meta-label">Thời lượng</div>
                    <div class="meta-value">${course.duration}</div>
                </div>
            </div>
            <div class="meta-item">
                <i class="bi bi-bar-chart-fill"></i>
                <div>
                    <div class="meta-label">Trình độ</div>
                    <div class="meta-value">${course.level}</div>
                </div>
            </div>
            <div class="meta-item">
                <i class="bi bi-people-fill"></i>
                <div>
                    <div class="meta-label">Học viên</div>
                    <div class="meta-value">${course.students}</div>
                </div>
            </div>
            <div class="meta-item">
                <i class="bi bi-star-fill"></i>
                <div>
                    <div class="meta-label">Đánh giá</div>
                    <div class="meta-value">${course.rating}</div>
                </div>
            </div>
        </div>
        
        <div class="course-price-detail">
            <div class="price-detail-current">${course.currentPrice}</div>
            <span class="price-detail-original">${course.originalPrice}</span>
            <span class="price-detail-discount">Giảm ${course.discount}</span>
        </div>
        
        <div class="course-description">
            <h6><i class="bi bi-info-circle"></i> Mô tả khóa học</h6>
            <p>${course.description}</p>
        </div>
        
        <div class="course-highlights">
            <h6><i class="bi bi-check-circle"></i> Điểm nổi bật</h6>
            ${course.highlights
              .map(
                (highlight) => `
                <div class="highlight-item">
                    <i class="bi bi-check-circle-fill"></i>
                    <span>${highlight}</span>
                </div>
            `,
              )
              .join("")}
        </div>
    `

  // Update modal footer to include add to cart
  const modalFooter = document.querySelector("#courseDetailModal .modal-footer")
  modalFooter.innerHTML = `
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            <i class="bi bi-x-circle"></i> Đóng
        </button>
        <a href="courses.html" class="btn btn-outline-primary">
            <i class="bi bi-grid-3x3-gap"></i> Xem tất cả khóa học
        </a>
        <button type="button" class="btn btn-primary" onclick="addToCartFromModal('${courseId}')">
            <i class="bi bi-credit-card"></i> Đăng ký
        </button>
    `

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("courseDetailModal"))
  modal.show()
}

// Add to cart from modal
function addToCartFromModal(courseId) {
  const course = courseData[courseId]
  if (course && typeof addToCart === "function") {
    addToCart({
      id: courseId,
      title: course.title,
      image: course.image,
      currentPrice: course.currentPrice,
      originalPrice: course.originalPrice,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
    })

    // Close modal
    const modalElement = document.getElementById("courseDetailModal")
    const modal = bootstrap.Modal.getInstance(modalElement)
    if (modal) {
      modal.hide()
    }
  }
}

// Add to cart and go to checkout
function addToCartAndCheckout(courseId) {
  addToCartFromModal(courseId)
  setTimeout(() => {
    window.location.href = "cart.html"
  }, 500)
}

// Update existing registration buttons to add to cart
document.addEventListener("DOMContentLoaded", () => {
  // Update course registration buttons
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn") && e.target.closest(".btn").textContent.includes("Đăng ký ngay")) {
      e.preventDefault()

      // Get course card
      const courseCard = e.target.closest(".course-card")
      if (courseCard) {
        const courseId = courseCard.getAttribute("data-course-id")
        if (courseId && courseData[courseId]) {
          const course = courseData[courseId]
          if (typeof addToCart === "function") {
            addToCart({
              id: courseId,
              title: course.title,
              image: course.image,
              currentPrice: course.currentPrice,
              originalPrice: course.originalPrice,
              instructor: course.instructor,
              duration: course.duration,
              level: course.level,
            })
          }
        }
      }
    }
  })
})

// Thêm CSS cho cart update animation
document.addEventListener("DOMContentLoaded", () => {
  // Initialize floating cart if not exists
  if (!document.getElementById("floating-cart")) {
    const floatingCart = document.createElement("div")
    floatingCart.className = "floating-cart"
    floatingCart.id = "floating-cart"
    floatingCart.innerHTML = `
      <div class="cart-icon">
        <i class="bi bi-bag-fill"></i>
        <span class="cart-badge hidden" id="floating-cart-count">0</span>
      </div>
    `

    // Add styles if not exists
    if (!document.getElementById("floating-cart-styles")) {
      const style = document.createElement("style")
      style.id = "floating-cart-styles"
      style.textContent = `
        .floating-cart {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .floating-cart:hover {
          transform: translateY(-3px);
        }
        .cart-icon {
          position: relative;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #007bff, #0056b3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 5px 20px rgba(0, 123, 255, 0.4);
          transition: all 0.3s ease;
        }
        .floating-cart:hover .cart-icon {
          background: linear-gradient(135deg, #0056b3, #004085);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.6);
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #dc3545;
          color: white;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          border: 2px solid white;
          animation: pulse 2s infinite;
        }
        .cart-badge.hidden {
          display: none !important;
        }
        .floating-cart.cart-update {
          animation: cartPulse 0.3s ease-in-out;
        }
        @keyframes cartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @media (max-width: 768px) {
          .floating-cart {
            bottom: 20px;
            right: 20px;
          }
          .cart-icon {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
          }
          .cart-badge {
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
          }
        }
      `
      document.head.appendChild(style)
    }

    document.body.appendChild(floatingCart)

    // Add click event
    floatingCart.addEventListener("click", () => {
      window.location.href = "cart.html"
    })

    // Update cart count on page load
    setTimeout(() => {
      try {
        const cart = JSON.parse(localStorage.getItem("antCart") || "[]")
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

        const floatingCartCount = document.getElementById("floating-cart-count")
        const cartBadge = document.querySelector(".cart-badge")

        if (floatingCartCount) {
          floatingCartCount.textContent = totalItems
        }

        if (cartBadge) {
          if (totalItems > 0) {
            cartBadge.classList.remove("hidden")
          } else {
            cartBadge.classList.add("hidden")
          }
        }
      } catch (error) {
        console.error("Error loading cart count:", error)
      }
    }, 100)
  }
})

const bootstrap = window.bootstrap
window.addToCart = function(product) {
  // Lấy giỏ hàng từ localStorage hoặc tạo mới
  let cart = JSON.parse(localStorage.getItem("antCart") || "[]");
  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const index = cart.findIndex(item => item.id == product.id);
  if (index > -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  localStorage.setItem("antCart", JSON.stringify(cart));
  // Cập nhật badge số lượng nếu có
  const floatingCartCount = document.getElementById("floating-cart-count");
  const cartBadge = document.querySelector(".cart-badge");
  if (floatingCartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    floatingCartCount.textContent = totalItems;
    if (cartBadge) {
      cartBadge.classList.toggle("hidden", totalItems === 0);
    }
  }
  // Hiệu ứng cập nhật giỏ hàng
  const floatingCart = document.getElementById("floating-cart");
  if (floatingCart) {
    floatingCart.classList.add("cart-update");
    setTimeout(() => floatingCart.classList.remove("cart-update"), 400);
  }
};
