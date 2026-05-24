// main.js — слайдер Swiper и форма обратной связи

// Инициализируем карусель с примерами работ
const swiper = new Swiper(".swiper", { // создаём экземпляр Swiper для главного слайдера
  effect: "coverflow", // выбираем эффект перелистывания
  grabCursor: true, // курсор будет "хватать" слайд
  centeredSlides: true, // активный слайд будет по центру
  loop: true, // включаем бесконечную прокрутку
  coverflowEffect: { rotate: 0, stretch: 0, depth: 80, modifier: 2, slideShadows: true }, // настраиваем внешний вид coverflow
  keyboard: { enabled: true }, // разрешаем управление с клавиатуры
  breakpoints: { // адаптивные настройки количества видимых слайдов
    0: { slidesPerView: 1.2 }, // на узких экранах показываем чуть больше одного слайда
    560: { slidesPerView: 2.2 }, // на средних экранах показываем 2.2 слайда
    1024: { slidesPerView: 2.8 } // на больших экранах показываем 2.8 слайда
  }
});

// Переключение слайдов по кнопкам
document.getElementById("prevBtn").addEventListener("click", () => swiper.slidePrev()); // клик назад по слайдеру
document.getElementById("nextBtn").addEventListener("click", () => swiper.slideNext()); // клик вперёд по слайдеру

// Отправка формы обратной связи с очисткой полей
document.getElementById("feedbackForm").addEventListener("submit", (e) => { // слушаем отправку формы
  e.preventDefault(); // отменяем стандартную отправку формы
  e.target.reset(); // очищаем поля формы
  alert("Сообщение отправлено!"); // показываем подтверждение пользователю
});
