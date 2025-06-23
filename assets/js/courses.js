// Course Management System
class CourseManager {
  constructor() {
    this.courses = [];
    this.filteredCourses = [];
    this.currentPage = 1;
    this.coursesPerPage = 9;
    this.currentCategory = this.getCategoryFromURL();
    this.searchKeyword = this.getSearchKeywordFromURL();

    this.init();
  }

  // Sample course data for different categories
  getCourseData() {
    return {
      "giao-tiep": {
        title: "Giao tiếp",
        subtitle: "Nâng cao kỹ năng giao tiếp tiếng Anh hiệu quả",
        courses: [
          {
            id: 1,
            title: "Giao tiếp tiếng Anh cơ bản cho người mới bắt đầu",
            instructor: "John Smith",
            category: "Giao tiếp",
            level: "beginner",
            duration: 15,
            rating: 4.8,
            ratingCount: 234,
            currentPrice: 450000,
            originalPrice: 650000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Phổ biến",
            description:
              "Khóa học giúp bạn nắm vững các kỹ năng giao tiếp tiếng Anh cơ bản trong cuộc sống hàng ngày.",
            curriculum: [
              "Giới thiệu bản thân và người khác",
              "Hỏi đường và chỉ đường",
              "Mua sắm và thanh toán",
              "Đặt phòng khách sạn",
              "Gọi món tại nhà hàng"
            ],
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            title: "Giao tiếp tiếng Anh trong môi trường công sở",
            instructor: "Sarah Johnson",
            category: "Giao tiếp",
            level: "intermediate",
            duration: 25,
            rating: 4.9,
            ratingCount: 189,
            currentPrice: 750000,
            originalPrice: 950000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Mới",
            description:
              "Phát triển kỹ năng giao tiếp chuyên nghiệp trong môi trường làm việc quốc tế.",
            curriculum: [
              "Thuyết trình và báo cáo",
              "Họp và thảo luận nhóm",
              "Email và thư từ công việc",
              "Đàm phán và thương lượng",
              "Phỏng vấn xin việc"
            ],
            createdAt: "2024-01-20"
          },
          {
            id: 3,
            title: "Luyện phát âm tiếng Anh chuẩn quốc tế",
            instructor: "Michael Brown",
            category: "Giao tiếp",
            level: "intermediate",
            duration: 20,
            rating: 4.7,
            ratingCount: 156,
            currentPrice: 550000,
            originalPrice: 0,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "",
            description:
              "Cải thiện phát âm và ngữ điệu tiếng Anh để giao tiếp tự tin và chuyên nghiệp.",
            curriculum: [
              "Các âm cơ bản trong tiếng Anh",
              "Ngữ điệu và nhấn âm",
              "Liên kết âm trong câu",
              "Phát âm từ khó",
              "Thực hành với native speaker"
            ],
            createdAt: "2024-01-10"
          }
        ]
      },
      "kinh-doanh": {
        title: "Kinh doanh",
        subtitle: "Phát triển kỹ năng kinh doanh và quản lý hiệu quả",
        courses: [
          {
            id: 4,
            title: "Khởi nghiệp và phát triển doanh nghiệp",
            instructor: "David Wilson",
            category: "Kinh doanh",
            level: "beginner",
            duration: 30,
            rating: 4.6,
            ratingCount: 298,
            currentPrice: 890000,
            originalPrice: 1200000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Bán chạy",
            description:
              "Hướng dẫn từ A-Z về cách khởi nghiệp và phát triển doanh nghiệp bền vững.",
            curriculum: [
              "Ý tưởng kinh doanh và nghiên cứu thị trường",
              "Lập kế hoạch kinh doanh",
              "Tìm kiếm vốn đầu tư",
              "Marketing và bán hàng",
              "Quản lý tài chính doanh nghiệp"
            ],
            createdAt: "2024-01-12"
          },
          {
            id: 5,
            title: "Quản lý nhân sự hiệu quả",
            instructor: "Lisa Chen",
            category: "Kinh doanh",
            level: "intermediate",
            duration: 22,
            rating: 4.8,
            ratingCount: 167,
            currentPrice: 650000,
            originalPrice: 850000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "",
            description:
              "Nắm vững các kỹ năng quản lý nhân sự từ tuyển dụng đến phát triển nhân tài.",
            curriculum: [
              "Tuyển dụng và lựa chọn nhân tài",
              "Đào tạo và phát triển nhân viên",
              "Đánh giá hiệu suất làm việc",
              "Xây dựng văn hóa doanh nghiệp",
              "Giải quyết xung đột"
            ],
            createdAt: "2024-01-08"
          }
        ]
      },
      marketing: {
        title: "Marketing & Truyền thông",
        subtitle: "Chiến lược marketing hiện đại và truyền thông hiệu quả",
        courses: [
          {
            id: 6,
            title: "Digital Marketing từ cơ bản đến nâng cao",
            instructor: "Emma Davis",
            category: "Marketing",
            level: "beginner",
            duration: 35,
            rating: 4.9,
            ratingCount: 445,
            currentPrice: 990000,
            originalPrice: 1400000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Phổ biến",
            description:
              "Khóa học toàn diện về Digital Marketing với các chiến lược và công cụ mới nhất.",
            curriculum: [
              "SEO và SEM",
              "Social Media Marketing",
              "Content Marketing",
              "Email Marketing",
              "Analytics và đo lường hiệu quả"
            ],
            createdAt: "2024-01-18"
          },
          {
            id: 7,
            title: "Xây dựng thương hiệu cá nhân",
            instructor: "Robert Taylor",
            category: "Marketing",
            level: "intermediate",
            duration: 18,
            rating: 4.7,
            ratingCount: 223,
            currentPrice: 580000,
            originalPrice: 750000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Mới",
            description:
              "Học cách xây dựng và phát triển thương hiệu cá nhân mạnh mẽ trên các nền tảng số.",
            curriculum: [
              "Định vị thương hiệu cá nhân",
              "Xây dựng profile chuyên nghiệp",
              "Content strategy cho personal brand",
              "Networking và mối quan hệ",
              "Monetize personal brand"
            ],
            createdAt: "2024-01-22"
          }
        ]
      },
      "thiet-ke": {
        title: "Thiết kế đồ họa",
        subtitle: "Sáng tạo và thiết kế chuyên nghiệp với các công cụ hiện đại",
        courses: [
          {
            id: 8,
            title: "Adobe Photoshop từ cơ bản đến chuyên nghiệp",
            instructor: "Alex Rodriguez",
            category: "Thiết kế",
            level: "beginner",
            duration: 28,
            rating: 4.8,
            ratingCount: 356,
            currentPrice: 720000,
            originalPrice: 950000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Bán chạy",
            description:
              "Nắm vững Adobe Photoshop để tạo ra các thiết kế đồ họa chuyên nghiệp.",
            curriculum: [
              "Giao diện và công cụ cơ bản",
              "Xử lý và chỉnh sửa ảnh",
              "Tạo hiệu ứng và filter",
              "Thiết kế poster và banner",
              "Dự án thực tế"
            ],
            createdAt: "2024-01-14"
          },
          {
            id: 9,
            title: "UI/UX Design cho người mới bắt đầu",
            instructor: "Sophie Kim",
            category: "Thiết kế",
            level: "beginner",
            duration: 32,
            rating: 4.9,
            ratingCount: 278,
            currentPrice: 850000,
            originalPrice: 1100000,
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qQuh8cSypO2rhDTRLsPKLhrlSOf5z0.png",
            badge: "Phổ biến",
            description:
              "Học thiết kế giao diện người dùng và trải nghiệm người dùng từ cơ bản đến nâng cao.",
            curriculum: [
              "Nguyên lý thiết kế UI/UX",
              "Research và phân tích user",
              "Wireframe và Prototype",
              "Figma và Adobe XD",
              "Testing và tối ưu hóa"
            ],
            createdAt: "2024-01-16"
          }
        ]
      }
    };
  }

  // Get category from URL parameter
  getCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const validCategories = Object.keys(this.getCourseData());
    return category && validCategories.includes(category) ? category : "giao-tiep";
  }

  // Get search keyword from URL parameter
  getSearchKeywordFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("q")?.trim().toLowerCase() || "";
  }

  // Initialize the course manager
  init() {
    this.loadCourseData();
    this.updatePageContent();
    this.bindEvents();
    this.filterAndDisplayCourses();

    // Initialize AOS
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true
      });
    }
  }

  // Load course data based on current category or search
  loadCourseData() {
    const courseData = this.getCourseData();
    if (this.searchKeyword) {
      // If searching, load all courses from all categories
      this.courses = [];
      Object.values(courseData).forEach((category) => {
        this.courses = this.courses.concat(category.courses);
      });
      this.categoryInfo = {
        title: "Kết quả tìm kiếm",
        subtitle: `Kết quả cho từ khóa: "${this.searchKeyword}"`
      };
    } else {
      // Load courses for the current category
      const categoryData = courseData[this.currentCategory] || courseData["giao-tiep"];
      this.courses = categoryData.courses;
      this.categoryInfo = {
        title: categoryData.title,
        subtitle: categoryData.subtitle
      };
    }
  }

  // Update page content based on category or search
  updatePageContent() {
    document.getElementById("page-title").textContent = this.categoryInfo.title;
    document.getElementById("page-subtitle").textContent = this.categoryInfo.subtitle;
    document.getElementById("breadcrumb-current").textContent = this.categoryInfo.title;
    document.title = `${this.categoryInfo.title} - Ant Ngoại Ngữ`;

    // Update search input field with keyword if present
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput && this.searchKeyword) {
      searchInput.value = this.searchKeyword;
    }
  }

  // Bind event listeners
  bindEvents() {
    // Filter events
    document
      .getElementById("price-filter")
      ?.addEventListener("change", () => this.filterAndDisplayCourses());
    document
      .getElementById("duration-filter")
      ?.addEventListener("change", () => this.filterAndDisplayCourses());
    document
      .getElementById("level-filter")
      ?.addEventListener("change", () => this.filterAndDisplayCourses());
    document
      .getElementById("rating-filter")
      ?.addEventListener("change", () => this.filterAndDisplayCourses());

    // Sort events
    document.querySelectorAll('input[name="sort"]').forEach((radio) => {
      radio.addEventListener("change", () => this.filterAndDisplayCourses());
    });

    // Clear filters
    document
      .getElementById("clear-filters")
      ?.addEventListener("click", () => this.clearFilters());

    // Course card events (delegated)
    document.getElementById("courses-grid")?.addEventListener("click", (e) => {
      if (e.target.closest(".btn-view-details")) {
        const courseId = Number.parseInt(
          e.target.closest(".course-card").dataset.courseId
        );
        this.showCourseDetails(courseId);
      } else if (e.target.closest(".btn-enroll")) {
        const courseId = Number.parseInt(
          e.target.closest(".course-card").dataset.courseId
        );
        this.addToCart(courseId);
      }
    });

    // Modal enroll button
    document.getElementById("enrollBtn")?.addEventListener("click", () => {
      const courseId = Number.parseInt(
        document.getElementById("courseModal").dataset.courseId
      );
      this.addToCart(courseId);
    });
  }

  // Filter and display courses
  filterAndDisplayCourses() {
    this.showLoading();

    // Simulate API delay
    setTimeout(() => {
      this.applyFilters();
      this.applySorting();
      this.displayCourses();
      this.updateResultsCount();
      this.hideLoading();
    }, 500);
  }

  // Apply filters
  applyFilters() {
    let filtered = this.courses;

    // Apply search keyword filter if present
    if (this.searchKeyword) {
      filtered =(filtered.filter((course) =>
        course.title.toLowerCase().includes(this.searchKeyword)
      ));
    }

    // Apply other filters
    const priceFilter = document.getElementById("price-filter")?.value || "";
    const durationFilter = document.getElementById("duration-filter")?.value || "";
    const levelFilter = document.getElementById("level-filter")?.value || "";
    const ratingFilter = document.getElementById("rating-filter")?.value || "";

    this.filteredCourses = filtered.filter((course) => {
      // Price filter
      if (priceFilter) {
        const price = course.currentPrice;
        switch (priceFilter) {
          case "free":
            if (price > 0) return false;
            break;
          case "under-500k":
            if (price >= 500000) return false;
            break;
          case "500k-1m":
            if (price < 500000 || price > 1000000) return false;
            break;
          case "over-1m":
            if (price <= 1000000) return false;
            break;
        }
      }

      // Duration filter
      if (durationFilter) {
        const duration = course.duration;
        switch (durationFilter) {
          case "short":
            if (duration >= 10) return false;
            break;
          case "medium":
            if (duration < 10 || duration > 30) return false;
            break;
          case "long":
            if (duration <= 30) return false;
            break;
        }
      }

      // Level filter
      if (levelFilter && course.level !== levelFilter) {
        return false;
      }

      // Rating filter
      if (ratingFilter) {
        const minRating = Number.parseInt(ratingFilter);
        if (course.rating < minRating) return false;
      }

      return true;
    });
  }

  // Apply sorting
  applySorting() {
    const sortBy = document.querySelector('input[name="sort"]:checked')?.value || "newest";

    this.filteredCourses.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "price-low":
          return a.currentPrice - b.currentPrice;
        case "price-high":
          return b.currentPrice - a.currentPrice;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  // Display courses
  displayCourses() {
    const coursesGrid = document.getElementById("courses-grid");
    const noResultsState = document.getElementById("no-results-state");

    if (!coursesGrid || !noResultsState) return;

    if (this.filteredCourses.length === 0) {
      coursesGrid.innerHTML = '<div class="col-12 text-center py-5"><div class="alert alert-warning">Không tìm thấy khóa học phù hợp.</div></div>';
      noResultsState.style.display = "block";
      return;
    }

    noResultsState.style.display = "none";

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPage;
    const coursesToShow = this.filteredCourses.slice(startIndex, endIndex);

    // Generate course cards
    coursesGrid.innerHTML = coursesToShow
      .map((course) => this.generateCourseCard(course))
      .join("");

    // Generate pagination
    this.generatePagination();

    // Reinitialize AOS for new elements
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }

  // Generate course card HTML
  generateCourseCard(course) {
    const discount =
      course.originalPrice > 0
        ? Math.round((1 - course.currentPrice / course.originalPrice) * 100)
        : 0;

    const stars =
      "★".repeat(Math.floor(course.rating)) +
      (course.rating % 1 >= 0.5 ? "☆" : "") +
      "☆".repeat(5 - Math.ceil(course.rating));

    return `
      <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
        <div class="course-card" data-course-id="${course.id}">
          <div class="course-image">
            <img src="${course.image}" alt="${course.title}" class="img-fluid">
            ${course.badge ? `<div class="course-badge">${course.badge}</div>` : ""}
          </div>
          <div class="course-content">
            <div class="course-category">${course.category}</div>
            <h5 class="course-title">${course.title}</h5>
            <div class="course-instructor">
              <i class="bi bi-person"></i> ${course.instructor}
            </div>
            <div class="course-meta">
              <span><i class="bi bi-clock"></i> ${course.duration} giờ</span>
              <span><i class="bi bi-bar-chart"></i> ${this.getLevelText(course.level)}</span>
            </div>
            <div class="course-rating">
              <div class="stars">${stars}</div>
              <span class="rating-count">${course.rating} (${course.ratingCount})</span>
            </div>
            <div class="course-price">
              <div class="price-info">
                <span class="current-price">${this.formatPrice(course.currentPrice)}</span>
                ${
                  course.originalPrice > 0
                    ? `
                    <span class="original-price">${this.formatPrice(course.originalPrice)}</span>
                    <span class="discount">-${discount}%</span>
                  `
                    : ""
                }
              </div>
            </div>
            <div class="course-actions mt-3">
              <button class="btn btn-view-details">
                <i class="bi bi-eye"></i> Xem chi tiết
              </button>
              <button class="btn btn-enroll">
                <i class="bi bi-cart-plus"></i> Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Generate pagination
  generatePagination() {
    const totalPages = Math.ceil(this.filteredCourses.length / this.coursesPerPage);
    const pagination = document.getElementById("pagination");

    if (!pagination || totalPages <= 1) {
      if (pagination) pagination.innerHTML = "";
      return;
    }

    let paginationHTML = `
      <li class="page-item ${this.currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" data-page="${this.currentPage - 1}">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 2 && i <= this.currentPage + 2)
      ) {
        paginationHTML += `
          <li class="page-item ${i === this.currentPage ? "active" : ""}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `;
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    paginationHTML += `
      <li class="page-item ${this.currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" data-page="${this.currentPage + 1}">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    `;

    pagination.innerHTML = paginationHTML;

    // Bind pagination events
    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        e.target.closest(".page-link") &&
        !e.target.closest(".page-item").classList.contains("disabled")
      ) {
        const page = Number.parseInt(e.target.closest(".page-link").dataset.page);
        if (page && page !== this.currentPage) {
          this.currentPage = page;
          this.displayCourses();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  }

  // Show course details in modal
  showCourseDetails(courseId) {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById("courseModal");
    const modalBody = document.getElementById("courseModalBody");

    modal.dataset.courseId = courseId;
    document.getElementById("courseModalLabel").textContent = course.title;

    const stars =
      "★".repeat(Math.floor(course.rating)) +
      (course.rating % 1 >= 0.5 ? "☆" : "") +
      "☆".repeat(5 - Math.ceil(course.rating));

    modalBody.innerHTML = `
      <img src="${course.image}" alt="${course.title}" class="course-detail-image">
      <div class="course-detail-meta">
        <div class="meta-item">
          <i class="bi bi-person"></i>
          <span><strong>Giảng viên:</strong> ${course.instructor}</span>
        </div>
        <div class="meta-item">
          <i class="bi bi-clock"></i>
          <span><strong>Thời lượng:</strong> ${course.duration} giờ</span>
        </div>
        <div class="meta-item">
          <i class="bi bi-bar-chart"></i>
          <span><strong>Trình độ:</strong> ${this.getLevelText(course.level)}</span>
        </div>
        <div class="meta-item">
          <i class="bi bi-star-fill"></i>
          <span><strong>Đánh giá:</strong> ${course.rating} (${course.ratingCount} đánh giá)</span>
        </div>
      </div>
      <div class="course-description">
        <h6>Mô tả khóa học:</h6>
        <p>${course.description}</p>
      </div>
      <div class="course-curriculum">
        <h6>Nội dung khóa học:</h6>
        ${course.curriculum
          .map(
            (item) => `
            <div class="curriculum-item">
              <i class="bi bi-check-circle"></i>
              <span>${item}</span>
            </div>
          `
          )
          .join("")}
      </div>
    `;

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }

  // Add course to cart
  addToCart(courseId) {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return;

    // Close modal if open
    const modal = bootstrap.Modal.getInstance(document.getElementById("courseModal"));
    if (modal) modal.hide();

    // Prepare course data for cart
    const courseData = {
      id: course.id.toString(),
      title: course.title,
      image: course.image,
      currentPrice: this.formatPrice(course.currentPrice),
      originalPrice: course.originalPrice > 0 ? this.formatPrice(course.originalPrice) : "",
      instructor: course.instructor,
      duration: `${course.duration} giờ`,
      level: this.getLevelText(course.level),
      category: course.category,
      rating: course.rating,
      ratingCount: course.ratingCount
    };

    // Try to use global cart function first
    if (typeof window.addToCart === "function") {
      window.addToCart(courseData);
    } else {
      // Fallback: Save directly to localStorage
      this.saveToCartDirectly(courseData);
    }
  }

  // Save directly to cart
  saveToCartDirectly(courseData) {
    try {
      const cart = JSON.parse(localStorage.getItem("antCart") || "[]");
      const existingItem = cart.find((item) => item.id === courseData.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...courseData,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }

      localStorage.setItem("antCart", JSON.stringify(cart));
      this.showSuccessNotification(courseData.title);
      this.updateFloatingCartCount();
    } catch (error) {
      console.error("Error saving to cart:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại!");
    }
  }

  // Show success notification
  showSuccessNotification(courseTitle) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi bi-check-circle-fill"></i>
        <span>Đã thêm "${courseTitle}" vào giỏ hàng</span>
        <button onclick="window.location.href='cart.html'" class="btn btn-sm btn-light ms-2">
          Xem giỏ hàng
        </button>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: rgb(40, 104, 167);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 350px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // Update floating cart count
  updateFloatingCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem("antCart") || "[]");
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

      const floatingCartCount = document.getElementById("floating-cart-count");
      const cartBadge = document.querySelector(".cart-badge");

      if (floatingCartCount) {
        floatingCartCount.textContent = totalItems;
      }

      if (cartBadge) {
        if (totalItems > 0) {
          cartBadge.classList.remove("hidden");
          cartBadge.style.display = "flex";
        } else {
          cartBadge.classList.add("hidden");
          cartBadge.style.display = "none";
        }
      }

      const floatingCart = document.getElementById("floating-cart");
      if (floatingCart) {
        floatingCart.classList.add("cart-update");
        setTimeout(() => {
          floatingCart.classList.remove("cart-update");
        }, 300);
      }
    } catch (error) {
      console.error("Error updating floating cart:", error);
    }
  }

  // Clear all filters
  clearFilters() {
    document.getElementById("price-filter").value = "";
    document.getElementById("duration-filter").value = "";
    document.getElementById("level-filter").value = "";
    document.getElementById("rating-filter").value = "";
    document.getElementById("sort-newest").checked = true;

    this.currentPage = 1;
    this.searchKeyword = "";
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) searchInput.value = "";

    // Update URL to remove search query
    const url = new URL(window.location);
    url.searchParams.delete("q");
    window.history.pushState({}, "", url);

    this.loadCourseData();
    this.updatePageContent();
    this.filterAndDisplayCourses();
  }

  // Update results count
  updateResultsCount() {
    const count = this.filteredCourses.length;
    const resultsCount = document.getElementById("results-count");
    if (resultsCount) {
      resultsCount.textContent = `Hiển thị ${count} khóa học`;
    }
  }

  // Show loading state
  showLoading() {
    const loadingState = document.getElementById("loading-state");
    const coursesGrid = document.getElementById("courses-grid");
    const noResultsState = document.getElementById("no-results-state");

    if (loadingState) loadingState.style.display = "block";
    if (coursesGrid) coursesGrid.style.display = "none";
    if (noResultsState) noResultsState.style.display = "none";
  }

  // Hide loading state
  hideLoading() {
    const loadingState = document.getElementById("loading-state");
    const coursesGrid = document.getElementById("courses-grid");

    if (loadingState) loadingState.style.display = "none";
    if (coursesGrid) coursesGrid.style.display = "flex";
  }

  // Helper methods
  getLevelText(level) {
    const levels = {
      beginner: "Cơ bản",
      intermediate: "Trung cấp",
      advanced: "Nâng cao"
    };
    return levels[level] || level;
  }

  formatPrice(price) {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    }).format(price);
  }
}

// Initialize course manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const courseManager = new CourseManager();

  // Handle search form submission
  const searchForm = document.querySelector('#searchModal form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const keyword = searchForm.querySelector('input[name="q"]').value.trim();
      if (!keyword) return;

      // Update URL with search query and reset category
      window.location.href = `courses.html?q=${encodeURIComponent(keyword)}`;
    });
  }
});

// Handle category navigation
function navigateToCategory(category) {
  window.location.href = `courses.html?category=${category}`;
}

// Export for use in other scripts
window.CourseManager = CourseManager;
window.navigateToCategory = navigateToCategory;