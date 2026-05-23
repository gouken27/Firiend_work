// ===== Курсы =====

// Список доступных курсов.
// Каждый объект: title, desc, price, img.
export const courses = [
  {
    title: 'Основы фотографии',
    desc:  'Научитесь основам композиции, свету и выдержке',
    price: '2 999 ₽',
    img:   'https://picsum.photos/seed/c1/280/200'
  },
  {
    title: 'Портретная съёмка',
    desc:  'Техники постановки, работа с моделью и светом',
    price: '4 999 ₽',
    img:   'https://picsum.photos/seed/c2/280/200'
  },
  {
    title: 'Пейзажная фотография',
    desc:  'Съёмка природы: золотой час, экспозиция, фильтры',
    price: '3 999 ₽',
    img:   'https://picsum.photos/seed/c3/280/200'
  },
  {
    title: 'Ретушь в Photoshop',
    desc:  'Цветокоррекция, устранение дефектов, работа со слоями',
    price: '5 499 ₽',
    img:   'https://picsum.photos/seed/c4/280/200'
  },
];

// ── Функция отрисовки карточек курсов ─────────────────────────────────────────
// container — элемент-сетка, куда вставляются карточки (по умолчанию #courses-grid).
export function renderCourses(container = document.getElementById('courses-grid')) {
  if (!container) {
    console.warn('renderCourses: контейнер не найден');
    return;
  }

  // Очищаем на случай повторного вызова
  container.innerHTML = '';

  // Создаём карточку для каждого курса и вставляем в сетку
  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <img src="${course.img}" alt="${course.title}" class="course-card__img">
      <div class="course-card__body">
        <h3 class="course-card__title">${course.title}</h3>
        <p  class="course-card__desc">${course.desc}</p>
        <div class="course-card__price">${course.price}</div>
        <button class="course-card__btn" type="button">Подробнее</button>
      </div>
    `;
    container.appendChild(card);
  });
}
