// ===== courses.js =====
// Читает data/courses.json, рисует сетку карточек курсов.

import { getRoot, loadJSON } from './utils.js';
import { renderHeader }      from './header.js';

const root = getRoot();

Promise.all([
  renderHeader(),
  loadJSON(root, 'data/courses.json')
]).then(function(results) {
  const courses = results[1];
  const grid    = document.getElementById('courses-grid');

  grid.innerHTML = courses.map(function(c) {
    return '<div class="course-card">'
      + '<img src="' + c.img + '" alt="' + c.title + '" width="280">'
      + '<h3>' + c.title + '</h3>'
      + '<p>' + c.desc + '</p>'
      + '<strong>' + c.price + '</strong><br>'
      + '<button type="button">Подробнее</button>'
      + '</div>';
  }).join('');

}).catch(function(err) {
  console.error('courses:', err);
});
