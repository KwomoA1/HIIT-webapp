// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour
// import { workoutObj } from '/client/js/index.mjs';
export class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
        <div id='workoutCountdown'></div>
        <div id='exerciseCountdown'></div>
        <button type='button' class='resetBtn'> Reset </button>
        <button type='button' class='startBtn'> Start </button>
        <button type='button' class='pauseBtn'> pause </button>
    `;

    // Creating link to stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./timer.css'));
    this.shadow.append(style);

    // Getting time attributes
    this.workoutTime = parseInt(this.getAttribute('workoutTime'));
    this.exerciseTime = parseInt(this.getAttribute('exerciseTime'));

    // Getting shadowDOM HTML elements
    this.wrkCountDisplay = this.shadow.querySelector('#workoutCountdown');
    this.exCountDisplay = this.shadow.querySelector('#exerciseCountdown');

    // Setting time display components by default countdown is display as 0
    this.wrkCountDisplay.textContent = this.formatTime(0);
    this.exCountDisplay.textContent = this.formatTime(0);

    // Getting buttons
    this.startBtn = this.shadow.querySelector('.startBtn');
    this.pauseBtn = this.shadow.querySelector('.pauseBtn');
    this.resetBtn = this.shadow.querySelector('.resetBtn');

    // Binding function buttons
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  setTimer() {
    this.wrkCountDisplay.textContent = this.formatTime(this.workoutTime);
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
  }

  // Returns the time in an hour, minutes and seconds format (array structure [hour, minutes, seconds])
  formatTime(timeSecs) {
    const time = [Math.floor(timeSecs / 3600), Math.floor((timeSecs % 3600) / 60), timeSecs % 60];
    for (const unit of time) {
      if (unit.toString().length === 1) {
        const number = unit;
        const index = time.indexOf(unit);
        const newAttribute = `0${number}`;
        time[index] = newAttribute;
      }
    }
    return `${time[0]}:${time[1]}:${time[2]}`;
  }

  // Update the text content div element and time provided as an argument
  updateTimer(duration, elementHandle) {
    let timeDuration = duration;
    this.intervalID = window.setInterval(() => {
      if (duration > 0) {
        timeDuration -= 1;
        elementHandle.textContent = this.formatTime(timeDuration);
      }
    }, 1000);
  }

  // Starts the countdown functions one click event runs on start button
  start() {
    this.updateTimer(this.workoutTime, this.wrkCountDisplay);
    this.updateTimer(this.exerciseTime, this.exCountDisplay);
  }

  // Pause the countdown by clearing the setInterval
  pause() {
    clearInterval(this.intervalID);
    clearInterval(this.intervalID);
  }

  // Resets the countdown back to what is was.
  reset() {
    this.wrkCountDisplay.textContent = this.formatTime(this.workoutTime);
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
  }

  connectedCallback() {
    this.pauseBtn.addEventListener('click', this.pause);
    this.startBtn.addEventListener('click', this.start);
    this.resetBtn.addEventListener('click', this.reset);
  }
}


customElements.define('timer-item', Timer);
