const form = document.getElementById("event"),
  title = document.querySelector("h1"),
  eventInput = document.getElementById("event-text"),
  dDate = document.getElementById("d-date"),
  dateInput = document.getElementById('date-text');

const daysEl = document.getElementById("days"),
  hoursEl = document.getElementById("hours"),
  minutesEl = document.getElementById("minutes"),
  secondsEl = document.getElementById("seconds");

const EVENT_NAME = "eventName",
  EVENT_DATE = "eventDate",
  SHOWING_ON = "showing";

const button = document.querySelector(".button-reset");
let timeOn = false;
// const d_day = "1 Jan 2021";

function countdown(date) {
    const today = new Date();
    const d_Date = new Date(date);
    // console.log(today);
    const totalSeconds = (d_Date - today) / 1000;

    const seconds = Math.floor(totalSeconds) % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 3600 / 24);
    // console.log(days, hours, minutes, seconds);

    if (totalSeconds < 0) {
        alert("D-day가 종료되었습니다!");
        alert_close($msg);
    } else {
        daysEl.innerHTML = formatTime(days);
        hoursEl.innerHTML = formatTime(hours);
        minutesEl.innerHTML = formatTime(minutes);
        secondsEl.innerHTML = formatTime(seconds);
    };
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

function saveName(text) {
    localStorage.setItem(EVENT_NAME, text);
}

function saveDate(date) {
    localStorage.setItem(EVENT_DATE, date);
}

function handleEvent(event) {
    event.preventDefault();
    const currentValue = eventInput.value;
    paintTitle(currentValue);
    saveName(currentValue);
}

function handleDate(event) {
    event.preventDefault();
    const dateValue = dateInput.value;
    paintCountdown(dateValue);
    saveDate(dateValue);
}

function askForEvent() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleEvent);
}

function askForDate() {
    dDate.classList.add(SHOWING_ON);
    dDate.addEventListener("submit", handleDate);
}

function paintTitle(text) {
    form.classList.remove(SHOWING_ON);
    title.classList.add(SHOWING_ON);
    title.innerText = `Until ${text}`;
}



function paintCountdown(date) {
    dDate.classList.remove(SHOWING_ON);
    countdown(date); 
    timeOn = true;
    const timer = setInterval(() => {
        if (timeOn) {
            countdown(date), 1000;
        } else {
            clearInterval(timer);
            daysEl.innerHTML = 0;
            hoursEl.innerHTML = 0;
            minutesEl.innerHTML = 0;
            secondsEl.innerHTML = 0;
        }
    });
    timer();
}

function loadEvent() {
    const eventName = localStorage.getItem(EVENT_NAME);
    const eventDate = localStorage.getItem(EVENT_DATE);
    if (eventName === null) {
        askForEvent();
        askForDate();
    } else {
        paintTitle(eventName);
        paintCountdown(eventDate);
    }
}

function handleReset() {
    localStorage.clear();
    title.classList.remove(SHOWING_ON);
    timeOn = false;
    eventInput.value = "";
    dateInput.value = "";
    loadEvent();
}





function init() {
    button.addEventListener("click", handleReset);
    loadEvent();
}

init();