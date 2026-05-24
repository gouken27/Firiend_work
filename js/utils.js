// utils.js — вспомогательные функции для всех JS-модулей

function fetchResource(root, relPath) {
  const url = root ? `${root}/${relPath}` : relPath;
  return fetch(url).then(r => {
    if (!r.ok) throw new Error(`Ошибка загрузки ${relPath}: ${r.status}`);
    return r;
  });
}

export const loadJSON = (root, relPath) => fetchResource(root, relPath).then(r => r.json());
export const loadHTML = (root, relPath) => fetchResource(root, relPath).then(r => r.text());
