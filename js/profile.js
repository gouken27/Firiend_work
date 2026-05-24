// profile.js — модалка редактирования, регистрация, выход

const editModal = document.getElementById("editModal");

document.getElementById("editBtn").addEventListener("click", () => editModal.showModal());
document.getElementById("cancelEdit").addEventListener("click", () => editModal.close());

editModal.addEventListener("click", (e) => {
  if (e.target === editModal) editModal.close();
});

document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();
  editModal.close();
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  alert("Регистрация успешна!");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  location.href = "../index.html";
});
