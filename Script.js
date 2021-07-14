const date = new Date();
// date.setMonth(7);
// date.setFullYear(2008)

const today = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();
const daysNumber = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

const nextDays = 7 - lastDayIndex;

console.log(lastDayIndex);

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

let weekDays = "";
for (let w = 0; w < 7; w++) {
  weekDays += `<div>${daysShort[w]}</div>`;
  document.querySelector(".week__box").innerHTML = weekDays;
}

let monthDays = "";

for (let x = firstDayIndex; x > 0; x--) {
  monthDays += `<div class="prev__days">${prevLastDays - x + 1}</div>`; //add 0 in front single digit
}

for (let i = 1; i <= daysNumber; i++) {
  if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
    if (i < 10) {
      monthDays += `<div class="today">0${i}</div>`;
    } else {
      monthDays += `<div class="today">${i}</div>`;
    }
  } else {
    if (i < 10) {
      monthDays += `<div>0${i}</div>`;
    } else {
      monthDays += `<div>${i}</div>`;
    }
  }
}

for (let j = 1; j <= nextDays; j++) {
  monthDays += `<div class="prev__days">${j}</div>`;
  document.querySelector(".date__box").innerHTML = monthDays;
}
