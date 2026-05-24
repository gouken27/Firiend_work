// header.js — рендер шапки и переключение темы на всех страницах

import { loadHTML, loadJSON, ROOT } from './utils.js';

// Применяем тему из localStorage немедленно — до рендера, без мерцания
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

export function renderHeader() {
  return Promise.all([
    loadHTML('pages/header.html'),
    loadJSON('data/nav.json'),
    loadJSON('data/user.json')
  ]).then(([html, navData, user]) => {
    const headerEl = document.getElementById('header');
    if (!headerEl) return;
    headerEl.innerHTML = html;

    // Навигация (десктоп + мобильная)
    const navHTML = navData
      .map(({ href, label }) => `<a href="${ROOT}/${href}">${label}</a>`)
      .join(' ');
    const mainNav   = document.getElementById('mainNav');
    const mobileNav = document.getElementById('mobileNav');
    if (mainNav)   mainNav.innerHTML   = navHTML;
    if (mobileNav) mobileNav.innerHTML = navHTML;

    // Логотип, аватар, имя
    const set = (id, prop, val) => { const el = document.getElementById(id); if (el) el[prop] = val; };
    set('logo',        'src',         `${ROOT}/${user.logo}`);
    set('text',        'src',         `${ROOT}/${user.text}`);
    set('avatar',      'src',         `${ROOT}/${user.avatar}`);
    set('username',    'textContent',  user.name);
    set('logoLink',    'href',        `${ROOT}/index.html`);
    set('profileLink', 'href',        `${ROOT}/pages/profile.html`);

    // Бургер-меню
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      document.getElementById('burgerBtn')?.addEventListener('click', () => mobileMenu.showModal());
      document.getElementById('closeMenu')?.addEventListener('click', () => mobileMenu.close());
      mobileMenu.addEventListener('click', e => {
        const r = mobileMenu.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
          mobileMenu.close();
        }
      });
    }

    // Переключатель темы — кнопка уже в DOM после innerHTML
    const btn = document.getElementById('themeBtn');
    if (btn) {
      btn.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '☀️';
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        btn.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }
  });
}
