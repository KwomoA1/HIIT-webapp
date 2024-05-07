// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

import { workoutObj } from '/js/index.mjs';
export class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
    <div id='container'> 
        <div id= 'exerciseStatus'></div>
        <div id='exercise'></div>
        <div id='description'></div>
        <div id='exerciseCountdown'></div>
        <div id='workoutCountdown'></div>
        <div class='buttons-container'>
          <button type='button' class='resetBtn'> Reset </button>
          <button type='button' class='startBtn'> Start </button>
          <button type='button' class='pauseBtn'> pause </button>
        </div>
    </div>
    `;

    // Creating link to stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./timer.css'));
    this.shadow.append(style);

    // Getting time attributes
    this.exerciseIndex = 0;
    this.workoutStatus = 'workout';
    this.exercises = workoutObj.exercises;
    this.workoutTime = workoutObj.totalWorkoutDuration;
    this.exerciseTime = this.exercises[this.exerciseIndex]['exercise-dur'];
    this.workoutStatus = 'workout';

    // Getting shadowDOM HTML elements
    this.exerciseDisplay = this.shadow.querySelector('#exercise');
    this.descriptionDisplay = this.shadow.querySelector('#description');
    this.wrkCountDisplay = this.shadow.querySelector('#workoutCountdown');
    this.exCountDisplay = this.shadow.querySelector('#exerciseCountdown');
    this.statusDisplay = this.shadow.querySelector('#exerciseStatus');

    // Setting time display components by default countdown is display as 0
    this.wrkCountDisplay.textContent = `WorkoutCountdown: ${this.formatTime(this.workoutTime)}`;
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
    this.statusDisplay.textContent = `Status: ${this.workoutStatus}`;
    this.exerciseDisplay.textContent = `Exercise: ${this.exercises[this.exerciseIndex]['exercise-name']}`;
    this.descriptionDisplay.textContent = `Description: ${this.exercises[this.exerciseIndex]['exercise-desc']}`;

    // Getting buttons
    this.startBtn = this.shadow.querySelector('.startBtn');
    this.pauseBtn = this.shadow.querySelector('.pauseBtn');
    this.resetBtn = this.shadow.querySelector('.resetBtn');

    // Binding function buttons
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.updateWorkoutTimer = this.updateWorkoutTimer.bind(this);
    this.updateExerciseTimer = this.updateExerciseTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
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
  updateWorkoutTimer() {
    let timeDuration = this.workoutTime;
    this.intervalID = window.setInterval(() => {
      if (timeDuration > 0) {
        timeDuration -= 1;
        this.wrkCountDisplay.textContent = `Workout Duration: ${this.formatTime(timeDuration)}`;
      }
    }, 1000);
  }

  updateExerciseTimer() {
    let timeSeconds = this.exerciseTime;
    this.intervalID = window.setInterval(() => {
      if (timeSeconds > 0) {
        timeSeconds -= 1;
        this.exCountDisplay.textContent = this.formatTime(timeSeconds);
      } else if (timeSeconds === 0 && this.workoutStatus === 'workout') {
        this.workoutStatus = 'rest';
        this.statusDisplay.textContent = `Status: ${this.workoutStatus}`;
        this.exerciseTime = workoutObj.restDuration;
        timeSeconds = this.exerciseTime;
      } else if (timeSeconds === 0 && this.workoutStatus === 'rest') {
        this.exerciseIndex += 1;
        this.workoutStatus = 'workout';
        this.exerciseDisplay.textContent = `Exercise: ${this.exercises[this.exerciseIndex]['exercise-name']}`;
        this.descriptionDisplay.textContent = `Description: ${this.exercises[this.exerciseIndex]['exercise-desc']}`;
        this.statusDisplay.textContent = `Status: ${this.workoutStatus}`;
        this.exerciseTime = this.exercises[this.exerciseIndex]['exercise-dur'];
        timeSeconds = this.exerciseTime;
      }
    }, 1000);
  }

  // Starts the countdown functions one click event runs on start button
  start() {
    this.updateWorkoutTimer();
    this.updateExerciseTimer();
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
