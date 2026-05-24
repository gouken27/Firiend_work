// menu.js — мобильное бургер-меню

// Диалог мобильного меню
const menu = document.getElementById("mobileMenu");

// Открытие и закрытие меню
document.getElementById("burgerBtn").addEventListener("click", () => menu.showModal());
document.getElementById("closeMenu").addEventListener("click", () => menu.close());

// Закрываем меню, если пользователь кликнул по фону диалога
menu.addEventListener("click", (e) => {
  if (e.target === menu) menu.close();
});
