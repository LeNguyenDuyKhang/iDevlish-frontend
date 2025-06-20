// News Detail JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get article ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const articleId = urlParams.get("id") || "1"

  // Article data
  const articles = {
    1: {
      title: "Làm sao để tự tin thuyết trình, hợp hành bằng tiếng Anh?",
      author: "NGUYỄN CHÁNH BẢO TRUNG",
      date: "13/04/2018",
      content: `
                <div class="article-intro">
                    <p>Dù có thể tự tin giao tiếp với người nước ngoài, nhưng nhiều người đi làm vẫn cảm thấy "tim đập chân run" mỗi lần phải thuyết trình hay hợp hành bằng tiếng Anh với sếp hoặc đối tác nước ngoài.</p>
                    <p><strong>Cùng tìm hiểu nguyên nhân và giải pháp!</strong></p>
                </div>
                <h3>Vì sao bạn chưa tự tin thuyết trình hay hợp hành bằng tiếng Anh?</h3>
                <div class="article-image my-4">
                    <img src="assets/img/news.png" alt="Làm sao để tự tin thuyết trình, hợp hành bằng tiếng Anh?" class="img-fluid rounded">
                </div>
                <p>Dù đã bỏ ra khá nhiều thời gian và tiền bạc, cũng như công sức học giao tiếp tiếng Anh, nhiều người vẫn mất tự tin và thất bại khi phải trình bày và hợp hành bằng tiếng Anh với đối tác.</p>
            `,
    },
    2: {
      title: "7 từ tiếng Anh thường bị viết sai theo từ điển Oxford",
      author: "NGUYỄN CHÁNH BẢO TRUNG",
      date: "13/04/2018",
      content: `
                <div class="article-intro">
                    <p>Đối với đa số người học tiếng Anh và cả người bản ngữ, phần chính tả khi viết tiếng Anh đôi lúc cũng khá rắc rối.</p>
                </div>
                <h3>Những từ thường bị viết sai</h3>
                <p>Bên cạnh một vài quy tắc chung, cũng sẽ có những từ có đặc điểm riêng hoặc đi ngược lại với nguyên tắc thông thường.</p>
            `,
    },
    3: {
      title: "5 lợi ích của việc học tiếng Anh cùng người bản xứ",
      author: "NGUYỄN CHÁNH BẢO TRUNG",
      date: "13/04/2018",
      content: `
                <div class="article-intro">
                    <p>Trong quá trình học tiếng Anh, muốn giỏi kỹ năng đọc hoặc viết, bạn chỉ cần có những nguồn tài liệu phong phú và đầy tin cậy cùng sự kiên nhẫn và chăm chỉ.</p>
                </div>
                <h3>Lợi ích của việc học với người bản xứ</h3>
                <p>Tuy nhiên, để hoàn thiện khả năng nghe-nói cùng những kỹ năng nâng cao khác như phát âm, cách sử dụng từ, phần ngữ điệu... thì việc học cùng người bản xứ sẽ mang lại hiệu quả tốt nhất.</p>
            `,
    },
    4: {
      title: "Tấm man tiếng Anh cho bác cha mẹ",
      author: "NGUYỄN CHÁNH BẢO TRUNG",
      date: "13/04/2018",
      content: `
                <div class="article-intro">
                    <p>Trở thành cha mẹ là một cột mốc rất quan trọng trong cuộc đời con người.</p>
                </div>
                <h3>Từ vựng dành cho cha mẹ</h3>
                <p>Trong tiếng Anh, có một số từ vựng đặc biệt dành riêng cho những bậc cha mẹ mới. Hãy cùng tìm hiểu những từ vựng thú vị này nhé!</p>
            `,
    },
    5: {
      title: "Kỹ năng giao tiếp tiếng Anh trong môi trường công sở",
      author: "NGUYỄN CHÁNH BẢO TRUNG",
      date: "12/04/2018",
      content: `
                <div class="article-intro">
                    <p>Trong môi trường công sở hiện đại, khả năng giao tiếp tiếng Anh hiệu quả là một yếu tố quan trọng quyết định sự thành công trong công việc.</p>
                </div>
                <h3>Kỹ năng cần thiết</h3>
                <p>Bài viết này sẽ chia sẻ những kỹ năng cần thiết để giao tiếp tự tin trong môi trường làm việc quốc tế.</p>
            `,
    },
  }

  // Load article content
  const article = articles[articleId]
  if (article) {
    document.getElementById("article-title").textContent = article.title
    document.getElementById("article-author").textContent = article.author
    document.getElementById("article-date").textContent = article.date
    document.getElementById("breadcrumb-title").textContent = article.title

    // Update article body content
    const articleBody = document.querySelector(".article-body")
    if (articleBody) {
      articleBody.innerHTML = article.content
    }
  }

  // Comment system
  const comments = [
    {
      id: 1,
      name: "ád",
      email: "user@example.com",
      content: "ád",
      date: "20/06/2025",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TIIGTZ6tjXMQv3niWjeGDW6tuccLJi.png",
    },
  ]

  // Update comments count
  function updateCommentsCount() {
    document.getElementById("comments-count").textContent = comments.length
  }

  // Render comments
  function renderComments() {
    const commentsList = document.getElementById("comments-list")
    commentsList.innerHTML = ""

    comments.forEach((comment) => {
      const commentElement = document.createElement("div")
      commentElement.className = "comment-item"
      commentElement.innerHTML = `
                <div class="comment-avatar">
                    <img src="${comment.avatar}" alt="User Avatar" class="avatar-img">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h6 class="comment-author">${comment.name}</h6>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-text">
                        <p>${comment.content}</p>
                    </div>
                </div>
            `
      commentsList.appendChild(commentElement)
    })

    updateCommentsCount()
  }

  // Handle comment form submission
  document.getElementById("comment-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const name = document.getElementById("comment-name").value.trim()
    const email = document.getElementById("comment-email").value.trim()
    const content = document.getElementById("comment-content").value.trim()

    if (!name || !email || !content) {
      alert("Vui lòng điền đầy đủ thông tin!")
      return
    }

    // Create new comment
    const newComment = {
      id: comments.length + 1,
      name: name,
      email: email,
      content: content,
      date: new Date().toLocaleDateString("vi-VN"),
      avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=007bff&color=fff",
    }

    // Add to comments array
    comments.push(newComment)

    // Re-render comments
    renderComments()

    // Reset form
    this.reset()

    // Show success message
    const submitBtn = document.querySelector(".comment-submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "ĐÃ GỬI THÀNH CÔNG!"
    submitBtn.style.background = "#28a745"

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.style.background = "#dc3545"
    }, 2000)

    // Scroll to new comment
    setTimeout(() => {
      const newCommentElement = document.querySelector(".comment-item:last-child")
      if (newCommentElement) {
        newCommentElement.scrollIntoView({ behavior: "smooth", block: "center" })
        newCommentElement.style.background = "#e3f2fd"
        setTimeout(() => {
          newCommentElement.style.background = "#f8f9fa"
        }, 2000)
      }
    }, 100)
  })

  // Social share functionality
  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()

      const url = window.location.href
      const title = document.getElementById("article-title").textContent

      if (this.classList.contains("facebook")) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
      } else if (this.classList.contains("twitter")) {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        )
      } else if (this.classList.contains("linkedin")) {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
      } else if (this.classList.contains("copy")) {
        navigator.clipboard.writeText(url).then(() => {
          const originalIcon = this.innerHTML
          this.innerHTML = '<i class="bi bi-check"></i>'
          setTimeout(() => {
            this.innerHTML = originalIcon
          }, 1000)
        })
      }
    })
  })

  // Initialize comments
  renderComments()

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
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

  // Reading progress indicator
  function updateReadingProgress() {
    const article = document.querySelector(".article-body")
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector(".reading-progress")
    if (!progressBar) {
      progressBar = document.createElement("div")
      progressBar.className = "reading-progress"
      progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrollPercent}%;
                height: 3px;
                background: linear-gradient(90deg, #007bff, #28a745);
                z-index: 9999;
                transition: width 0.1s ease;
            `
      document.body.appendChild(progressBar)
    } else {
      progressBar.style.width = scrollPercent + "%"
    }
  }

  // Add scroll event listener for reading progress
  window.addEventListener("scroll", updateReadingProgress)

  // Initialize reading progress
  updateReadingProgress()
})
