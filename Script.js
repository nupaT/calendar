const date = new Date();
let toDayOption = new Date();

const renderCalendar = () => {
  const toDay = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysNumberMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  //get first weekday
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex;

  let toDayOption = new Date();

  // console.log();

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
  //display weekday
  document.querySelector(".day").innerHTML = Intl.DateTimeFormat("ru", { weekday: "long" }).format(
    new Date()
  );
  // document.querySelector(".scheduleColumn").innerHTML = dateString;

  let weekDays = "";
  for (let w = 0; w < 7; w++) {
    weekDays += `<div>${daysShort[w]}</div>`;
    document.querySelector(".week__box").innerHTML = weekDays;
  }

  let monthDays = "";

  for (let x = firstDayIndex; x > 0; x--) {
    monthDays += `<div class="prev__days">${prevLastDays - x + 1}</div>`;
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
    monthDays += `<div class="prev__days">0${j}</div>`;
    document.querySelector(".date__box").innerHTML = monthDays;
  }

  //function for highlight date for describe event this day
  const daySelected = document.querySelectorAll("#day__numb");
  //selected all elements with id(name) and forEach they
  daySelected.forEach((element) => {
    //add event click for everyone element\
    element.addEventListener("click", () => {
      //select all elements with class ".today" and remove this class
      document.querySelectorAll(".daySelected").forEach((el) => {
        //? добавить снятие выделения
        el.classList.remove("daySelected");
      });
      //if "click" - add class "today"
      element.classList.add("daySelected");
      //get value numberDay from element HTML
      const dateCheck = element.innerHTML;
      // get new date-value
      toDayOption = new Date(date.getFullYear(), date.getMonth(), dateCheck);
      //translate new date to string
      let dateString = Intl.DateTimeFormat("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(toDayOption);
      //change date in sheduleColumn
      document.querySelector(".scheduleColumn").innerHTML = dateString;
    });
  });
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

// ? добавить в функцию вывод даты по которой кликнули +++

//display dateNow once after load

let dateString = Intl.DateTimeFormat("ru-RU", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(date);

document.querySelector(".scheduleColumn").innerHTML = dateString;
