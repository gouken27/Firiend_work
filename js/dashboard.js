// ===== dashboard.js =====
// Читает data/dashboard.json, рисует карточки статистики.

import { getRoot, loadJSON } from './utils.js';
import { renderHeader }      from './header.js';

const root = getRoot();

Promise.all([
  renderHeader(),
  loadJSON(root, 'data/dashboard.json')
]).then(function(results) {
  const stats    = results[1];
  const statsEl  = document.getElementById('stats');

  statsEl.innerHTML = stats.map(function(s) {
    return '<div><strong>' + s.value + '</strong><p>' + s.title + '</p></div>';
  }).join('');

}).catch(function(err) {
  console.error('dashboard:', err);
});
