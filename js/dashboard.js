// dashboard.js — страница дашборда (pages/dashboard.html)

import { loadJSON }     from './utils.js';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';

Promise.all([
  renderHeader(),
  renderFooter(),
  loadJSON('data/dashboard.json')
]).then(([,, stats]) => {
  document.getElementById('stats').innerHTML = stats
    .map(s => `<div><strong>${s.value}</strong><p>${s.title}</p></div>`)
    .join('');
});
