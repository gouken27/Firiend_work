// ===== Дашборд =====

// Статистика для отображения на дашборде
// Можно расширить: добавить иконки, тренды, ссылки
const stats = [
  { title: 'Всего курсов',    value: '12'  },
  { title: 'Студентов',       value: '342' },
  { title: 'Часов обучения',  value: '156' },
];

// ── Функция отрисовки дашборда ────────────────────────────────────────────────
// Заполняет контейнер #stats-grid карточками со статистикой.
export function renderDashboard() {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer) {
    console.warn('renderDashboard: элемент #stats-grid не найден');
    return;
  }

  // Очищаем на случай повторного вызова
  statsContainer.innerHTML = '';

  // Создаём карточку для каждого показателя и добавляем в сетку
  stats.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <h3 class="stat-card__title">${stat.title}</h3>
      <p  class="stat-card__value">${stat.value}</p>
    `;
    statsContainer.appendChild(card);
  });
}
