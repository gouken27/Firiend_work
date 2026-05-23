// ===== header.js =====
// Читает pages/header.html и data/nav.json,
// вставляет хедер в #header, подставляет ссылки и данные пользователя.

import { getRoot, loadHTML, loadJSON } from './utils.js';

export function renderHeader() {
  const root = getRoot();

  // 1. Загружаем HTML-шаблон хедера и данные параллельно
  return Promise.all([
    loadHTML(root, 'pages/header.html'),
    loadJSON(root, 'data/nav.json'),
    loadJSON(root, 'data/user.json')
  ]).then(function(results) {
    const html    = results[0];
    const navData = results[1];
    const user    = results[2];

    // 2. Вставляем HTML хедера в DOM
    const headerEl = document.getElementById('header');
    if (!headerEl) return;
    headerEl.innerHTML = html;

    // 3. Строим ссылки навигации из nav.json (заменяем {ROOT} на реальный путь)
    const navHTML = navData.map(function(item) {
      const href = item.href.replace('{ROOT}', root);
      return '<a href="' + href + '">' + item.label + '</a>';
    }).join(' ');

    // Вставляем в десктопный и мобильный nav
    const mainNav   = document.getElementById('mainNav');
    const mobileNav = document.getElementById('mobileNav');
    if (mainNav)   mainNav.innerHTML   = navHTML;
    if (mobileNav) mobileNav.innerHTML = navHTML;

    // 4. Заполняем логотип, аватар, имя пользователя
    const logo     = document.getElementById('logo');
    const avatar   = document.getElementById('avatar');
    const username = document.getElementById('username');

    if (logo)     logo.src           = root + '/' + user.logo;
    if (avatar)   avatar.src         = root + '/' + user.avatar;
    if (username) username.textContent = user.name;

    // 5. Ставим href на логотип и ссылку профиля
    const logoLink    = document.getElementById('logoLink');
    const profileLink = document.getElementById('profileLink');
    if (logoLink)    logoLink.href    = root + '/index.html';
    if (profileLink) profileLink.href = root + '/pages/profile.html';

    // 6. Бургер-меню: открыть / закрыть
    const burgerBtn  = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn   = document.getElementById('closeMenu');

    if (burgerBtn && mobileMenu) {
      burgerBtn.addEventListener('click', function() { mobileMenu.showModal(); });
    }
    if (closeBtn && mobileMenu) {
      closeBtn.addEventListener('click', function() { mobileMenu.close(); });
    }
    // Закрыть по клику на backdrop
    if (mobileMenu) {
      mobileMenu.addEventListener('click', function(e) {
        const r = mobileMenu.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right ||
            e.clientY < r.top  || e.clientY > r.bottom) {
          mobileMenu.close();
        }
      });
    }
  }).catch(function(err) {
    console.error('header:', err);
  });
}
