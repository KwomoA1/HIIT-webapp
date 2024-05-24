// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

import { workoutObj } from '/js/index.mjs';
class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
    <div class='component-container'>
      <div class="wrk-info">
        <div class='workout-title'></div>
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
      <div class='up-next'></div>
      <button class='refresh'> Refresh</button>
    </div>
    `;

    // Creating link to stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./timer.css'));
    this.shadow.append(style);

    // Setting custom element attributes
    this.exerciseIndex = 0;
    this.workoutTime = workoutObj.workoutDuration;
    this.exerciseTime = workoutObj.exercises[this.exerciseIndex]['exercise-dur'];
    this.intervalID = null;

    // Getting shadowDOM HTML elements
    this.workoutTitleDisplay = this.shadow.querySelector('.workout-title');
    this.wrkProgressDisplay = this.shadow.querySelector('.wrkProgress');
    this.wrkCountDisplay = this.shadow.querySelector('.workoutCountdown');
    this.exerciseDisplay = this.shadow.querySelector('.exercise');
    this.descriptionDisplay = this.shadow.querySelector('.description');
    this.exCountDisplay = this.shadow.querySelector('.exerciseCountdown');
    this.focalPoint = this.shadow.querySelector('.focal-point');
    this.upNext = this.shadow.querySelector('.up-next');



    // Setting the display
    this.workoutTitleDisplay.textContent = `Workout: ${workoutObj.workoutName}`;
    this.wrkProgressDisplay.textContent = `Exercise ${this.exerciseIndex + 1}/${workoutObj.exercises.length}`;
    this.wrkCountDisplay.textContent = `Workout Countdown: ${this.formatTime(this.workoutTime)}`;
    this.exerciseDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-name'];
    this.descriptionDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-desc'];
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
    this.upNext.textContent = `UP NEXT: ${workoutObj.exercises[this.exerciseIndex + 1]['exercise-name']}`;

    // Getting buttons
    this.startBtn = this.shadow.querySelector('.startBtn');
    this.pauseBtn = this.shadow.querySelector('.pauseBtn');
    this.resetBtn = this.shadow.querySelector('.resetBtn');
    this.refreshBtn = this.shadow.querySelector('.refresh');

    // Binding function buttons
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.refresh = this.refresh.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
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
    const digitalFormat = this.sliceTimeFormat(`${time[0]}:${time[1]}:${time[2]}`);
    return digitalFormat;
  }

  // Slices the format
  sliceTimeFormat(digitalTime) {
    let index = 0;
    for (const char of digitalTime) {
      if (parseInt(char) > 0) {
        index = digitalTime.indexOf(char);
        break;
      }
    }
    return digitalTime.slice(index);
  }

  // Sets the rest display info on the timer
  restDisplayInfo(restDescription) {
    this.exerciseTime = workoutObj.restDuration;
    this.exerciseDisplay.textContent = 'Rest';
    this.descriptionDisplay.textContent = restDescription;
  }

  // Sets the exercise display info on the timer
  exerciseDisplayInfo() {
    this.wrkProgressDisplay.textContent = `Exercise: ${this.exerciseIndex + 1}/${workoutObj.exercises.length}`;
    this.exerciseTime = workoutObj.exercises[this.exerciseIndex]['exercise-dur'];
    this.exerciseDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-name'];
    this.descriptionDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-desc'];
    if (this.exerciseIndex !== workoutObj.exercises.length - 1) {
      this.upNext.textContent = `UP NEXT: ${workoutObj.exercises[this.exerciseIndex + 1]['exercise-name']}`;
    } else {
      this.upNext.textContent = 'UP NEXT: Workout Completed!';
    }
  }

  // Updates the timer workout, exercise and rest information as long as the workout isn't over.
  updateDisplays() {
    if (this.exerciseIndex < workoutObj.exercises.length - 1) {
      if (this.focalPoint.classList.contains('workout')) {
        this.focalPoint.classList.toggle('workout', false);
        this.focalPoint.classList.toggle('resting', true);
        this.restDisplayInfo('Active rest');
      } else if (this.focalPoint.classList.contains('resting')) {
        this.workoutStatus = 'workout';
        this.focalPoint.classList.toggle('resting', false);
        this.focalPoint.classList.toggle('workout', true);
        this.exerciseIndex += 1;
        this.exerciseDisplayInfo();
      }
    } else {
      this.focalPoint.classList.remove('workout');
      this.focalPoint.classList.add('completed');
      this.exerciseDisplay.textContent = 'Workout completed';
      this.descriptionDisplay.textContent = 'Congrats !';
      this.upNext.textContent = '';
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  // Update the text content div element and time provided as an argument
  updateTimer() {
    this.workoutTime -= 1;
    this.exerciseTime -= 1;
    this.wrkCountDisplay.textContent = `Workout Countdown: ${this.formatTime(this.workoutTime)}`;
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
    if (this.exerciseTime === 0) {
      this.updateDisplays();
    }
  }

  // Starts the countdown functions one click event runs on start button
  start() {
    this.focalPoint.classList.toggle('workout', true);
    this.focalPoint.classList.toggle('paused', false);
    if (!this.intervalID) {
      this.intervalID = setInterval(this.updateTimer, 1000);
    }
  }

  // Pause the countdown by clearing the setInterval
  pause() {
    this.focalPoint.classList.toggle('paused', true);
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  // Resets the countdown back to what is was.
  reset() {
    clearInterval(this.intervalID);
    this.intervalID = null;
    this.focalPoint.classList.toggle('paused', false);
    this.focalPoint.classList.toggle('workout', false);
    this.focalPoint.classList.toggle('resting', false);

    this.exerciseIndex = 0;
    this.workoutTime = workoutObj.workoutDuration;
    this.exerciseTime = workoutObj.exercises[this.exerciseIndex]['exercise-dur'];

    this.wrkProgressDisplay.textContent = `Exercise ${this.exerciseIndex + 1}/${workoutObj.exercises.length}`;
    this.wrkCountDisplay.textContent = `Workout Countdown: ${this.formatTime(this.workoutTime)}`;
    this.exerciseDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-name'];
    this.descriptionDisplay.textContent = workoutObj.exercises[this.exerciseIndex]['exercise-desc'];
    this.exCountDisplay.textContent = this.formatTime(this.exerciseTime);
    this.upNext.textContent = `Up next: ${workoutObj.exercises[this.exerciseIndex + 1]['exercise-name']}`;
  }

  refresh() {
    window.location.reload();
  }

  // Initialises event listeners once the workout timer is created on the DOM.
  connectedCallback() {
    this.pauseBtn.addEventListener('click', this.pause);
    this.startBtn.addEventListener('click', this.start);
    this.resetBtn.addEventListener('click', this.reset);
    this.refreshBtn.addEventListener('click', this.refresh);
  }
}

customElements.define('timer-item', Timer);
