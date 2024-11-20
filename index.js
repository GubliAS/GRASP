



var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

const carouselItems = document.getElementById("carouselItems");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentIndex = 0;
let itemsToShow = 1;

// Determine items to show based on screen width
function updateItemsToShow() {
  if (window.innerWidth >= 1024) {
    // large screens
    itemsToShow = 3;
  } else if (window.innerWidth >= 768) {
    // medium screens
    itemsToShow = 2;
  } else {
    // small screens
    itemsToShow = 1;
  }
  moveCarousel();
  updateButtonColors();
}

// Update button colors based on the current index
function updateButtonColors() {
  const totalItems = carouselItems.children.length;

  if (currentIndex === 0) {
    prevButton.classList.add("bg-white/70");
    prevButton.classList.remove("bg-white");
  } else {
    prevButton.classList.remove("bg-white/70");
    prevButton.classList.add("bg-white");
  }

  if (currentIndex >= totalItems - itemsToShow) {
    nextButton.classList.add("bg-white/70");
    nextButton.classList.remove("bg-white");
  } else {
    nextButton.classList.remove("bg-white/70");
    nextButton.classList.add("bg-white");
  }
}

// Move carousel based on current index and items to show
function moveCarousel() {
  const width = carouselItems.children[0].offsetWidth;
  carouselItems.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Looping functionality in Button click events
prevButton.addEventListener("click", () => {
  const totalItems = carouselItems.children.length;
  currentIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - itemsToShow;
  moveCarousel();
  updateButtonColors();
});

nextButton.addEventListener("click", () => {
  const totalItems = carouselItems.children.length;
  currentIndex = currentIndex < totalItems - itemsToShow ? currentIndex + 1 : 0;
  moveCarousel();
  updateButtonColors();
});

// Resize listener to update items to show on window resize
window.addEventListener("resize", updateItemsToShow);

// Initialize the carousel
updateItemsToShow();

