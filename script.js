// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 主题切换功能
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const themeText = themeToggle.querySelector(".theme-text");

  // 从localStorage获取保存的主题
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.textContent = "☀️";
    themeText.textContent = "切换至浅色";
  }

  // 主题切换事件
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      themeIcon.textContent = "☀️";
      themeText.textContent = "切换至浅色";
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.textContent = "🌙";
      themeText.textContent = "切换至深色";
      localStorage.setItem("theme", "light");
    }
  });

  // 滚动进度条
  const scrollProgress = document.querySelector(".scroll-progress");
  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });

  // 返回顶部按钮
  const scrollToTopBtn = document.getElementById("scrollToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 打字机效果
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";
    element.classList.add("typing-text");

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.remove("typing-text");
      }
    }
    type();
  }

  // 为标题添加打字机效果
  const headerTitle = document.querySelector(".header h1");
  const originalTitle = headerTitle.textContent;
  headerTitle.textContent = "";
  setTimeout(() => typeWriter(headerTitle, originalTitle, 150), 500);

  // 添加滚动动画
  const sections = document.querySelectorAll(".section");

  // 创建Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // 观察所有section
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.5s ease-out";
    observer.observe(section);
  });

  // 添加打印功能
  const addPrintButton = () => {
    const header = document.querySelector(".header");
    const printButton = document.createElement("button");
    printButton.innerHTML = "打印简历";
    printButton.className = "print-button";
    printButton.onclick = () => window.print();
    header.appendChild(printButton);
  };

  // 添加打印按钮样式
  const style = document.createElement("style");
  style.textContent = `
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #6e8efb;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        .print-button:hover {
            background: #5d7de8;
            transform: translateY(-2px);
        }
        @media print {
            .print-button {
                display: none;
            }
        }
    `;
  document.head.appendChild(style);

  // 添加打印按钮
  addPrintButton();

  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
