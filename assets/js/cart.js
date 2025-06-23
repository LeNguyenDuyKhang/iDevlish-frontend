// Shopping Cart JavaScript
class ShoppingCart {
  constructor() {
    this.items = this.loadCart()
    this.coupons = {
      WELCOME10: { discount: 0.1, description: "Giảm 10% cho khách hàng mới" },
      SAVE20: { discount: 0.2, description: "Giảm 20% cho đơn hàng trên 1 triệu" },
      STUDENT15: { discount: 0.15, description: "Giảm 15% cho học sinh, sinh viên" },
    }
    this.appliedCoupon = null
    this.init()

    // Ensure floating cart is updated on page load
    setTimeout(() => {
      this.updateFloatingCart()
    }, 500)
  }

  init() {
    this.updateCartDisplay()
    this.updateFloatingCart()
    this.bindEvents()
    this.loadRecommendedCourses()
  }

  // Load cart from localStorage
  loadCart() {
    const saved = localStorage.getItem("antCart")
    return saved ? JSON.parse(saved) : []
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem("antCart", JSON.stringify(this.items))
  }

  // Add item to cart
  addItem(courseData) {
    console.log("Adding item to cart:", courseData)

    const existingItem = this.items.find((item) => item.id === courseData.id)

    if (existingItem) {
      existingItem.quantity += 1
      console.log("Updated existing item quantity:", existingItem.quantity)
    } else {
      this.items.push({
        ...courseData,
        quantity: 1,
        addedAt: new Date().toISOString(),
      })
      console.log("Added new item to cart")
    }

    this.saveCart()
    this.updateCartDisplay()
    this.updateFloatingCart()
    this.showAddToCartNotification(courseData.title)

    // Animate floating cart
    this.animateFloatingCart()

    console.log("Cart updated. Total items:", this.items.length)
  }

  // Remove item from cart
  removeItem(courseId) {
    this.items = this.items.filter((item) => item.id !== courseId)
    this.saveCart()
    this.updateCartDisplay()
    this.updateFloatingCart()
  }

  // Update item quantity
  updateQuantity(courseId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(courseId)
      return
    }

    const item = this.items.find((item) => item.id === courseId)
    if (item) {
      item.quantity = newQuantity
      this.saveCart()
      this.updateCartDisplay()
      this.updateFloatingCart()
    }
  }

  // Get cart totals
  getCartTotals() {
    const subtotal = this.items.reduce((total, item) => {
      const price = Number.parseFloat(item.currentPrice.replace(/[^\d]/g, ""))
      return total + price * item.quantity
    }, 0)

    let discount = 0
    if (this.appliedCoupon) {
      const coupon = this.coupons[this.appliedCoupon]
      if (coupon) {
        discount = subtotal * coupon.discount
      }
    }

    const total = subtotal - discount

    return {
      subtotal,
      discount,
      total,
      itemCount: this.items.reduce((count, item) => count + item.quantity, 0),
    }
  }

  // Update cart display
  updateCartDisplay() {
    const cartItems = document.getElementById("cart-items")
    const cartCount = document.getElementById("cart-count")
    const emptyCart = document.getElementById("empty-cart")
    const cartContent = document.getElementById("cart-content")

    if (!cartItems) return

    const totals = this.getCartTotals()

    // Update cart count
    if (cartCount) {
      cartCount.textContent = totals.itemCount
    }

    // Show/hide empty cart
    if (this.items.length === 0) {
      if (emptyCart) emptyCart.style.display = "block"
      if (cartContent) cartContent.style.display = "none"
      return
    } else {
      if (emptyCart) emptyCart.style.display = "none"
      if (cartContent) cartContent.style.display = "block"
    }

    // Render cart items with horizontal layout
    cartItems.innerHTML = this.items
      .map(
        (item) => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid">
                </div>
                <div class="item-details">
                    <h5 class="item-title">
                        <a href="courses.html?id=${item.id}">${item.title}</a>
                    </h5>
                    <div class="item-meta">
                        <div class="meta-item">
                            <i class="bi bi-person"></i>
                            <span>Giảng viên</span>
                        </div>
                        <div class="meta-item">
                            <i class="bi bi-clock"></i>
                            <span>${item.duration || "20 giờ"}</span>
                        </div>
                        <div class="meta-item">
                            <i class="bi bi-bar-chart"></i>
                            <span>${item.level || "Trung cấp"}</span>
                        </div>
                    </div>
                    <div class="item-price">
                        ${item.currentPrice}
                        ${item.originalPrice ? `<span class="original-price">${item.originalPrice}</span>` : ""}
                    </div>
                    <button class="remove-btn" onclick="cart.removeItem('${item.id}')">
                        <i class="bi bi-trash"></i> Xóa
                    </button>
                </div>
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" ${
                          item.quantity <= 1 ? "disabled" : ""
                        }>
                            <i class="bi bi-dash"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${
                          item.quantity
                        }" min="1" max="10" onchange="cart.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" ${
                          item.quantity >= 10 ? "disabled" : ""
                        }>
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")

    // Update summary
    this.updateSummary(totals)
  }

  // Update summary section
  updateSummary(totals) {
    const subtotalEl = document.getElementById("subtotal")
    const discountEl = document.getElementById("discount")
    const totalEl = document.getElementById("total")

    if (subtotalEl) {
      subtotalEl.textContent = this.formatPrice(totals.subtotal)
    }

    if (discountEl) {
      discountEl.textContent = totals.discount > 0 ? `-${this.formatPrice(totals.discount)}` : "-0₫"
    }

    if (totalEl) {
      totalEl.textContent = this.formatPrice(totals.total)
    }
  }

  // Update floating cart
  updateFloatingCart() {
    const floatingCartCount = document.getElementById("floating-cart-count")
    const cartBadge = document.querySelector(".cart-badge")

    if (floatingCartCount) {
      const totals = this.getCartTotals()
      floatingCartCount.textContent = totals.itemCount
      console.log("Updated floating cart count:", totals.itemCount)

      if (cartBadge) {
        if (totals.itemCount > 0) {
          cartBadge.classList.remove("hidden")
          cartBadge.style.display = "flex"
        } else {
          cartBadge.classList.add("hidden")
          cartBadge.style.display = "none"
        }
      }
    }
  }

  // Animate floating cart
  animateFloatingCart() {
    const floatingCart = document.getElementById("floating-cart")
    if (floatingCart) {
      floatingCart.classList.add("cart-update")
      setTimeout(() => {
        floatingCart.classList.remove("cart-update")
      }, 300)
    }
  }

  // Show add to cart notification
  showAddToCartNotification(courseTitle) {
    // Create notification
    const notification = document.createElement("div")
    notification.className = "cart-notification"
    notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-check-circle-fill"></i>
                <span>Đã thêm "${courseTitle}" vào giỏ hàng</span>
            </div>
        `

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Apply coupon
  applyCoupon(couponCode) {
    const coupon = this.coupons[couponCode.toUpperCase()]
    const messageEl = document.getElementById("coupon-message")

    if (!coupon) {
      messageEl.textContent = "Mã giảm giá không hợp lệ"
      messageEl.className = "mt-2 error"
      return false
    }

    const totals = this.getCartTotals()
    if (couponCode.toUpperCase() === "SAVE20" && totals.subtotal < 1000000) {
      messageEl.textContent = "Mã giảm giá này chỉ áp dụng cho đơn hàng trên 1 triệu đồng"
      messageEl.className = "mt-2 error"
      return false
    }

    this.appliedCoupon = couponCode.toUpperCase()
    messageEl.textContent = `Đã áp dụng: ${coupon.description}`
    messageEl.className = "mt-2 success"

    this.updateCartDisplay()
    return true
  }

  // Format price
  formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Bind events
  bindEvents() {
    // Floating cart click
    const floatingCart = document.getElementById("floating-cart")
    if (floatingCart) {
      floatingCart.addEventListener("click", () => {
        window.location.href = "cart.html"
      })
    }

    // Apply coupon
    const applyCouponBtn = document.getElementById("apply-coupon")
    if (applyCouponBtn) {
      applyCouponBtn.addEventListener("click", () => {
        const couponCode = document.getElementById("coupon-code").value.trim()
        if (couponCode) {
          this.applyCoupon(couponCode)
        }
      })
    }

    // Coupon input enter key
    const couponInput = document.getElementById("coupon-code")
    if (couponInput) {
      couponInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const couponCode = e.target.value.trim()
          if (couponCode) {
            this.applyCoupon(couponCode)
          }
        }
      })
    }

    // Checkout button
    const checkoutBtn = document.getElementById("checkout-btn")
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        this.checkout()
      })
    }
  }

  // Checkout process
  checkout() {
    if (this.items.length === 0) {
      alert("Giỏ hàng của bạn đang trống!")
      return
    }

    const totals = this.getCartTotals()
    const confirmMessage = `Xác nhận thanh toán ${this.formatPrice(totals.total)} cho ${totals.itemCount} khóa học?`

    if (confirm(confirmMessage)) {
      // Simulate checkout process
      const checkoutBtn = document.getElementById("checkout-btn")
      const originalText = checkoutBtn.innerHTML

      checkoutBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Đang xử lý...'
      checkoutBtn.disabled = true

      setTimeout(() => {
        alert("Thanh toán thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.")
        this.items = []
        this.saveCart()
        this.updateCartDisplay()
        this.updateFloatingCart()

        checkoutBtn.innerHTML = originalText
        checkoutBtn.disabled = false
      }, 2000)
    }
  }

  // Load recommended courses
  loadRecommendedCourses() {
    const recommendedContainer = document.getElementById("recommended-courses")
    if (!recommendedContainer) return

    const recommendedCourses = [
      {
        id: "rec1",
        title: "Kỹ năng giao tiếp tiếng Anh cơ bản",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
        currentPrice: "450.000₫",
        originalPrice: "600.000₫",
      },
      {
        id: "rec2",
        title: "Tiếng Anh thương mại cho người đi làm",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
        currentPrice: "520.000₫",
        originalPrice: "700.000₫",
      },
      {
        id: "rec3",
        title: "Luyện thi IELTS cấp tốc",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
        currentPrice: "800.000₫",
        originalPrice: "1.200.000₫",
      },
    ]

    recommendedContainer.innerHTML = recommendedCourses
      .map(
        (course) => `
            <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
                <div class="recommended-course-card">
                    <div class="course-image">
                        <img src="${course.image}" alt="${course.title}" class="img-fluid">
                    </div>
                    <div class="course-content">
                        <h5 class="course-title">${course.title}</h5>
                        <div class="course-price">
                            ${course.currentPrice}
                            <span class="original-price">${course.originalPrice}</span>
                        </div>
                        <button class="btn btn-primary" onclick="cart.addItem({
                            id: '${course.id}',
                            title: '${course.title}',
                            image: '${course.image}',
                            currentPrice: '${course.currentPrice}',
                            originalPrice: '${course.originalPrice}',
                            instructor: 'Giảng viên',
                            duration: '20 giờ',
                            level: 'Trung cấp'
                        })">
                            <i class="bi bi-cart-plus"></i> Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Initialize cart
const cart = new ShoppingCart()

// Global function to add course to cart (for use in other pages)
window.addToCart = (courseData) => {
  cart.addItem(courseData)
}

// Add floating cart to all pages
document.addEventListener("DOMContentLoaded", () => {
  // Only add floating cart if it doesn't exist
  if (!document.getElementById("floating-cart")) {
    const floatingCart = document.createElement("div")
    floatingCart.className = "floating-cart"
    floatingCart.id = "floating-cart"
    floatingCart.innerHTML = `
            <div class="cart-icon">
                <i class="bi bi-bag-fill"></i>
                <span class="cart-badge" id="floating-cart-count">0</span>
            </div>
        `

    // Add styles
    const style = document.createElement("style")
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
                display: none;
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
    document.body.appendChild(floatingCart)

    // Initialize cart for floating icon
    const floatingCartInstance = new ShoppingCart()

    // Add click event
    floatingCart.addEventListener("click", () => {
      window.location.href = "cart.html"
    })
  }
})
