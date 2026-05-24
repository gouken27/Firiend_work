// footer.js — рендер подвала на всех страницах

import { loadHTML, loadJSON, ROOT } from './utils.js';

export function renderFooter() {
  return Promise.all([
    loadHTML('pages/footer.html'),
    loadJSON('data/user.json')
  ]).then(([html, user]) => {
    const footerEl = document.getElementById('footer');
    if (!footerEl) return;
    footerEl.innerHTML = html;

    const authorLink = document.getElementById('footerAuthorLink');
    if (authorLink) {
      authorLink.textContent = user.name;
      authorLink.href = `${ROOT}/pages/profile.html`;
    }

    const avatar = document.getElementById('footerAvatar');
    if (avatar) avatar.src = `${ROOT}/${user.avatar}`;

    const name = document.getElementById('footerName');
    if (name) name.textContent = user.name;

    const emailLink = document.getElementById('footerEmail');
    if (emailLink) {
      if (user.email) {
        emailLink.href = `mailto:${user.email}`;
        emailLink.textContent = user.email;
      } else {
        emailLink.style.display = 'none';
      }
    }
  });
}
