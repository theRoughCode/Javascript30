let countdown, paused, secondsLeft;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const pause = document.querySelector('#pause');

function timer (seconds) {
  clearInterval(countdown);
  pause.style.visibility = 'visible';
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if stop
    if (secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    //display time
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft (seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds %= 60;
  const display = `${hours}:${(minutes < 10) ? '0' : ''}${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
  if(!paused) document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime (timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();
  const pm = (hour > 12);
  endTime.textContent = `Be Back At ${pm ? hour - 12 : hour}:${(mins < 10) ? '0' : ''}${mins}${pm ? 'PM' : 'AM'}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins * 60);
});

function togglePause () {
  if (paused) {
    pause.textContent = 'pause';
    timer(secondsLeft);
  } else {
    pause.textContent = 'resume';
    document.title = "Paused";
    clearInterval(countdown);
  }
  paused = !paused;
}

pause.addEventListener('click', togglePause);
