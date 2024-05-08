// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

import { workoutObj } from '/js/index.mjs';
export class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
    <div id='component-container'>
      <div id='workout-info'> 
        <span class='wrkProgress'></span> 
        <span class='next-exercise'></span>
        <span class='workoutCountdown'></span>
      </div> 
      <div id='focal-point'>
        <span class='exercise'></span>
        <span class='description'></span>
        <span class='exerciseCountdown'></span>
        <div class='button-container'>
          <button type='button' class='resetBtn'> Reset </button>
          <button type='button' class='startBtn'> Start </button>
          <button type='button' class='pauseBtn'> Pause </button>
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
    this.exercises = workoutObj.exercises;
    this.workoutTime = workoutObj.workoutDuration;
    this.exerciseTime = this.exercises[this.exerciseIndex]['exercise-dur'];

    // Getting shadowDOM HTML elements
    this.wrkProgressDisplay = this.shadow.querySelector('.wrkProgress');
    this.wrkCountDisplay = this.shadow.querySelector('.workoutCountdown');
    this.exerciseDisplay = this.shadow.querySelector('.exercise');
    this.descriptionDisplay = this.shadow.querySelector('.description');
    this.exCountDisplay = this.shadow.querySelector('.exerciseCountdown');
    this.nxtExercise = this.shadow.querySelector('.next-exercise');

    // Setting the display
    this.wrkProgressDisplay.textContent = `Exercise ${this.exerciseIndex + 1}/${this.exercises.length}`;
    this.nxtExercise.textContent = `up next: ${this.exercises[this.exerciseIndex + 1]['exercise-name']}`;
    this.wrkCountDisplay.textContent = `WorkoutCountdown: ${this.formatTime(this.workoutTime)}`;
    this.exerciseDisplay.textContent = `${this.exercises[this.exerciseIndex]['exercise-name']}`;
    this.descriptionDisplay.textContent = this.exercises[this.exerciseIndex]['exercise-desc'];
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
    this.displayRestDetails = this.displayRestDetails.bind(this);
    this.updateDisplayContent = this.updateDisplayContent.bind(this);
    this.updateExerciseTime = this.updateExerciseTime.bind(this);
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
    let workoutDuration = this.workoutTime;
    this.intervalID = window.setInterval(() => {
      if (workoutDuration > 0) {
        workoutDuration -= 1;
        this.wrkCountDisplay.textContent = `Workout Duration: ${this.formatTime(workoutDuration)}`;
      }
    }, 1000);
  }

  // Update the exercise countdown timer
  updateExerciseTime(exerciseDuration) {
    exerciseDuration -= 1;
    this.exCountDisplay.textContent = this.formatTime(exerciseDuration);
    return exerciseDuration;
  }

  displayRestDetails(exerciseDuration) {
    this.workoutStatus = 'rest';
    this.exerciseDisplay.textContent = 'Rest';
    this.descriptionDisplay.textContent = '';
    this.exerciseTime = workoutObj.restDuration;
    exerciseDuration = this.exerciseTime;
    return exerciseDuration;
  }

  updateDisplayContent(exerciseDuration) {
    this.exerciseIndex += 1;
    this.workoutStatus = 'workout';
    this.wrkProgressDisplay.textContent = `Exercise ${this.exercisesIndex + 1}/${this.exercises.length}`;
    this.nxtExercise.textContent = `up next: ${this.exercises[this.exerciseIndex + 1]['exercise-name']}`;
    this.exerciseDisplay.textContent = `${this.exercises[this.exerciseIndex]['exercise-name']}`;
    this.descriptionDisplay.textContent = `Description: ${this.exercises[this.exerciseIndex]['exercise-desc']}`;
    this.exerciseTime = this.exercises[this.exerciseIndex]['exercise-dur'];
    exerciseDuration = this.exerciseTime;
    return exerciseDuration;
  }

  updateExerciseTimer() {
    let exerciseDuration = this.exerciseTime;
    this.intervalID = window.setInterval(() => {
      if (exerciseDuration > 0) {
        exerciseDuration = this.updateExerciseTime(exerciseDuration);
        console.log(exerciseDuration);
      } else if (exerciseDuration === 0 && this.workoutStatus === 'workout') {
        exerciseDuration = this.displayRestDetails(exerciseDuration);
      } else if (exerciseDuration === 0 && this.workoutStatus === 'rest') {
        exerciseDuration = this.updateDisplayContent(exerciseDuration);
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
