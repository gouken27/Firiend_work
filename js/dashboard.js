// dashboard.js — живые часы, приветствие и календарь текущего месяца

// Список месяцев для отображения заголовка календаря
const months = ["января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"];

// Приветствия для разных частей дня
const greetings = [
  "Ночь — спокойный момент для проверки отчётов.",
  "Утро — лучшее время для планирования занятий.",
  "День — активные консультации и рабочие потоки.",
  "Вечер — можно подвести итоги и подготовить завтрашнее."
];

// Форматы вывода даты и времени
const dateFmt = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" });
const timeFmt = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const tzFmt = new Intl.DateTimeFormat("ru-RU", { timeZoneName: "short" });

// Возвращает текст приветствия в зависимости от часа
function greeting(hour) {
  if (hour < 6) return greetings[0];
  if (hour < 12) return greetings[1];
  if (hour < 18) return greetings[2];
  return greetings[3];
}

// Обновляет часы, дату и приветствие на странице
function renderClock() {
  const now = new Date();
  document.getElementById("dateLabel").textContent = dateFmt.format(now);
  document.getElementById("clock").textContent = timeFmt.format(now);
  document.getElementById("greeting").textContent = greeting(now.getHours());
  document.getElementById("status").textContent = "Локальное время: " + tzFmt.format(now);
}

// Рисует календарь текущего месяца
function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const today = now.getDate();

  let html = "";

  // Заполняем дни предыдущего месяца
  for (let i = offset; i > 0; i--) {
    html += `<div class="calendar-day is-muted"><span class="calendar-day-number">${prevDays - i + 1}</span></div>`;
  }

  // Заполняем дни текущего месяца
  for (let d = 1; d <= daysInMonth; d++) {
    const cls = d === today ? " is-today" : "";
    html += `<div class="calendar-day${cls}"><span class="calendar-day-number">${d}</span></div>`;
  }

  // Заполняем дни следующего месяца для полной сетки
  for (let d = 1, total = 42 - (offset + daysInMonth); d <= total; d++) {
    html += `<div class="calendar-day is-muted"><span class="calendar-day-number">${d}</span></div>`;
  }

  document.getElementById("monthLabel").textContent = `${months[month]} ${year}`;
  document.getElementById("calendarGrid").innerHTML = html;
}

// Инициализация дашборда
renderClock();
renderCalendar();
setInterval(renderClock, 1000);
