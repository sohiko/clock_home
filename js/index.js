const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

window.onload = function () {
    showProcess(today, calendar);
};

function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}


function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}


function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();


    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}


function createProcess(year, month) {
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);

    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                count++;
                if(year == today.getFullYear()
                  && month == (today.getMonth())
                  && count == today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}
const clock = () => {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let dayNum = d.getDay();
    const weekday = ["日", "月", "火", "水", "木", "金", "土"];
    let day = weekday[dayNum];
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
  
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let today = `${year}.${month}.${date}（${day}）`;
    let time = `${hour}：${min}：${sec}`;
  
    document.querySelector("#header").innerText = today;
    document.querySelector("#clock").innerText = time;
  };
 setInterval('clock()',1000);
 setInterval('createProcess()',1000)

function open_close() {
    document.querySelector('#weather-wrapper').classList.toggle("open_close");
}
function big_clock() {
    document.querySelector('#clock').classList.toggle("big_small")
    document.querySelector('#clock_child').classList.toggle("open_close")
}


var interval;


              
function startCountdown() {
  var hoursInput = document.getElementById('hours');
  var minutesInput = document.getElementById('minutes');
  var secondsInput = document.getElementById('seconds');
  var timerSpan = document.getElementById('timer_result');
  
  var hours = parseInt(hoursInput.value) || 0;
  var minutes = parseInt(minutesInput.value) || 0;
  var seconds = parseInt(secondsInput.value) || 0;
  
  var totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  interval = setInterval(function() {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      timerSpan.textContent = '終了';
      var music = new Audio('./audio/alarm.mp3');
      music.play();
      return;
    }
    
    var hoursRemaining = Math.floor(totalSeconds / 3600);
    var minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
    var secondsRemaining = totalSeconds % 60;
    
    timerSpan.textContent = hoursRemaining.toString().padStart(2, '0') + ':' +
                            minutesRemaining.toString().padStart(2, '0') + ':' +
                            secondsRemaining.toString().padStart(2, '0');
    
    totalSeconds--;
  }, 1000);
}

var timerSpan = document.getElementById('timer_result');
timerSpan.addEventListener('click', function() {
  if (timerSpan.textContent === '終了') {
    var music = new Audio('./audio/alarm.mp3');
    music.pause();
    music.currentTime = 0;
  }
});


var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', function() {
    clearInterval(interval);
    startCountdown();
  });
}

function timer() {
    document.querySelector('#timer_set').classList.toggle("open_close");
}
function stopwatch() {
    document.querySelector('#stopwatch').classList.toggle("open_close");
}



const time = document.getElementById('stopwatch_result');
const startButton = document.getElementById('stopwatch_start');
const stopButton = document.getElementById('stopwatch_stop');
const resetButton = document.getElementById('stopwatch_reset');

let startTime;
let stopTime = 0;
let timeoutID;


function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours()-9).padStart(2, '0');
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = `${h}：${m}：${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}


startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();
  displayTime();
});


stopButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
});


resetButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  time.textContent = '00：00：00.000';
  stopTime = 0;
});
