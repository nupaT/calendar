const date = new Date();

const today = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();
const daysNumber = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const daysLong = [
  "",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const daysShort = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабра",
];

document.querySelector(".month").innerHTML = months[month];
document.querySelector(".year").innerHTML = year;
document.querySelector(".day").innerHTML = daysLong[today];

// console.log(today);

let weekDays = "";
for (let w = 0; w < 7; w++) {
  weekDays += `<div>${daysShort[w]}</div>`;
  document.querySelector(".week__box").innerHTML = weekDays;
}

let monthDays = "";

for (let i = 1; i <= daysNumber; i++) {
  monthDays += `<div>${i}</div>`;
  document.querySelector(".date__box").innerHTML = monthDays;
}
