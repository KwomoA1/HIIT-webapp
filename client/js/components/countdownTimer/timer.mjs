// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

import { workoutObj } from '/js/index.mjs';
class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
    <div class='component-container'>
      <div class="wrk-info">
        <div class='workoutCountdown'></div>
        <div class='wrkProgress'></div> 
      </div>
      <div class='focal-point'>
        <div class='ex-info'>
          <div class='exercise'></div>
          <div class='description'></div>
          <div class='exerciseCountdown'></div>
        </div>
        <div class='button-container'>
          <button type='button' class='resetBtn'> Reset </button>
          <button type='button' class='startBtn'> Start </button>
          <button type='button' class='pauseBtn'> Pause </button
        </div>
      </div>
    </div>
    `;

    // Creating link to stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./timer.css'));
    this.shadow.append(style);

    // Setting custom element attributes
    this.exerciseIndex = 0;
    this.workoutStatus = 'workout';
    this.workoutTime = workoutObj.workoutDuration;
    this.exerciseTime =
      workoutObj.exercises[this.exerciseIndex]['exercise-dur'];
    this.workoutID = null;
    this.exerciseID = null;

    // Getting shadowDOM HTML elements
    this.wrkProgressDisplay = this.shadow.querySelector('.wrkProgress');
    this.wrkCountDisplay = this.shadow.querySelector('.workoutCountdown');
    this.exerciseDisplay = this.shadow.querySelector('.exercise');
    this.descriptionDisplay = this.shadow.querySelector('.description');
    this.exCountDisplay = this.shadow.querySelector('.exerciseCountdown');
    this.focalPoint = this.shadow.querySelector('.focal-point');

    // Setting the display
    this.wrkProgressDisplay.textContent = `Exercise ${this.exerciseIndex + 1}/${workoutObj.exercises.length}`;
    this.wrkCountDisplay.textContent = `WorkoutCountdown: ${this.formatTime(this.workoutTime)}`;
    this.exerciseDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-name'];
    this.descriptionDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-desc'];
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);

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
    this.decrementTimer = this.decrementTimer.bind(this);
    this.updateDisplays = this.updateDisplays.bind(this);
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

  decrementTimer() {
    this.exerciseTime -= 1;
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
  }

  updateDisplays() {
    if (this.exerciseIndex !== workoutObj.exercises.length - 1) {
      if (this.workoutStatus === 'workout') {
        this.workoutStatus = 'rest';
        this.focalPoint.classList.remove('workoutPulse');
        this.focalPoint.classList.add('resting');
        this.exerciseTime = workoutObj.restDuration;
        this.exerciseDisplay.textContent = 'Rest';
        this.descriptionDisplay.textContent = 'Active rest';
      } else if (this.workoutStatus === 'rest') {
        this.workoutStatus = 'workout';
        this.focalPoint.class.remove('resting');
        this.focalPoint.classList.add('workoutPulse');
        this.exerciseIndex += 1;
        this.wrkProgressDisplay.textContent = `Exercise ${this.exerciseIndex + 1
          }/${workoutObj.exercises.length}`;
        this.exerciseTime =
          workoutObj.exercises[this.exerciseIndex]['exercise-dur'];
        this.exerciseDisplay.textContent =
          workoutObj.exercises[this.exerciseIndex]['exercise-name'];
        this.descriptionDisplay.textContent =
          workoutObj.exercises[this.exerciseIndex]['exercise-desc'];
      }
    } else {
      this.exerciseDisplay.textContent = 'Workout completed';
      this.descriptionDisplay.textContent = "Congrats you're finished";
      clearInterval(this.exerciseID);
      clearInterval(this.workoutID);
    }
  }

  updateExerciseTimer() {
    this.exerciseID = window.setInterval(() => {
      if (this.exerciseTime > 0) {
        this.decrementTimer();
      } else if (this.exerciseTime === 0) {
        this.updateDisplays();
      }
    }, 1000);
  }

  // Update the text content div element and time provided as an argument
  updateWorkoutTimer() {
    this.focalPoint.classList.add('workoutPulse');
    this.workoutID = window.setInterval(() => {
      if (this.workoutTime > 0) {
        this.workoutTime -= 1;
        this.wrkCountDisplay.textContent = this.formatTime(this.workoutTime);
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
    clearInterval(this.exerciseID);
    clearInterval(this.workoutID);
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
