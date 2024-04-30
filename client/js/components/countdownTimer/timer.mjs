// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour
import { workoutObj } from '/client/js/index.mjs';
export class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
        <div id='workoutDuration'></div>
        <div id='currentExercise'></div>
        <div id='currentDescription'></div>
        <div id='exerciseCountdown'></div>
        <div id='upcomingExercise'> testing </div>
        <button type='button' class='resetBtn'> Reset </button>
        <button type='button' class='startBtn'> Start </button>
        <button type='button' class='pauseBtn'> pause </button>
    `;

    // Creating the stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./timer.css'));
    this.shadow.append(style);

    // Obtaining attributes
    this.workoutDuration = parseInt(workoutObj.totalWorkoutDuration);
    this.status = this.getAttribute('status');
    this.workout = workoutObj;
    this.exerciseNames = this.getExerciseNames();
    this.exerciseDescription = this.getExerciseDescription();
    this.exerciseDuration = this.getExerciseDuration();
    this.exerciseRestDuration = this.getExerciseRestDuration();
    this.intervalID = null;

    // Setting components HTML text content
    this.shadow.querySelector('#workoutDuration').textContent = this.setTimer(this.workoutDuration);
    this.shadow.querySelector('#currentExercise').textContent = this.exerciseNames[0];
    this.shadow.querySelector('#exerciseCountdown').textContent = this.setTimer(this.exerciseDuration[0]);
    this.shadow.querySelector('#upcomingExercise').textContent = `Up next: ${this.exerciseNames[1]}`;

    // Getting buttons
    this.startBtn = this.shadow.querySelector('.startBtn');
    this.pauseBtn = this.shadow.querySelector('.pauseBtn');

    // Binding function buttons
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.updateExercise = this.updateExercise.bind(this);
  }

  updateTimerDetails(index) {
    this.shadow.querySelector('#workoutDuration').textContent = this.setTimer(this.workoutDuration);
    this.shadow.querySelector('#currentExercise').textContent = this.exerciseName[index];
    this.shadow.querySelector('#exerciseCountdown').textContent = this.exerciseDuration[index];
    this.shadow.querySelector('#upcomingExercise').textContent = this.exerciseName[index + 1];
  }

  getExerciseRestDuration() {
    const exerciseDetails = [...workoutObj.exercises];
    const restDurations = [];
    for (const exercise of exerciseDetails) {
      restDurations.push(exercise['rest-dur']);
    }
    return restDurations;
  }

  getExerciseDuration() {
    const exerciseDetails = [...workoutObj.exercises];
    const exerciseDuration = [];
    for (const exercise of exerciseDetails) {
      exerciseDuration.push(exercise['exercise-dur']);
    }
    return exerciseDuration;
  }

  getExerciseDescription() {
    const exerciseDetails = [...workoutObj.exercises];
    const exerciseDescription = [];
    for (const exercise of exerciseDetails) {
      exerciseDescription.push(exercise['exercise-desc']);
    }
    return exerciseDescription;
  }

  getExerciseNames() {
    const exerciseDetails = [...workoutObj.exercises];
    const exerciseNames = [];
    for (const exercise of exerciseDetails) {
      exerciseNames.push(exercise['exercise-name']);
    }
    return exerciseNames;
  }

  updateExercise(exerciseName) {
    this.shadow.querySelector('#currentExercise').textContent = exerciseName;
  }

  setTimer(timeSecs) {
    const duration = [Math.floor(timeSecs / 3600), Math.floor((timeSecs % 3600) / 60), timeSecs % 60];
    for (const attribute of duration) {
      if (attribute.toString().length === 1) {
        const number = attribute;
        const index = duration.indexOf(attribute);
        const newAttribute = `0${number}`;
        duration[index] = newAttribute;
      }
    }
    this.shadow.querySelector('#exerciseCountdown').textContent = `${duration[0]}:${duration[1]}:${duration[2]}`;
    return `${duration[0]}:${duration[1]}:${duration[2]}`;
  }

  updateTimer() {
    let exerciseIndex = 0;
  
    const update = () => {
      if (exerciseIndex < this.exerciseDuration.length) {
        this.intervalID = setInterval(() => {
          if (this.exerciseDuration[exerciseIndex] > 0) {
            this.exerciseDuration[exerciseIndex] -= 1;
            this.setTimer(this.exerciseDuration[exerciseIndex]);
          } else {
            clearInterval(this.intervalID);
            exerciseIndex++;
            if (exerciseIndex < this.exerciseDuration.length) {
              this.updateExercise(this.exerciseNames[exerciseIndex]);
              this.setTimer(this.exerciseDuration[exerciseIndex]);
              this.shadow.querySelector('#upcomingExercise').textContent = `Up next: ${this.exerciseNames[exerciseIndex + 1]}`;
              update();
            } else {
              // No more exercises, you can do something here, like showing a message
              console.log('Workout finished!');
            }
          }
        }, 1000);
      }
    };
  
    update();
  }
  start() {
    this.updateTimer();
  }

  pause() {
    clearInterval(this.intervalID);
  }

  connectedCallback() {
    this.pauseBtn.addEventListener('click', this.pause);
    this.startBtn.addEventListener('click', this.start);
  }
}


customElements.define('timer-item', Timer);
