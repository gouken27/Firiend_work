// menu.js — мобильное бургер-меню

// Диалог мобильного меню
const menu = document.getElementById("mobileMenu"); // получаем элемент dialog мобильного меню

// Открытие и закрытие меню
document.getElementById("burgerBtn").addEventListener("click", () => menu.showModal()); // при клике открываем мобильное меню
document.getElementById("closeMenu").addEventListener("click", () => menu.close()); // при клике закрываем мобильное меню

// Закрываем меню, если пользователь кликнул по фону диалога
menu.addEventListener("click", (e) => { // слушаем клик внутри диалога
  if (e.target === menu) menu.close(); // закрываем меню, если кликнули по затемнённому фону
});
