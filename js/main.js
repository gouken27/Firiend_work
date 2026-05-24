// main.js — слайдер Swiper и форма обратной связи

const swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  coverflowEffect: { rotate: 0, stretch: 0, depth: 80, modifier: 2, slideShadows: true },
  keyboard: { enabled: true },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    560: { slidesPerView: 2.2 },
    1024: { slidesPerView: 2.8 }
  }
});

document.getElementById("prevBtn").addEventListener("click", () => swiper.slidePrev());
document.getElementById("nextBtn").addEventListener("click", () => swiper.slideNext());

document.getElementById("feedbackForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  alert("Сообщение отправлено!");
});
