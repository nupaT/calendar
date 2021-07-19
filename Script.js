const date = new Date();

const renderCalendar = () => {
  const today = new Date().getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysNumberMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay() + 2; //
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex;

  const dateString = Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  console.log(lastDayIndex);

  // !!! переделать - убрать вообще массив и ввытянуть длинное название дня недели с помощью date
  const daysLong = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
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
    "Декабрь",
  ];

  document.querySelector(".month").innerHTML = months[month];
  document.querySelector(".year").innerHTML = year;
  document.querySelector(".day").innerHTML = Intl.DateTimeFormat("ru", { weekday: "long" }).format(
    date
  ); //daysLong[today];
  document.querySelector(".scheduleColumn").innerHTML = dateString;

  let weekDays = "";
  for (let w = 0; w < 7; w++) {
    weekDays += `<div>${daysShort[w]}</div>`;
    document.querySelector(".week__box").innerHTML = weekDays;
  }

  let monthDays = "";

  for (let x = firstDayIndex; x > 0; x--) {
    monthDays += `<div class="prev__days"  id="day__numb">${prevLastDays - x + 1}</div>`;
  }

  for (let i = 1; i <= daysNumberMonth; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      //add 0 in front single digit
      if (i < 10) {
        monthDays += `<div class="today"  id="day__numb">0${i}</div>`;
      } else {
        monthDays += `<div class="today"  id="day__numb">${i}</div>`;
      }
    } else {
      if (i < 10) {
        monthDays += `<div id="day__numb">0${i}</div>`;
      } else {
        monthDays += `<div id="day__numb">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    monthDays += `<div class="prev__days"  id="day__numb">${j}</div>`;
    document.querySelector(".date__box").innerHTML = monthDays;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

// not working becouse i acces to element before render it

// document.querySelector(".next").addEventListener("click", () => {
//   document.querySelector(".next").classList.toggle("today");
//   document.querySelector(".next").classList.toggle("");
//   console.log("click");
//   // renderCalendar();
// });

renderCalendar();
