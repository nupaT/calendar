//? Отложеные баги, не совсем корректно обращаемся к массиву совещаний
//? хотелось бы по значениям 1 1 (день нелдели) (номер недели)
//? но так читается лучше - не критично

const date = new Date();
const weekDayName = Intl.DateTimeFormat("ru", { weekday: "long" }).format(new Date());
const toDay = date.getDate();

let meetingList = {
  "понедельник (1)": [
    { time: "14:00", event: "Служба Ш" },
    { time: "15:00", event: "Служба Л" },
    { time: "16:00", event: "По информации" },
  ],
  "понедельник (2)": [
    { time: "14:00", event: "Служба Ш" },
    { time: "15:00", event: "Служба Л" },
    // { time: "16:00", event: "Служба К (видео)" }, //временно отменена
  ],
  "понедельник (3)": [
    { time: "14:00", event: "Служба Ш" },
    { time: "15:00", event: "Служба Л" },
    { time: "16:00", event: "По информации" },
  ],
  "понедельник (4)": [
    { time: "13:00", event: "Служба ВОХР" },
    { time: "14:00", event: "Служба Ш" },
    { time: "15:00", event: "Служба Л" },
  ],
  "вторник (1)": [
    { time: "8:20", event: "Эксплуатация (видео)" },
    { time: "11:00", event: "Служба М" },
    { time: "13:30", event: "Служба НХ" },
  ],
  "вторник (2)": [
    { time: "8:20", event: "Эксплуатация (видео)" },
    { time: "11:00", event: "Служба М" },
    { time: "13:30", event: "Служба НХ (видео)" },
    { time: "15:00", event: "Служба НЗПС (видео)" },
  ],
  "вторник (3)": [
    { time: "8:20", event: "Эксплуатация (видео)" },
    { time: "11:00", event: "Служба М" },
    { time: "13:30", event: "Служба НХ" },
  ],
  "вторник (4)": [
    { time: "8:20", event: "ФЭК (видео)" },
    { time: "11:00", event: "Служба М" },
    { time: "13:30", event: "Служба НХ" },
  ],
  "четверг (1)": [
    { time: "13:00", event: "Служба Л" },
    { time: "14:00", event: "Служба НИТ (видео)" },
  ],
  "четверг (2)": [{ time: "13:00", event: "Служба Л" }],
  "четверг (3)": [
    { time: "13:00", event: "Служба Л" },
    { time: "14:00", event: "Служба П" },
    { time: "15:00", event: "Служба НБМ" },
  ],
  "четверг (4)": [
    { time: "13:00", event: "Служба Л" },
    { time: "14:00", event: "Служба РБ (видео)" },
  ],
  "пятница (1)": [
    { time: "10:00", event: "Служба М (видео)" },
    { time: "11:30", event: "Служба Ф (видео)" },
    { time: "14:30", event: "Служба Э (видео)" },
  ],
  "пятница (2)": [
    { time: "10:00", event: "Служба М (видео)" },
    { time: "11:30", event: "Служба Ф (видео)" },
    { time: "13:30", event: "Служба В" },
  ],
  "пятница (3)": [
    { time: "10:00", event: "Служба М (видео)" },
    { time: "11:30", event: "Служба Ф (видео)" },
    { time: "14:00", event: "Профсоюзы" },
  ],
  "пятница (4)": [
    { time: "10:00", event: "Служба М (видео)" },
    { time: "11:30", event: "Служба Ф (видео)" },
    { time: "14:00", event: "Служба НГ (видео)" },
  ],
};

const renderCalendar = () => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysNumberMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex;

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
  document.querySelector(".day").innerHTML = weekDayName;

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
      let dayWeekNumber = getWeekDayName(weekDayNameString, dateCheck);
      //change weekday and add day-week-number
      document.querySelector(".week_number").innerHTML = dayWeekNumber;
      displayMeteengEvent(dayWeekNumber);
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

function displayMeteengEvent(numDay) {
  //get array from object events
  let tempArr = meetingList[numDay];
  let newStr = "";
  if (tempArr === undefined) {
    newStr = "Сегодня нет событий";
  } else {
    //sorting tempArr and create new div with value from objects
    tempArr.forEach((item) => {
      newStr += `<div class="event__block"> <div class="event__time">${item.time}</div> <div class="event__desc">${item.event}</div></div>`;
    });
  }
  return (document.querySelector(".event").innerHTML = newStr);
}

document.querySelector(".day_today").innerHTML = displayDateSelect(date);
document.querySelector(".week_number").innerHTML = getWeekDayName(weekDayName, toDay);

function getWeekDayName(day, dateSelect) {
  return `${day} (${Math.ceil(dateSelect / 7)})`;
}

displayMeteengEvent(getWeekDayName(weekDayName, toDay));
