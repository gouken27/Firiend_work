// ===== profile.js =====
// Читает data/user.json, заполняет карточку профиля,
// навешивает логику редактирования, выхода, регистрации.

import { getRoot, loadJSON } from './utils.js';
import { renderHeader }      from './header.js';

const root = getRoot();

Promise.all([
  renderHeader(),
  loadJSON(root, 'data/user.json')
]).then(function(results) {
  const user = results[1];

  // Заполняем карточку
  document.getElementById('profileAvatar').src    = root + '/' + user.avatar;
  document.getElementById('profileName').textContent = user.name;

  // Предзаполняем поле имени в форме редактирования
  const editNameInput = document.querySelector('#editForm input[name="name"]');
  if (editNameInput) editNameInput.value = user.name;

  // Кнопка «Редактировать» → открываем диалог
  document.getElementById('editBtn').addEventListener('click', function() {
    document.getElementById('editModal').showModal();
  });

  // Кнопка «Отмена» → закрываем диалог
  document.getElementById('cancelEdit').addEventListener('click', function() {
    document.getElementById('editModal').close();
  });

  // Закрыть диалог по клику на backdrop
  document.getElementById('editModal').addEventListener('click', function(e) {
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right ||
        e.clientY < r.top  || e.clientY > r.bottom) {
      e.currentTarget.close();
    }
  });

  // Сохранение профиля
  document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('editModal').close();
    // TODO: сохранить данные
  });

  // Выход → главная
  document.getElementById('logoutBtn').addEventListener('click', function() {
    window.location.href = root + '/index.html';
  });

  // Регистрация
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    e.target.reset();
    alert('Регистрация успешна!');
  });

}).catch(function(err) {
  console.error('profile:', err);
});
