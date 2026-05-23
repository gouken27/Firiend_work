// ===== Утилиты модальных окон =====
// Используют нативный HTML-элемент <dialog>.

// Открывает модальное окно по его id
export function openModal(id) {
  const dialog = document.getElementById(id);
  if (!dialog) { console.warn(`openModal: #${id} не найден`); return; }
  dialog.showModal();
}

// Закрывает модальное окно по его id
export function closeModal(id) {
  const dialog = document.getElementById(id);
  if (!dialog) { console.warn(`closeModal: #${id} не найден`); return; }
  dialog.close();
}
