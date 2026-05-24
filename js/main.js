// main.js — точка входа главной страницы (index.html)

import { loadJSON }     from './utils.js';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';

const ROOT = '';

Promise.all([
  renderHeader(ROOT),
  renderFooter(ROOT),
  loadJSON(ROOT, 'data/main.json')
]).then(([, , data]) => {

  // Герой-секция
  document.getElementById('heroTitle').textContent    = data.hero.title;
  document.getElementById('heroSubtitle').textContent = data.hero.subtitle;

  // Слайдер примеров работ
  document.getElementById('swiperWrapper').innerHTML = data.examples
    .map(e => `<div class="swiper-slide"><img src="${e.img}" alt="${e.label}"><p>${e.label}</p></div>`)
    .join('');

  const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    coverflowEffect: { rotate: 0, stretch: 0, depth: 80, modifier: 2, slideShadows: true },
    keyboard: { enabled: true },
    breakpoints: { 0: { slidesPerView: 1.2 }, 560: { slidesPerView: 2.2 }, 1024: { slidesPerView: 2.8 } }
  });

  document.getElementById('prevBtn').addEventListener('click', () => swiper.slidePrev());
  document.getElementById('nextBtn').addEventListener('click', () => swiper.slideNext());

  // Преподаватели
  document.getElementById('teachers').innerHTML = data.teachers
    .map(t => `<div><img src="${t.img}" alt="${t.name}" width="80" height="80"><p>${t.name}</p></div>`)
    .join('');

  // Форма обратной связи
  document.getElementById('feedbackForm').addEventListener('submit', e => {
    e.preventDefault();
    e.target.reset();
    alert('Сообщение отправлено!');
  });
});
