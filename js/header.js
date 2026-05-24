// header.js — рендер шапки и переключение темы на всех страницах

import { loadHTML, loadJSON } from './utils.js';

// Применяем тему из localStorage немедленно, до рендера хедера,
// чтобы избежать мерцания (flash of unstyled content)
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

export function renderHeader(root) {
  return Promise.all([
    loadHTML(root, 'pages/header.html'),
    loadJSON(root, 'data/nav.json'),
    loadJSON(root, 'data/user.json')
  ]).then(([html, navData, user]) => {
    const headerEl = document.getElementById('header');
    if (!headerEl) return;
    headerEl.innerHTML = html;

    // Навигация (десктоп + мобильная)
    const navHTML = navData
      .map(({ href, label }) => `<a href="${href.replace('{ROOT}', root)}">${label}</a>`)
      .join(' ');
    document.getElementById('mainNav')  ?.setHTML?.(navHTML) || (document.getElementById('mainNav')  && (document.getElementById('mainNav').innerHTML   = navHTML));
    document.getElementById('mobileNav')?.setHTML?.(navHTML) || (document.getElementById('mobileNav') && (document.getElementById('mobileNav').innerHTML = navHTML));

    // Логотип, аватар, имя
    const set = (id, prop, val) => { const el = document.getElementById(id); if (el) el[prop] = val; };
    set('logo',     'src',         `${root}/${user.logo}`);
    set('text',     'src',         `${root}/${user.text}`);
    set('avatar',   'src',         `${root}/${user.avatar}`);
    set('username', 'textContent',  user.name);
    set('logoLink',    'href', `${root}/index.html`);
    set('profileLink', 'href', `${root}/pages/profile.html`);

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

    // Переключатель темы — кнопка гарантированно есть в DOM после innerHTML выше
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
