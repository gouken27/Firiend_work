// theme.js — переключение светлой / тёмной темы

// Элементы интерфейса, которые управляются темой
const themeBtn = document.getElementById("themeBtn"); // кнопка переключения темы
const root = document.documentElement; // корневой элемент HTML

// Обновляет иконку кнопки в зависимости от текущего состояния темы
function updateIcon() { // функция обновления иконки
  themeBtn.textContent = root.classList.contains("dark") ? "🌙" : "☀️"; // меняем значок на тёмную или светлую луну
}

// Устанавливаем начальное состояние при загрузке страницы
updateIcon(); // сразу выставляем правильную иконку

// Переключаем тему по клику и сохраняем выбор пользователя
themeBtn.addEventListener("click", () => { // обработка клика на кнопку темы
  root.classList.toggle("dark"); // переключаем класс dark на html
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light"); // сохраняем текущую тему в localStorage
  updateIcon(); // обновляем иконку после переключения
});
