// ===== Главная страница =====

// ── Данные ──────────────────────────────────────────────────────────────────
const data = {
  hero: {
    title: 'Фотограф мечты',
    subtitle: 'Хочешь крутые и стильные фото? Или мечтаешь научиться фотошопу?'
  },
  examples: [
    { img: 'https://picsum.photos/seed/1/220/300', label: 'Портрет'  },
    { img: 'https://picsum.photos/seed/2/220/300', label: 'Пейзаж'   },
    { img: 'https://picsum.photos/seed/3/220/300', label: 'Стрит'    },
    { img: 'https://picsum.photos/seed/4/220/300', label: 'Fashion'  },
    { img: 'https://picsum.photos/seed/5/220/300', label: 'Репортаж' },
  ],
  teachers: [
    { img: 'https://picsum.photos/seed/10/160/200', name: 'Алексей' },
    { img: 'https://picsum.photos/seed/11/160/200', name: 'Мария'   },
    { img: 'https://picsum.photos/seed/12/160/200', name: 'Дима'    },
  ]
};

// ── Функция инициализации главной страницы ───────────────────────────────────
export function renderMain() {

  // 1. Заполняем секцию-герой текстом из данных
  const heroSection = document.querySelector('.hero');
  heroSection.querySelector('h1').textContent = data.hero.title;
  heroSection.querySelector('p').textContent  = data.hero.subtitle;

  // 2. Вставляем слайды с примерами работ в контейнер Swiper
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = data.examples.map(e => `
    <div class="swiper-slide">
      <img src="${e.img}" alt="${e.label}">
      <span class="swiper-slide__label">${e.label}</span>
    </div>
  `).join('');

  // 3. Добавляем кнопки «предыдущий / следующий» вокруг Swiper-контейнера
  //    (если их ещё нет в DOM, чтобы не дублировать при повторном вызове)
  const swiperSection = document.querySelector('.swiper').parentElement;
  if (!swiperSection.querySelector('.swiper-btn-prev')) {
    // Оборачиваем swiper в обёртку с кнопками
    const swiperEl = document.querySelector('.swiper');
    const wrapper  = document.createElement('div');
    wrapper.className = 'swiper-outer';

    // Кнопка «назад»
    const btnPrev = document.createElement('button');
    btnPrev.className   = 'swiper-btn swiper-btn-prev';
    btnPrev.type        = 'button';
    btnPrev.innerHTML   = '&#8592;'; // ←
    btnPrev.setAttribute('aria-label', 'Предыдущий слайд');

    // Кнопка «вперёд»
    const btnNext = document.createElement('button');
    btnNext.className   = 'swiper-btn swiper-btn-next';
    btnNext.type        = 'button';
    btnNext.innerHTML   = '&#8594;'; // →
    btnNext.setAttribute('aria-label', 'Следующий слайд');

    // Вставляем обёртку вместо swiper и кладём всё внутрь
    swiperEl.parentNode.insertBefore(wrapper, swiperEl);
    wrapper.appendChild(btnPrev);
    wrapper.appendChild(swiperEl);
    wrapper.appendChild(btnNext);
  }

  // 4. Инициализируем Swiper с эффектом coverflow
  //    navigation — используем собственные кнопки (custom), а не встроенные
  const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,

    // Настройки 3D-эффекта: меньше глубины и тени для аккуратного вида
    coverflowEffect: {
      rotate:       0,      // нет поворота
      stretch:      0,      // нет растяжения
      depth:        80,     // глубина 3D (было 120 — уменьшаем)
      modifier:     2,      // множитель эффекта (было 3 — уменьшаем)
      slideShadows: true,   // тени на слайдах (управляем через CSS)
    },

    // Управление клавиатурой и колесом мыши
    keyboard:   { enabled: true },
    mousewheel: { thresholdDelta: 70 },

    // Адаптивное число видимых слайдов
    breakpoints: {
      0:    { slidesPerView: 1.2 },
      560:  { slidesPerView: 2.2 },
      1024: { slidesPerView: 2.8 },
    }
  });

  // 5. Привязываем кастомные кнопки к методам Swiper
  document.querySelector('.swiper-btn-prev')
    ?.addEventListener('click', () => swiper.slidePrev());
  document.querySelector('.swiper-btn-next')
    ?.addEventListener('click', () => swiper.slideNext());

  // 6. Заполняем блок преподавателей
  const teachersContainer = document.querySelector('.teachers');
  teachersContainer.innerHTML = data.teachers.map(t => `
    <div class="teacher-card">
      <img src="${t.img}" alt="${t.name}">
      <p>${t.name}</p>
    </div>
  `).join('');
}
