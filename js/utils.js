export const ROOT = new URL('..', import.meta.url).href.replace(/\/$/, '');

function fetchResource(path) {
  return fetch(path).then(r => {
    if (!r.ok) throw new Error(`Ошибка загрузки ${path}: ${r.status}`);
    return r;
  });
}

export const loadJSON = (relPath) => fetchResource(`${ROOT}/${relPath}`).then(r => r.json());
export const loadHTML = (relPath) => fetchResource(`${ROOT}/${relPath}`).then(r => r.text());
