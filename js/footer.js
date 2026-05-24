// footer.js — рендер подвала на всех страницах

import { loadHTML, loadJSON } from './utils.js';

export function renderFooter(root, authorProfileHref) {
  return Promise.all([
    loadHTML(root, 'pages/footer.html'),
    loadJSON(root, 'data/user.json')
  ]).then(([html, user]) => {
    const footerEl = document.getElementById('footer');
    if (!footerEl) return;
    footerEl.innerHTML = html;

    const authorLink = document.getElementById('footerAuthorLink');
    if (authorLink) {
      authorLink.textContent = user.name;
      authorLink.href = authorProfileHref || `${root}/pages/profile.html`;
    }

    const avatar = document.getElementById('footerAvatar');
    if (avatar) avatar.src = `${root}/${user.avatar}`;

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
