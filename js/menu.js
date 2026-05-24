// menu.js — мобильное бургер-меню

const menu = document.getElementById("mobileMenu");

document.getElementById("burgerBtn").addEventListener("click", () => menu.showModal());
document.getElementById("closeMenu").addEventListener("click", () => menu.close());

// закрытие кликом по фону
menu.addEventListener("click", (e) => {
  if (e.target === menu) menu.close();
});
