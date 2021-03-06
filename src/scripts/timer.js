import { formatTime } from './timeFormat.js';

function Timer (
  $countdownElement
) {
  this.sessionDuration;
  this.breakDuration;
  this.currentTimer = new Pomodoro(this);
  this.setSessionDuration = time => {
    this.sessionDuration = time;
    this.reset();
  };

  this.setBreakDuration = time => {
    this.breakDuration = time;
    this.reset();
  };

  this.isRunning = () => this.currentTimer.isRunning;

  this.toggleTimer = () => {
    if (!this.isRunning()) {
      const nextTimer = (this.currentTimer.type === 'Pomodoro')
        ? new Break(this)
        : new Pomodoro(this);
      this.changeTimer(nextTimer, false);
    }
  };

  this.changeTimer = (nextTimer, shouldStart = true) => {
    this.currentTimer = nextTimer;
    if (shouldStart) nextTimer.start();
    else this.updateDisplay();
  };

  this.updateDisplay = () => {
    $countdownElement.textContent = this.currentTimer.time;
    document.title = `${this.currentTimer.time} - Pomodoro`;
  };

  this.start = () => {
    if (!this.isRunning()) this.currentTimer.start();
  };

  this.stop = () => {
    const alarm = new Audio('assets/alarm.mp3');
    
    if (this.currentTimer.currentTime === 0) alarm.play();
    this.currentTimer.stop();
  };

  this.reset = () => {
    if (!this.currentTimer.isRunning) {
      const newTimer = (this.currentTimer.type === 'Pomodoro')
        ? new Pomodoro(this) 
        : new Break(this);
      this.changeTimer(newTimer, false);
    }
  };
}

function Pomodoro (timer) {
  this.timer = timer;
  this.type = 'Pomodoro';
  this.isRunning = false;
  this.currentTime = timer.sessionDuration * 60;
  this.time = formatTime(this.currentTime);

  let timerLoop;

  this.start = () => {
    this.isRunning = true;
    timerLoop = setInterval(() => {
      if (this.currentTime === 0) {
        timer.stop();
        return;
      }
      this.currentTime--;
      this.time = formatTime(this.currentTime);
      this.timer.updateDisplay();

    }, 1000);
    document.body.classList.remove('break');
    document.body.classList.add('pomodoro');
  };

  this.stop = () => {
    this.isRunning = false;
    clearInterval(timerLoop);
    if (this.currentTime === 0) timer.changeTimer(new Break(timer));
  };
}

function Break (timer) {
  this.timer = timer;
  this.type = 'Break';
  this.isRunning = false;
  this.currentTime = timer.breakDuration * 60;
  this.time = formatTime(this.currentTime);

  let timerLoop;

  this.start = () => {
    this.isRunning = true;
    timerLoop = setInterval(() => {
      if (this.currentTime === 0) {
        timer.stop();
        return;
      }
      this.currentTime--;
      this.time = formatTime(this.currentTime);
      this.timer.updateDisplay();

    }, 1000);
    document.body.classList.remove('pomodoro');
    document.body.classList.add('break');
  };

  this.stop = () => {
    this.isRunning = false;
    clearInterval(timerLoop);
    if (this.currentTime === 0) timer.changeTimer(new Pomodoro(timer));
  };
}

export default Timer;
export { Pomodoro };
export { Break };