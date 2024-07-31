let timer;
let isRunning = false;
let isStudyTime = true;
let studyTimeLeft = 1500; // 25 minutes in seconds
let restTimeLeft = 300; // 5 minutes in seconds
const studyDuration = 1500;
const restDuration = 300;

const studyTimerDisplay = document.getElementById('study-timer');
const restTimerDisplay = document.getElementById('rest-timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateTimerDisplay() {
    const studyMinutes = Math.floor(studyTimeLeft / 60);
    const studySeconds = studyTimeLeft % 60;
    studyTimerDisplay.textContent = `${studyMinutes < 10 ? '0' : ''}${studyMinutes}:${studySeconds < 10 ? '0' : ''}${studySeconds}`;

    const restMinutes = Math.floor(restTimeLeft / 60);
    const restSeconds = restTimeLeft % 60;
    restTimerDisplay.textContent = `${restMinutes < 10 ? '0' : ''}${restMinutes}:${restSeconds < 10 ? '0' : ''}${restSeconds}`;

    if (isStudyTime) {
        studyTimerDisplay.classList.add('active');
        studyTimerDisplay.classList.remove('inactive');
        restTimerDisplay.classList.remove('active');
        restTimerDisplay.classList.add('inactive');
    } else {
        restTimerDisplay.classList.add('active');
        restTimerDisplay.classList.remove('inactive');
        studyTimerDisplay.classList.remove('active');
        studyTimerDisplay.classList.add('inactive');
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (isStudyTime) {
                studyTimeLeft--;
                if (studyTimeLeft === 0) {
                    isStudyTime = false;
                    studyTimeLeft = studyDuration;
                }
            } else {
                restTimeLeft--;
                if (restTimeLeft === 0) {
                    isStudyTime = true;
                    restTimeLeft = restDuration;
                }
            }
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isStudyTime = true;
    studyTimeLeft = studyDuration;
    restTimeLeft = restDuration;
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay(); // Initialize display
