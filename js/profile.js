import { loadJSON, ROOT } from './utils.js';
import { renderHeader }   from './header.js';
import { renderFooter }   from './footer.js';

Promise.all([
  renderHeader(),
  renderFooter(),
  loadJSON('data/user.json')
]).then(([,, user]) => {

  document.getElementById('profileAvatar').src       = `${ROOT}/${user.avatar}`;
  document.getElementById('profileName').textContent = user.name;

  const editNameInput = document.querySelector('#editForm input[name="name"]');
  if (editNameInput) editNameInput.value = user.name;

  const editModal = document.getElementById('editModal');
  document.getElementById('editBtn').addEventListener('click',    () => editModal.showModal());
  document.getElementById('cancelEdit').addEventListener('click', () => editModal.close());
  editModal.addEventListener('click', e => {
    const r = editModal.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      editModal.close();
  });
  document.getElementById('editForm').addEventListener('submit', e => {
    e.preventDefault();
    editModal.close();
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = `${ROOT}/index.html`;
  });

  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    e.target.reset();
    alert('Регистрация успешна!');
  });
});
