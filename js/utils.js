// ===== utils.js — общие утилиты =====

// Вычисляет корневой URL проекта для любой страницы на GitHub Pages.
// Ищет сегмент /pages/ в пути — всё до него и есть корень.
export function getRoot() {
  const path = window.location.pathname;
  const idx  = path.indexOf('/pages/');
  if (idx !== -1) return path.slice(0, idx) || '';
  // Корневая страница — убираем имя файла
  return path.replace(/\/[^/]*\.html$/, '').replace(/\/$/, '') || '';
}

function getProjectBaseURL() {
  const path = window.location.pathname;
  const idx  = path.indexOf('/pages/');
  const basePath = idx !== -1 ? path.slice(0, idx) : path.replace(/\/[^/]*\.html$/, '').replace(/\/$/, '');
  const normalizedBasePath = (basePath || '/').replace(/\/$/, '') || '/';
  const safeBasePath = normalizedBasePath === '/' ? '/' : normalizedBasePath + '/';
  return new URL(safeBasePath, window.location.origin);
}

// Возвращает корректный URL для fetch и для src/href независимо от того,
// где хостится сайт: в корне, в подкаталоге или на GitHub Pages.
export function resolveAssetURL(root, relPath) {
  const normalizedRoot = (root || '').replace(/\/$/, '');

  if (normalizedRoot) {
    return new URL(normalizedRoot + '/' + relPath, window.location.origin).toString();
  }

  return new URL(relPath, getProjectBaseURL()).toString();
}

// Загружает JSON по пути относительно корня проекта.
// Возвращает Promise с распарсенными данными.
export function loadJSON(root, relPath) {
  return fetch(resolveAssetURL(root, relPath)).then(function(r) {
    if (!r.ok) throw new Error('Ошибка загрузки ' + relPath + ': ' + r.status);
    return r.json();
  });
}

// Читает HTML-фрагмент из файла по пути относительно корня.
// Возвращает Promise со строкой HTML.
export function loadHTML(root, relPath) {
  return fetch(resolveAssetURL(root, relPath)).then(function(r) {
    if (!r.ok) throw new Error('Ошибка загрузки ' + relPath + ': ' + r.status);
    return r.text();
  });
}
