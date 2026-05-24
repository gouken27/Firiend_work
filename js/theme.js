// theme.js — переключение светлой / тёмной темы

// Элементы интерфейса, которые управляются темой
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

// Обновляет иконку кнопки в зависимости от текущего состояния темы
function updateIcon() {
  themeBtn.textContent = root.classList.contains("dark") ? "🌙" : "☀️";
}

// Устанавливаем начальное состояние при загрузке страницы
updateIcon();

// Переключаем тему по клику и сохраняем выбор пользователя
themeBtn.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  updateIcon();
});
