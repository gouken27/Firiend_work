// ===== Хедер =====

// Определяем корневой путь относительно текущей страницы.
// Глубина 1 — корень (index.html), глубина 2 — src/Pages/, глубина 3 — src/Pages/courses/
function getRoot() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  return depth <= 1 ? '.' : depth === 2 ? '..' : '../..';
}

// ── Функция отрисовки хедера ─────────────────────────────────────────────────
// Загружает профиль пользователя, вставляет HTML хедера и навешивает события.
export async function renderHeader() {
  const root = getRoot();

  // 1. Вставляем разметку хедера из отдельного HTML-файла
  try {
    const res  = await fetch(`${root}/src/Pages/header.html`);
    const html = await res.text();
    document.getElementById('header').innerHTML = html;
  } catch (err) {
    console.error('Ошибка загрузки header.html:', err);
    return; // без разметки дальше нет смысла
  }

  // 2. Загружаем данные пользователя и заполняем аватар, лого, имя
  try {
    const res  = await fetch(`${root}/src/data/profiles.json`);
    const data = await res.json();

    const avatarImg  = document.getElementById('avatar');
    const logoImg    = document.getElementById('logo');
    const usernameEl = document.getElementById('username');

    if (avatarImg)  avatarImg.src  = `${root}/${data.user.avatar}`;
    if (logoImg)    logoImg.src    = `${root}/${data.user.logo}`;   // лого из JSON
    if (usernameEl) usernameEl.textContent = data.user.name;
  } catch (err) {
    console.error('Ошибка загрузки профиля:', err);
  }

  // 3. Исправляем все ссылки хедера под текущий корень
  //    (header.html хранит пути вида ../../index.html — заменяем на реальные)
  document.querySelectorAll('#header a[href], #header button').forEach(el => {
    if (el.href) {
      // Переписываем относительный путь через root
      const href = el.getAttribute('href');
      if (href && href.startsWith('../../')) {
        el.setAttribute('href', href.replace('../../', `${root}/`));
      } else if (href && href.startsWith('../')) {
        el.setAttribute('href', href.replace('../', `${root}/`));
      }
    }
  });

  // 4. Навешиваем бургер-меню
  const burgerBtn   = document.getElementById('burgerBtn');
  const burgerMenu  = document.getElementById('burgerMenu');
  const closeMenuBtn = document.getElementById('closeMenu');

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => burgerMenu?.showModal());
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => burgerMenu?.close());
  }

  // 5. Закрываем мобильное меню кликом по backdrop (вне диалога)
  if (burgerMenu) {
    burgerMenu.addEventListener('click', e => {
      const rect = burgerMenu.getBoundingClientRect();
      const inDialog =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (!inDialog) burgerMenu.close();
    });
  }
}
