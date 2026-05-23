// ===== main.js — главная страница =====
// Читает data/main.json, заполняет герой, слайдер, преподавателей.

import { getRoot, loadJSON } from './utils.js';
import { renderHeader }      from './header.js';

const root = getRoot();

// Запускаем хедер и данные страницы параллельно
Promise.all([
  renderHeader(),
  loadJSON(root, 'data/main.json')
]).then(function(results) {
  const data = results[1];

  // Герой
  document.getElementById('heroTitle').textContent    = data.hero.title;
  document.getElementById('heroSubtitle').textContent = data.hero.subtitle;

  // Слайдер: строим слайды из массива examples
  const wrapper = document.getElementById('swiperWrapper');
  wrapper.innerHTML = data.examples.map(function(e) {
    return '<div class="swiper-slide">'
      + '<img src="' + e.img + '" alt="' + e.label + '">'
      + '<p>' + e.label + '</p>'
      + '</div>';
  }).join('');

  // Инициализируем Swiper
  const swiper = new Swiper('.swiper', {
    effect:         'coverflow',
    grabCursor:     true,
    centeredSlides: true,
    loop:           true,
    coverflowEffect: { rotate: 0, stretch: 0, depth: 80, modifier: 2, slideShadows: true },
    keyboard:        { enabled: true },
    breakpoints: {
      0:    { slidesPerView: 1.2 },
      560:  { slidesPerView: 2.2 },
      1024: { slidesPerView: 2.8 }
    }
  });

  // Кнопки ← → привязываем к экземпляру Swiper
  document.getElementById('prevBtn').addEventListener('click', function() { swiper.slidePrev(); });
  document.getElementById('nextBtn').addEventListener('click', function() { swiper.slideNext(); });

  // Преподаватели
  const teachersEl = document.getElementById('teachers');
  teachersEl.innerHTML = data.teachers.map(function(t) {
    return '<div>'
      + '<img src="' + t.img + '" alt="' + t.name + '" width="80" height="80">'
      + '<p>' + t.name + '</p>'
      + '</div>';
  }).join('');

  // Форма обратной связи — просто сброс при отправке
  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    e.target.reset();
    alert('Сообщение отправлено!');
  });

}).catch(function(err) {
  console.error('main:', err);
});
