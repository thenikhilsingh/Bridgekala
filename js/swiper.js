let mySwiper;

function destroySwiper() {
  if (mySwiper && mySwiper.destroy) {
    mySwiper.destroy(true, true); // Remove styles, events, and Swiper instance
    mySwiper = null;
  }
}

function resetSwiperDOM() {
  const swiperContainer = document.querySelector(".mySwiper");
  if (!swiperContainer) return;

  // Remove leftover Swiper classes
  swiperContainer.classList.remove("swiper-initialized", "swiper-horizontal");
  swiperContainer.querySelectorAll(".swiper-slide").forEach(slide => {
    slide.removeAttribute("style");
    slide.classList.remove("swiper-slide-active", "swiper-slide-next", "swiper-slide-prev");
  });
}

function initSwiper() {
  const swiperContainer = document.querySelector(".mySwiper");
  if (!swiperContainer) return;

  destroySwiper();
  resetSwiperDOM();

  mySwiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

// Initial load
document.addEventListener("DOMContentLoaded", initSwiper);

// Handle navigation back/forward
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initSwiper();
  }
});

// Optional: refresh when user switches back to the tab
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    initSwiper();
  }
});
