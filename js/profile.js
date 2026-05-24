// profile.js — модалка редактирования, регистрация, выход

// Модальное окно редактирования профиля
const editModal = document.getElementById("editModal"); // получаем диалог редактирования профиля

// Открытие и закрытие модального окна
document.getElementById("editBtn").addEventListener("click", () => editModal.showModal()); // открываем модальное окно редактирования
document.getElementById("cancelEdit").addEventListener("click", () => editModal.close()); // закрываем модальное окно без сохранения

// Закрываем окно по клику на фон
editModal.addEventListener("click", (e) => { // слушаем клик по фону диалога
  if (e.target === editModal) editModal.close(); // закрываем, если пользователь кликнул вне формы
});

// Сохраняем изменения профиля и закрываем окно
document.getElementById("editForm").addEventListener("submit", (e) => { // обработка отправки формы редактирования
  editModal.close(); // закрываем диалог после сохранения
});

// Обработка формы регистрации пользователя
document.getElementById("registerForm").addEventListener("submit", (e) => { // обработка отправки формы регистрации
  e.target.reset(); // очищаем поля после успешной регистрации
  alert("Регистрация успешна!"); // показываем подтверждение
});

// Выход пользователя на главную страницу
document.getElementById("logoutBtn").addEventListener("click", () => { // обработка кнопки выхода
  location.href = "../index.html"; // переносим пользователя на главную страницу
});
