let timer;                                   // To store the interval of the stopwatch
let isRunning = false;                       // To track if the stopwatch is running
let seconds = 0, minutes = 0, hours = 0;
let lapCounter = 0;

function startStopwatch() {
  if (!isRunning) {
    timer = setInterval(updateStopwatch, 1000);
    isRunning = true;
  }
}

function stopStopwatch() {
  clearInterval(timer);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCounter = 0;
  updateDisplay();
  document.querySelector('.laps').innerHTML = '';          // Clear lap times
}

function recordLap() {
  if (isRunning) {
    lapCounter++;
    const formattedTime = `${hours.toString().padStart(2, '0')}:
                          ${minutes.toString().padStart(2, '0')}:
                          ${seconds.toString().padStart(2, '0')}`;
    const lapTime = document.createElement('div');
    lapTime.className = 'lap-time';
    lapTime.textContent = `Lap ${lapCounter}: ${formattedTime}`;
    document.querySelector('.laps').appendChild(lapTime);
  }
}

function updateStopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  const formattedTime = `${hours.toString().padStart(2, '0')}:
                        ${minutes.toString().padStart(2, '0')}:
                        ${seconds.toString().padStart(2, '0')}`;
  document.querySelector('.display').textContent = formattedTime;
}

function updateDateDisplay() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  document.querySelector('.date-display').textContent = formattedDate;
}

// Function to add flash effect
function addFlashEffect(button) {
  button.classList.add('flash');
  setTimeout(() => {
    button.classList.remove('flash');
  }, 500);                            // Remove flash class after 0.5s
}

// Initialize date display
updateDateDisplay();

// Event listeners for the buttons with flash effect
document.querySelector('.start').addEventListener('click', function() {
  startStopwatch();
  addFlashEffect(this);
});
document.querySelector('.stop').addEventListener('click', function() {
  stopStopwatch();
  addFlashEffect(this);
});
document.querySelector('.reset').addEventListener('click', function() {
  resetStopwatch();
  addFlashEffect(this);
});
document.querySelector('.lap').addEventListener('click', function() {
  recordLap();
  addFlashEffect(this);
});
