// ===== AUTH JAVASCRIPT =====
class AuthManager {
  constructor() {
    this.init()
  }

  init() {
    this.initAOS()
    this.initFormValidation()
    this.initPasswordToggle()
    this.initPasswordStrength()
    this.initSocialLogin()
    this.bindEvents()
  }

  // Initialize AOS animations
  initAOS() {
    const AOS = window.AOS // Declare AOS variable
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: true,
        offset: 100,
      })
    }
  }

  // Initialize form validation
  initFormValidation() {
    // Register form validation
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleRegisterSubmit(e)
      })
    }

    // Login form validation
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleLoginSubmit(e)
      })
    }

    // Forgot password form
    const forgotPasswordForm = document.getElementById("forgotPasswordForm")
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleForgotPasswordSubmit(e)
      })
    }
  }

  // Initialize password toggle functionality
  initPasswordToggle() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".toggle-password")) {
        const button = e.target.closest(".toggle-password")
        const targetId = button.getAttribute("data-target")
        const passwordInput = document.getElementById(targetId)
        const icon = button.querySelector("i")

        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          icon.className = "bi bi-eye-slash"
        } else {
          passwordInput.type = "password"
          icon.className = "bi bi-eye"
        }
      }
    })
  }

  // Initialize password strength indicator
  initPasswordStrength() {
    const passwordInput = document.getElementById("password")
    if (passwordInput) {
      passwordInput.addEventListener("input", (e) => {
        this.updatePasswordStrength(e.target.value)
      })
    }
  }

  // Update password strength indicator
  updatePasswordStrength(password) {
    const strengthContainer = document.querySelector(".password-strength")
    const strengthFill = document.querySelector(".strength-fill")
    const strengthText = document.querySelector(".strength-text")

    if (!strengthContainer || !strengthFill || !strengthText) return

    const strength = this.calculatePasswordStrength(password)

    // Remove all strength classes
    strengthContainer.classList.remove("strength-weak", "strength-fair", "strength-good", "strength-strong")

    // Add appropriate class and update text
    switch (strength.level) {
      case 1:
        strengthContainer.classList.add("strength-weak")
        strengthText.textContent = "Mật khẩu yếu"
        break
      case 2:
        strengthContainer.classList.add("strength-fair")
        strengthText.textContent = "Mật khẩu trung bình"
        break
      case 3:
        strengthContainer.classList.add("strength-good")
        strengthText.textContent = "Mật khẩu tốt"
        break
      case 4:
        strengthContainer.classList.add("strength-strong")
        strengthText.textContent = "Mật khẩu mạnh"
        break
      default:
        strengthText.textContent = "Độ mạnh mật khẩu"
    }
  }

  // Calculate password strength
  calculatePasswordStrength(password) {
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
    }

    // Calculate score
    Object.values(checks).forEach((check) => {
      if (check) score++
    })

    // Bonus for length
    if (password.length >= 12) score++

    return {
      score: score,
      level: Math.min(Math.floor(score / 1.5), 4),
      checks: checks,
    }
  }

  // Initialize social login
  initSocialLogin() {
    // Social login buttons are handled by onclick attributes in HTML
    // This is where you would integrate with actual social login SDKs
  }

  // Bind additional events
  bindEvents() {
    // Real-time validation
    document.addEventListener("input", (e) => {
      if (e.target.matches("input[required]")) {
        this.validateField(e.target)
      }
    })

    // Confirm password validation
    const confirmPasswordInput = document.getElementById("confirmPassword")
    const passwordInput = document.getElementById("password")

    if (confirmPasswordInput && passwordInput) {
      confirmPasswordInput.addEventListener("input", () => {
        this.validatePasswordConfirmation(passwordInput, confirmPasswordInput)
      })
    }
  }

  // Validate individual field
  validateField(field) {
    const isValid = field.checkValidity()

    if (isValid) {
      field.classList.remove("is-invalid")
      field.classList.add("is-valid")
    } else {
      field.classList.remove("is-valid")
      field.classList.add("is-invalid")
    }

    return isValid
  }

  // Validate password confirmation
  validatePasswordConfirmation(passwordField, confirmField) {
    const isMatch = passwordField.value === confirmField.value

    if (confirmField.value === "") {
      confirmField.classList.remove("is-valid", "is-invalid")
      return
    }

    if (isMatch) {
      confirmField.classList.remove("is-invalid")
      confirmField.classList.add("is-valid")
      confirmField.setCustomValidity("")
    } else {
      confirmField.classList.remove("is-valid")
      confirmField.classList.add("is-invalid")
      confirmField.setCustomValidity("Mật khẩu xác nhận không khớp")
    }

    return isMatch
  }

  // Handle register form submission
  async handleRegisterSubmit(e) {
    const form = e.target
    const formData = new FormData(form)
    const submitBtn = form.querySelector(".auth-submit-btn")

    // Validate form
    if (!form.checkValidity()) {
      form.classList.add("was-validated")
      return
    }

    // Show loading state
    this.setLoadingState(submitBtn, true)

    try {
      // Simulate API call
      await this.simulateApiCall(2000)

      // Show success modal
      const bootstrap = window.bootstrap // Declare bootstrap variable
      const successModal = new bootstrap.Modal(document.getElementById("successModal"))
      successModal.show()

      // Reset form
      form.reset()
      form.classList.remove("was-validated")
    } catch (error) {
      this.showError("Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      this.setLoadingState(submitBtn, false)
    }
  }

  // Handle login form submission
  async handleLoginSubmit(e) {
    const form = e.target
    const formData = new FormData(form)
    const submitBtn = form.querySelector(".auth-submit-btn")

    // Validate form
    if (!form.checkValidity()) {
      form.classList.add("was-validated")
      return
    }

    // Show loading state
    this.setLoadingState(submitBtn, true)

    try {
      // Simulate API call
      await this.simulateApiCall(1500)

      // Redirect to dashboard or home page
      this.showSuccess("Đăng nhập thành công!")
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1000)
    } catch (error) {
      this.showError("Email hoặc mật khẩu không chính xác.")
    } finally {
      this.setLoadingState(submitBtn, false)
    }
  }

  // Handle forgot password form submission
  async handleForgotPasswordSubmit(e) {
    const form = e.target
    const email = form.querySelector("#resetEmail").value

    if (!email) {
      this.showError("Vui lòng nhập email.")
      return
    }

    try {
      // Simulate API call
      await this.simulateApiCall(1000)

      this.showSuccess("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.")

      // Close modal
      const bootstrap = window.bootstrap // Declare bootstrap variable
      const modal = bootstrap.Modal.getInstance(document.getElementById("forgotPasswordModal"))
      modal.hide()
    } catch (error) {
      this.showError("Có lỗi xảy ra. Vui lòng thử lại.")
    }
  }

  // Set loading state for button
  setLoadingState(button, isLoading) {
    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (isLoading) {
      btnText.classList.add("d-none")
      btnLoading.classList.remove("d-none")
      button.disabled = true
    } else {
      btnText.classList.remove("d-none")
      btnLoading.classList.add("d-none")
      button.disabled = false
    }
  }

  // Show success message
  showSuccess(message) {
    this.showToast(message, "success")
  }

  // Show error message
  showError(message) {
    this.showToast(message, "error")
  }

  // Show toast notification
  showToast(message, type = "info") {
    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast align-items-center text-white bg-${type === "success" ? "success" : "danger"} border-0`
    toast.setAttribute("role", "alert")
    toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-${type === "success" ? "check-circle" : "exclamation-triangle"} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `

    // Add to page
    let toastContainer = document.querySelector(".toast-container")
    if (!toastContainer) {
      toastContainer = document.createElement("div")
      toastContainer.className = "toast-container position-fixed top-0 end-0 p-3"
      document.body.appendChild(toastContainer)
    }

    toastContainer.appendChild(toast)

    // Show toast
    const bootstrap = window.bootstrap // Declare bootstrap variable
    const bsToast = new bootstrap.Toast(toast)
    bsToast.show()

    // Remove after hiding
    toast.addEventListener("hidden.bs.toast", () => {
      toast.remove()
    })
  }

  // Simulate API call
  simulateApiCall(delay = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error("API Error"))
        }
      }, delay)
    })
  }
}

// Social login functions (to be implemented with actual SDKs)
function loginWithGoogle() {
  console.log("Google login clicked")
  // Implement Google OAuth
  alert("Tính năng đăng nhập Google sẽ được triển khai sớm!")
}

function loginWithFacebook() {
  console.log("Facebook login clicked")
  // Implement Facebook Login
  alert("Tính năng đăng nhập Facebook sẽ được triển khai sớm!")
}

function loginWithApple() {
  console.log("Apple login clicked")
  // Implement Apple Sign In
  alert("Tính năng đăng nhập Apple sẽ được triển khai sớm!")
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AuthManager()
})

// Export for use in other scripts
window.AuthManager = AuthManager
