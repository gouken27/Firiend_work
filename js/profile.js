// profile.js — модалка редактирования, регистрация, выход

// Модальное окно редактирования профиля
const editModal = document.getElementById("editModal");

// Открытие и закрытие модального окна
document.getElementById("editBtn").addEventListener("click", () => editModal.showModal());
document.getElementById("cancelEdit").addEventListener("click", () => editModal.close());

// Закрываем окно по клику на фон
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) editModal.close();
});

// Сохраняем изменения профиля и закрываем окно
document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();
  editModal.close();
});

// Обработка формы регистрации пользователя
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  alert("Регистрация успешна!");
});

// Выход пользователя на главную страницу
document.getElementById("logoutBtn").addEventListener("click", () => {
  location.href = "../index.html";
});
