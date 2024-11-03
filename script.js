// Navigation functionality
function initializeNavigation() {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and sections
      document
        .querySelectorAll(".nav-btn")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".section")
        .forEach((section) => section.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding section
      const sectionId = button.getAttribute("data-section");
      document.getElementById(sectionId).classList.add("active");
    });
  });
}

// Hearts animation
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Memory card interactions
function initializeMemoryCards() {
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(1.1) rotate(0)";
      setTimeout(() => {
        this.style.transform = "";
      }, 500);
    });
  });
}

// Gallery interactions
function initializeGallery() {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("expanded");
      const overlay = this.querySelector(".overlay");
      if (this.classList.contains("expanded")) {
        overlay.style.bottom = "0";
      } else {
        overlay.style.bottom = "-50px";
      }
    });
  });
}

// Timeline animations
function initializeTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  function checkTimelineVisibility() {
    timelineItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8;

      if (isVisible) {
        item.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkTimelineVisibility);
  checkTimelineVisibility(); // Initial check
}

// Music player functionality
function initializeMusicPlayer() {
  const musicBtn = document.getElementById("playMusic");
  const audio = new Audio("Taylor Swift - Love Story.mp3"); // Add your song path
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      musicBtn.textContent = "♪";
    } else {
      audio.play();
      musicBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
  });
}

// Lazy loading images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeMemoryCards();
  initializeGallery();
  initializeTimeline();
  initializeMusicPlayer();
  lazyLoadImages();

  // Start hearts animation
  setInterval(createHeart, 300);
});

// Loading Screen
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);
});

// Lightbox functionality
function initializeLightbox() {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  let currentImageIndex = 0;
  const galleryImages = document.querySelectorAll(".gallery-item img");

  function showImage(index) {
    lightboxImg.src = galleryImages[index].src;
    currentImageIndex = index;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      showImage(index);
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
  });
}

// Gallery filters
function initializeGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Initialize new features
document.addEventListener("DOMContentLoaded", () => {
  // Existing initializations
  initializeNavigation();
  initializeMemoryCards();
  initializeGallery();
  initializeTimeline();
  initializeMusicPlayer();
  lazyLoadImages();

  // New feature initializations
  initializeLightbox();
  initializeGalleryFilters();
  initializeShareButtons();

  // Start hearts animation
  setInterval(createHeart, 300);
});
