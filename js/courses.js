// courses.js — точка входа страницы курсов (pages/courses.html)

import { loadJSON }     from './utils.js';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';

const ROOT = '..';

Promise.all([
  renderHeader(ROOT),
  renderFooter(ROOT),
  loadJSON(ROOT, 'data/courses.json')
]).then(([, , courses]) => {
  document.getElementById('courses-grid').innerHTML = courses
    .map(c => `<div class="course-card">
      <img src="${c.img}" alt="${c.title}" width="280">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <strong>${c.price}</strong><br>
      <button type="button">Подробнее</button>
    </div>`)
    .join('');
});
