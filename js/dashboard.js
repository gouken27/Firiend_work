// dashboard.js — живые часы, приветствие и календарь текущего месяца

const months = ["января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"];

const greetings = [
  "Ночь — спокойный момент для проверки отчётов.",
  "Утро — лучшее время для планирования занятий.",
  "День — активные консультации и рабочие потоки.",
  "Вечер — можно подвести итоги и подготовить завтрашнее."
];

const dateFmt = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" });
const timeFmt = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const tzFmt = new Intl.DateTimeFormat("ru-RU", { timeZoneName: "short" });

function greeting(hour) {
  if (hour < 6) return greetings[0];
  if (hour < 12) return greetings[1];
  if (hour < 18) return greetings[2];
  return greetings[3];
}

function renderClock() {
  const now = new Date();
  document.getElementById("dateLabel").textContent = dateFmt.format(now);
  document.getElementById("clock").textContent = timeFmt.format(now);
  document.getElementById("greeting").textContent = greeting(now.getHours());
  document.getElementById("status").textContent = "Локальное время: " + tzFmt.format(now);
}

function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const today = now.getDate();

  let html = "";

  for (let i = offset; i > 0; i--) {
    html += `<div class="calendar-day is-muted"><span class="calendar-day-number">${prevDays - i + 1}</span></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cls = d === today ? " is-today" : "";
    html += `<div class="calendar-day${cls}"><span class="calendar-day-number">${d}</span></div>`;
  }
  for (let d = 1, total = 42 - (offset + daysInMonth); d <= total; d++) {
    html += `<div class="calendar-day is-muted"><span class="calendar-day-number">${d}</span></div>`;
  }

  document.getElementById("monthLabel").textContent = `${months[month]} ${year}`;
  document.getElementById("calendarGrid").innerHTML = html;
}

renderClock();
renderCalendar();
setInterval(renderClock, 1000);
