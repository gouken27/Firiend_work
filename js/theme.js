// theme.js — переключение светлой / тёмной темы

const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function updateIcon() {
  themeBtn.textContent = root.classList.contains("dark") ? "🌙" : "☀️";
}

updateIcon();

themeBtn.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  updateIcon();
});
