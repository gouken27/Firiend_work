// courses.js — страница курсов (pages/courses.html)

import { loadJSON, ROOT } from './utils.js';
import { renderHeader }   from './header.js';
import { renderFooter }   from './footer.js';

Promise.all([
  renderHeader(),
  renderFooter(),
  loadJSON('data/courses.json')
]).then(([,, courses]) => {
  document.getElementById('courses-grid').innerHTML = courses
    .map(c => `<div class="course-card">
      <img src="${ROOT}/${c.img}" alt="${c.title}" width="280">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <strong>${c.price}</strong><br>
      <button type="button">Подробнее</button>
    </div>`)
    .join('');
});
