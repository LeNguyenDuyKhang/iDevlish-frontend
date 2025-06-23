// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const successMessage = document.getElementById("success-message")

  // Form validation
  function validateForm(formData) {
    const errors = []

    // Required fields
    if (!formData.get("fullName").trim()) {
      errors.push("Họ tên là bắt buộc")
    }

    if (!formData.get("email").trim()) {
      errors.push("Email là bắt buộc")
    } else if (!isValidEmail(formData.get("email"))) {
      errors.push("Email không hợp lệ")
    }

    if (!formData.get("message").trim()) {
      errors.push("Nội dung tin nhắn là bắt buộc")
    }

    // Phone validation (if provided)
    const phone = formData.get("phone").trim()
    if (phone && !isValidPhone(phone)) {
      errors.push("Số điện thoại không hợp lệ")
    }

    return errors
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation
  function isValidPhone(phone) {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/
    return phoneRegex.test(phone)
  }

  // Show loading state
  function showLoading() {
    const submitBtn = contactForm.querySelector(".btn-submit")
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Đang gửi...'
    submitBtn.disabled = true
    contactForm.classList.add("form-loading")
    return originalText
  }

  // Hide loading state
  function hideLoading(originalText) {
    const submitBtn = contactForm.querySelector(".btn-submit")
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
    contactForm.classList.remove("form-loading")
  }

  // Show success message
  function showSuccess() {
    successMessage.style.display = "block"
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" })

    // Hide after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none"
    }, 5000)
  }

  // Show error messages
  function showErrors(errors) {
    // Remove existing error messages
    document.querySelectorAll(".error-message").forEach((el) => el.remove())

    errors.forEach((error) => {
      const errorDiv = document.createElement("div")
      errorDiv.className = "alert alert-danger error-message mt-2"
      errorDiv.innerHTML = `<i class="bi bi-exclamation-triangle"></i> ${error}`
      contactForm.appendChild(errorDiv)
    })

    // Scroll to first error
    const firstError = document.querySelector(".error-message")
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    // Remove errors after 5 seconds
    setTimeout(() => {
      document.querySelectorAll(".error-message").forEach((el) => el.remove())
    }, 5000)
  }

  // Handle form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const errors = validateForm(formData)

    if (errors.length > 0) {
      showErrors(errors)
      return
    }

    const originalText = showLoading()

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real application, you would send the data to your server
      console.log("Form data:", Object.fromEntries(formData))

      // Show success message
      showSuccess()

      // Reset form
      this.reset()

      // Track form submission (Google Analytics, etc.)
      if (typeof gtag !== "undefined") {
        gtag("event", "form_submit", {
          event_category: "Contact",
          event_label: "Contact Form",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      showErrors(["Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau."])
    } finally {
      hideLoading(originalText)
    }
  })

  // Real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      clearFieldError(this)
    })
  })

  // Validate individual field
  function validateField(field) {
    const value = field.value.trim()
    let isValid = true
    let errorMessage = ""

    // Clear previous errors
    clearFieldError(field)

    // Check required fields
    if (field.hasAttribute("required") && !value) {
      isValid = false
      errorMessage = "Trường này là bắt buộc"
    }

    // Email validation
    if (field.type === "email" && value && !isValidEmail(value)) {
      isValid = false
      errorMessage = "Email không hợp lệ"
    }

    // Phone validation
    if (field.type === "tel" && value && !isValidPhone(value)) {
      isValid = false
      errorMessage = "Số điện thoại không hợp lệ"
    }

    // Show field error
    if (!isValid) {
      showFieldError(field, errorMessage)
    }

    return isValid
  }

  // Show field error
  function showFieldError(field, message) {
    field.classList.add("is-invalid")
    const errorDiv = document.createElement("div")
    errorDiv.className = "invalid-feedback"
    errorDiv.textContent = message
    field.parentNode.appendChild(errorDiv)
  }

  // Clear field error
  function clearFieldError(field) {
    field.classList.remove("is-invalid")
    const errorDiv = field.parentNode.querySelector(".invalid-feedback")
    if (errorDiv) {
      errorDiv.remove()
    }
  }

  // Character counter for message field
  const messageField = document.getElementById("message")
  const maxLength = 1000

  if (messageField) {
    // Create character counter
    const counterDiv = document.createElement("div")
    counterDiv.className = "character-counter text-muted small mt-1"
    counterDiv.textContent = `0/${maxLength} ký tự`
    messageField.parentNode.appendChild(counterDiv)

    // Update counter
    messageField.addEventListener("input", function () {
      const currentLength = this.value.length
      counterDiv.textContent = `${currentLength}/${maxLength} ký tự`

      if (currentLength > maxLength * 0.9) {
        counterDiv.classList.add("text-warning")
      } else {
        counterDiv.classList.remove("text-warning")
      }

      if (currentLength > maxLength) {
        counterDiv.classList.add("text-danger")
        this.value = this.value.substring(0, maxLength)
      } else {
        counterDiv.classList.remove("text-danger")
      }
    })
  }

  // Auto-resize textarea
  function autoResize(textarea) {
    textarea.style.height = "auto"
    textarea.style.height = textarea.scrollHeight + "px"
  }

  if (messageField) {
    messageField.addEventListener("input", function () {
      autoResize(this)
    })
  }

  // Phone number formatting
  const phoneField = document.getElementById("phone")
  if (phoneField) {
    phoneField.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length > 0) {
        if (value.length <= 3) {
          value = value
        } else if (value.length <= 6) {
          value = value.slice(0, 3) + " " + value.slice(3)
        } else if (value.length <= 10) {
          value = value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6)
        } else {
          value = value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6, 10)
        }
      }
      e.target.value = value
    })
  }

  // Map interaction
  const mapOverlay = document.querySelector(".map-overlay")
  const mapIframe = document.querySelector(".map-container iframe")

  if (mapOverlay && mapIframe) {
    // Prevent map interaction when hovering over overlay
    mapOverlay.addEventListener("mouseenter", () => {
      mapIframe.style.pointerEvents = "none"
    })

    mapOverlay.addEventListener("mouseleave", () => {
      mapIframe.style.pointerEvents = "auto"
    })
  }

  // Smooth scroll to form when clicking contact info
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.addEventListener("click", () => {
      const formWrapper = document.querySelector(".contact-form-wrapper")
      if (formWrapper) {
        formWrapper.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })

  // Copy contact info to clipboard
  function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
      // Show copied feedback
      const originalText = element.textContent
      element.textContent = "Đã sao chép!"
      element.style.color = "#28a745"

      setTimeout(() => {
        element.textContent = originalText
        element.style.color = ""
      }, 2000)
    })
  }

  // Add click to copy functionality
  const phoneLink = document.querySelector('a[href^="tel:"]')
  const emailLink = document.querySelector('a[href^="mailto:"]')

  if (phoneLink) {
    phoneLink.addEventListener("click", function (e) {
      e.preventDefault()
      copyToClipboard(this.textContent, this)
    })
  }

  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault()
      copyToClipboard(this.textContent, this)
    })
  }

  // Initialize tooltips for social links
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div")
      tooltip.className = "social-tooltip"
      tooltip.textContent = this.getAttribute("title")
      tooltip.style.cssText = `
                position: absolute;
                bottom: 120%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
            `
      this.style.position = "relative"
      this.appendChild(tooltip)
    })

    link.addEventListener("mouseleave", function () {
      const tooltip = this.querySelector(".social-tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    })
  })
})
