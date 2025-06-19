// Initialize header functionality
function initializeHeader() {
  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header")
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }
  })

  // Active navigation highlighting
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Don't prevent default for dropdown toggles
      if (!this.classList.contains("dropdown-toggle")) {
        navLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })

  // Search functionality
  const searchIcon = document.querySelector(".bi-search")
  if (searchIcon) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Chức năng tìm kiếm - sẽ được triển khai sau")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close all open dropdowns
      const openDropdowns = document.querySelectorAll(".dropdown-menu.show")
      openDropdowns.forEach((menu) => {
        const dropdown = bootstrap.Dropdown.getInstance(menu.previousElementSibling)
        if (dropdown) {
          dropdown.hide()
        }
      })
    }
  })
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeHeader()
})
