// dashboard.js — точка входа страницы дашборда (pages/dashboard.html)

import { loadJSON }     from './utils.js';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';

const ROOT = '..';

Promise.all([
  renderHeader(ROOT),
  renderFooter(ROOT),
  loadJSON(ROOT, 'data/dashboard.json')
]).then(([, , stats]) => {
  document.getElementById('stats').innerHTML = stats
    .map(s => `<div><strong>${s.value}</strong><p>${s.title}</p></div>`)
    .join('');
});
