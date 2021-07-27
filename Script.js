const date = new Date();
const weekDayName = Intl.DateTimeFormat("ru", { weekday: "long" }).format(new Date());
const toDay = date.getDate();

let meetingList = {
  "1 1": [
    { time: "14:00", event: "Служба Ш" },
    { time: "15:00", event: "Служба Л" },
  ],
  "2 1": [
    { time: "16:00", event: "Служба D" },
    { time: "17:00", event: "Служба L" },
  ],
  "2 4": [
    { time: "12:00", event: "Служба h" },
    { time: "13:00", event: "СлужбаpD" },
  ],
};

const renderCalendar = () => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysNumberMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  //get first weekday
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex;

  // console.log(firstDayIndex);

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
  document.querySelector(".day").innerHTML = weekDayName;
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

  //selected all elements with id(name) and forEach they
  const daySelect = document.querySelectorAll("#day__numb");
  daySelect.forEach((element) => {
    //add event click for everyone element\
    element.addEventListener("click", () => {
      resetSelect();
      //if "click" - add class "daySelected"
      element.classList.add("daySelected");
      //get value numberDay from element HTML
      const dateCheck = element.innerHTML;
      // get new date-value
      let toDayOption = new Date(date.getFullYear(), date.getMonth(), dateCheck);
      //translate new date to string
      let weekDayNameString = Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(toDayOption);
      //change date in sheduleColumn
      document.querySelector(".day_today").innerHTML = displayDateSelect(toDayOption);
      //
      console.log(new Date(date.getFullYear(), date.getMonth()), getWeekDayName());
      let dayWeekNumber = getWeekDayName(weekDayNameString, dateCheck);
      //change weekday and add day-week-number
      // debugger;
      document.querySelector(".week_number").innerHTML = dayWeekNumber;
      // dayWeekNumber = `${dayNumberWeekSelect} ${Math.ceil(dateCheck / 7)}`;
      displayMeteengEvent(dayWeekNumber); //!!!! проверить
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

//select all elements with class ".daySelected" and remove this class
function resetSelect() {
  document.querySelectorAll(".daySelected").forEach((el) => {
    //? добавить снятие выделения при клике на выделенную дату
    el.classList.remove("daySelected");
  });
}

//display dateSelected (toDay default)
function displayDateSelect(daySelectNow) {
  let dateString = Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(daySelectNow);
  return dateString;
}

//!!!! Работает не корректно, при первом вызове кидает ошибку инициализации метода forEach
function displayMeteengEvent(numDay) {
  //get array from object events
  let tempArr = meetingList[numDay]; //!! первести дату в формат "1 1" сейчас "понедельник 1"
  //sorting tempArr and create new div with value from objects
  tempArr.forEach(function (item) {
    let newDiv = document.createElement("div");
    newDiv.className = "event_new";
    newDiv.innerHTML = `${item.time} ${item.event}`;
    document.querySelector(".event").append(newDiv);
  });
}

document.querySelector(".day_today").innerHTML = displayDateSelect(date);
document.querySelector(".week_number").innerHTML = getWeekDayName(weekDayName, toDay);

function getWeekDayName(day, dateSelect) {
  return `${day} (${Math.ceil(dateSelect / 7)})`;
}
// `${day} (${Math.ceil(date.getDate() / 7)})`
console.log(getWeekDayName(weekDayName, toDay));
// displayMeteengEvent(a);
