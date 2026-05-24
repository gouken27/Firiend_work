// dashboard.js — живые часы, приветствие и календарь текущего месяца

// Список месяцев для отображения заголовка календаря
const months = ["января", "февраля", "марта", "апреля", "мая", "июня", // массив названий месяцев
  "июля", "августа", "сентября", "октября", "ноября", "декабря"]; // продолжение массива месяцев

// Приветствия для разных частей дня
const greetings = [ // рендерим текстовые приветствия по времени суток
  "Ночь — спокойный момент для проверки отчётов.", // приветствие для ночи
  "Утро — лучшее время для планирования занятий.", // приветствие для утра
  "День — активные консультации и рабочие потоки.", // приветствие для дня
  "Вечер — можно подвести итоги и подготовить завтрашнее." // приветствие для вечера
];

// Форматы вывода даты и времени
const dateFmt = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" }); // формат полной даты на русском
const timeFmt = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); // формат времени с секундами
const tzFmt = new Intl.DateTimeFormat("ru-RU", { timeZoneName: "short" }); // формат часового пояса

// Возвращает текст приветствия в зависимости от часа
function greeting(hour) { // функция выбора приветствия
  if (hour < 6) return greetings[0]; // ночь
  if (hour < 12) return greetings[1]; // утро
  if (hour < 18) return greetings[2]; // день
  return greetings[3]; // вечер
}

// Обновляет часы, дату и приветствие на странице
function renderClock() { // функция обновления времени и приветствия
  const now = new Date(); // текущее время пользователя
  document.getElementById("dateLabel").textContent = dateFmt.format(now); // выводим дату
  document.getElementById("clock").textContent = timeFmt.format(now); // выводим текущее время
  document.getElementById("greeting").textContent = greeting(now.getHours()); // выводим приветствие по времени
  document.getElementById("status").textContent = "Локальное время: " + tzFmt.format(now); // выводим часовой пояс
}

// Рисует календарь текущего месяца
function renderCalendar() { // функция построения календарной сетки
  const now = new Date(); // текущее время
  const year = now.getFullYear(); // текущий год
  const month = now.getMonth(); // текущий месяц
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // количество дней в текущем месяце
  const prevDays = new Date(year, month, 0).getDate(); // количество дней в предыдущем месяце
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // сдвиг первого дня месяца относительно понедельника
  const today = now.getDate(); // текущий день месяца

  let html = ""; // строка с HTML-календаря

  // Заполняем дни предыдущего месяца
  for (let i = offset; i > 0; i--) { // проходим по числам предыдущего месяца
    html += `<div class="calendar-day is-muted"><span class="calendar-day-number">${prevDays - i + 1}</span></div>`; // добавляем muted-день прошлого месяца
  }

  // Заполняем дни текущего месяца
  for (let d = 1; d <= daysInMonth; d++) { // проходим по каждому дню текущего месяца
    const cls = d === today ? " is-today" : ""; // помечаем текущий день
    html += `<div class="calendar-day${cls}"><span class="calendar-day-number">${d}</span></div>`; // добавляем текущий день
  }

  // Заполняем дни следующего месяца для полной сетки
  for (let d = 1, total = 42 - (offset + daysInMonth); d <= total; d++) { // добираем дни до полной 6x7 сетки
    html += `<div class="calendar-day is-muted"><span class="calendar-day-number">${d}</span></div>`; // добавляем muted-дни следующего месяца
  }

  document.getElementById("monthLabel").textContent = `${months[month]} ${year}`; // выводим название месяца и год
  document.getElementById("calendarGrid").innerHTML = html; // вставляем готовую сетку календаря
}

// Инициализация дашборда
renderClock(); // сразу показываем время
renderCalendar(); // сразу строим календарь
setInterval(renderClock, 1000); // обновляем время каждую секунду
