// ===== Управление профилем =====

// Вычисляет корневой путь проекта в зависимости от глубины URL текущей страницы.
//   depth 1 — index.html в корне           → root = '.'
//   depth 2 — src/Pages/profile.html       → root = '..'
//   depth 3 — src/Pages/courses/xxx.html   → root = '../..'
function getRoot() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  return depth <= 1 ? '.' : depth === 2 ? '..' : '../..';
}

// ── Функция отрисовки профиля ────────────────────────────────────────────────
// 1. Загружает данные из profiles.json
// 2. Заполняет аватар и имя в карточке профиля и форме редактирования
// 3. Навешивает события на кнопки: редактировать, выйти, сохранить, регистрация
export async function renderProfile() {
  const root = getRoot();

  // Загружаем профиль пользователя
  try {
    const res  = await fetch(`${root}/src/data/profiles.json`);
    const data = await res.json();
    const user = data.user;

    // Заполняем карточку профиля
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
      const avatar = profileCard.querySelector('.profile-card__avatar');
      const name   = profileCard.querySelector('.profile-card__name');
      if (avatar) avatar.src          = `${root}/${user.avatar}`;
      if (name)   name.textContent    = user.name;
    }

    // Предзаполняем поле имени в форме редактирования
    const nameInput = document.querySelector('#editForm input[name="name"]');
    if (nameInput) nameInput.value = user.name;

  } catch (err) {
    console.error('Ошибка загрузки профиля:', err);
  }

  // ── Элементы управления ──────────────────────────────────────────────────
  const editBtn          = document.getElementById('editBtn');
  const logoutBtn        = document.getElementById('logoutBtn');
  const editModal        = document.getElementById('editModal');
  const cancelEditBtn    = document.getElementById('cancelEdit');
  const editForm         = document.getElementById('editForm');
  const registrationForm = document.getElementById('registrationForm');

  // Открыть модалку редактирования
  if (editBtn)       editBtn.addEventListener('click', () => editModal?.showModal());

  // Закрыть модалку редактирования по кнопке «Отмена»
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => editModal?.close());

  // Закрыть модалку при клике по backdrop (вне диалога)
  if (editModal) {
    editModal.addEventListener('click', e => {
      const rect = editModal.getBoundingClientRect();
      const outside =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom;
      if (outside) editModal.close();
    });
  }

  // Сохранение профиля (пока только закрываем — здесь место для будущего API)
  if (editForm) {
    editForm.addEventListener('submit', e => {
      e.preventDefault();
      editModal?.close();
      // TODO: отправить данные на сервер или сохранить в localStorage
    });
  }

  // Выход — возвращаем на главную
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.location.href = `${root}/index.html`;
    });
  }

  // Регистрация — сброс формы после отправки
  if (registrationForm) {
    registrationForm.addEventListener('submit', e => {
      e.preventDefault();
      e.target.reset();
      // TODO: отправить данные регистрации на сервер
    });
  }

  // Отрисовываем хедер (header.js сам определит корень)
  const { renderHeader } = await import('./header.js');
  await renderHeader();
}
