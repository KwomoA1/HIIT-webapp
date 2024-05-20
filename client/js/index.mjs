// imports
import * as userData from './user_data.mjs';

// Stores references to objects
const formElements = {};
export let workoutObj = {};

// Stores the form element ui handles in formElements
function formElemHandles() {
  formElements.workoutForm = document.querySelector('#workout-form');
  formElements.formSections = [
    ...formElements.workoutForm.querySelectorAll('.formSection'),
  ];
  formElements.wrkNameInput = document.querySelector('#workout-name');
  formElements.numExInput = document.querySelector('#num-exercises');
}

// Sets the formIndex and toggles the active class on the form section which index corresponds with the formIndex
function displayForm() {
  const setupBtn = document.querySelector('.setupTimer-btn');
  setupBtn.classList.add('hidden');

  formElements.formIndex = parseInt(
    formElements.formSections.find((step) => {
      return step.classList.contains('active');
    })?.dataset.step
  ); // If not active class is found it sets it to null

  if (isNaN(formElements.formIndex)) {
    /* Checks if the value is NaN and sets it to 1 */
    formElements.formIndex = 1;
    toggleActive(formElements.formIndex);
  }
}

// Adds the 'active' class when the data attribute step matches the current step
function toggleActive(formIndex) {
  formElements.formSections.forEach((step) => {
    step.classList.toggle('active', parseInt(step.dataset.step) === formIndex);
  });
}

// runs form next and previous button functionality
function formNavigation(event) {
  if (event.target.classList.contains('next-btn')) {
    nextBtnHandler();
  } else if (event.target.classList.contains('prev-btn')) {
    prevBtnHandler();
  }
}

// Handles the functionality for the next button
function nextBtnHandler() {
  formElements.formIndex += 1;
  toggleActive(formElements.formIndex);
  if (formElements.formIndex === 3) {
    submitExercises();
    displayWorkoutObj();
  }
}

// Handles the functionality for the previous button
function prevBtnHandler() {
  formElements.formIndex -= 1;
  toggleActive(formElements.formIndex);
  if (formElements.formIndex === 1) {
    clearWorkoutObj();
    clearInputFields();
  }
}

// Clears the entire workout object
function clearWorkoutObj() {
  workoutObj = {};
}

// Removes the clone template fields from step 2 of the form
function clearInputFields() {
  const exerciseInputField = [
    ...document.querySelectorAll('.exerciseInput'),
    ...document.querySelectorAll('.exerciseLabel'),
    ...document.querySelectorAll('ul'),
    ...document.querySelectorAll('h2'),
  ];
  for (const input of exerciseInputField) {
    input.remove();
  }
}

// Sets the workout name and generates default data for exercises based on form section 1 input
function populateObject(event) {
  if (event.target.classList.contains('submitWrkData')) {
    workoutObj.workoutName = formElements.wrkNameInput.value;
    workoutObj.exercises = [];
    workoutObj.restDuration = 0;
    createExerciseObj(formElements.numExInput.value);

    // Generates form inputs for workoutObj
    cloneTemplate(formElements.numExInput.value);
  }
}

// Creates several exercise objects based on the number input from the form and pushes them in an array stored in workoutObj
function createExerciseObj(number) {
  for (let i = 0; i < number; i++) {
    const exerciseObj = {
      'exercise-name': `exercises ${i + 1}`,
      'exercise-desc': '',
      'exercise-hour': '',
      'exercise-min': '',
      'exercise-sec': '',
      'exercise-dur': '',
    };
    workoutObj.exercises.push(exerciseObj);
  }
}

// Clones a template to the webpage accepts a number as an argument will produce clones
function cloneTemplate(number) {
  const exFormTemplate = document.querySelector('#exerciseFormTemplate');
  const formSection2 = document.querySelector('#exercise-form');

  for (let i = 0; i < number; i++) {
    const cloned = exFormTemplate.content.cloneNode(true);
    const exerciseHeader = cloned.querySelector('#exercise-title');
    exerciseHeader.textContent = `exercise ${i + 1}`;
    const templateInputs = [...cloned.querySelectorAll('.exerciseInput')];
    setExerciseIndex(templateInputs, i);
    formSection2.insertBefore(cloned, document.querySelector('#rest-inputs'));
  }
}

// Sets the each input custom attribute exercise index to the matching index
function setExerciseIndex(clonedInputsBoxes, index) {
  for (const input of clonedInputsBoxes) {
    input.dataset.exerciseIndex = index;
  }
}

// Adds input values to workout object
function submitExercises() {
  const exerciseInputBoxes = [...document.querySelectorAll('.exerciseInput')];
  let exerciseDurationInputs = [];
  for (const input of exerciseInputBoxes) {
    if (input.classList.contains('time')) {
      exerciseDurationInputs.push(parseInt(input.value));
      if (exerciseDurationInputs.length === 3) {
        workoutObj.exercises[input.dataset.exerciseIndex]['exercise-dur'] = convertToSeconds(exerciseDurationInputs);
        exerciseDurationInputs = [];
      }
    }
    workoutObj.exercises[input.dataset.exerciseIndex][input.id] = input.value;
  }
  calcRestDuration();
  calcWorkoutDuration();
}


// Calculate rest duration for each interval
function calcRestDuration() {
  const restInputs = document.querySelectorAll('.restInput');
  const values = [];
  for (const input of restInputs) {
    values.push(parseInt(input.value));
  }
  workoutObj.restDuration = convertToSeconds(values);
}

// Calculate the overall workout duration
function calcWorkoutDuration() {
  const exercises = workoutObj.exercises;
  workoutObj.workoutDuration = 0;
  for (const exercise of exercises) {
    workoutObj.workoutDuration += exercise['exercise-dur'];
  }
  const totalRestDuration =
    workoutObj.restDuration * workoutObj.exercises.length;
  workoutObj.workoutDuration = workoutObj.workoutDuration + totalRestDuration;
}

// Converts time duration to seconds array format must be [hour, minutes, seconds]
function convertToSeconds(digitalTime) {
  const totalSeconds = digitalTime[0] * 3600 + digitalTime[1] * 60 + digitalTime[2];
  return totalSeconds;
}

// Displays a list of each exercise in the workout for validation
function displayWorkoutObj() {
  const workoutTitle = document.querySelector('.workout-title');
  workoutTitle.textContent = `Workout name: ${workoutObj.workoutName}`;
  const restDurItem = document.querySelector('.rest-info');
  restDurItem.textContent = `Rest intervals: ${workoutObj.restDuration}`;
  cloneDisplayTemplate();
}

// Clones the display template and adds it to the main DOM (Note: Change function name)
function cloneDisplayTemplate() {
  const displayTemplate = document.querySelector('#exerciseDisplayTemplate');
  const displayContainer = document.querySelector('#validationContainer');

  for (const exercise of workoutObj.exercises) {
    const cloned = displayTemplate.content.cloneNode(true);
    cloned.querySelector('.exerciseDis-name').textContent = `Exercise name: ${exercise['exercise-name']}`;
    cloned.querySelector('.exerciseDis-desc').textContent = `Exercise Description ${exercise['exercise-desc']}`;
    const time = [Math.floor(exercise['exercise-dur'] / 3600), Math.floor((exercise['exercise-dur'] % 3600) / 60), exercise['exercise-dur'] % 60];
    for (const unit of time) {
      if (unit.toString().length === 1) {
        const number = unit;
        const index = time.indexOf(unit);
        const newAttribute = `0${number}`;
        time[index] = newAttribute;
      }
    }
    cloned.querySelector('.exerciseDis-dur').textContent = `Exercise duration: ${time[0]}:${time[1]}:${time[2]}`;
    displayContainer.append(cloned);
  }
}

// Set the workout countdown and exercise countdown
function submitWorkout(event) {
  if (event.target.classList.contains('submit-btn')) {
    userData.addWorkout(workoutObj);
    userData.saveData();
    const timeElement = document.createElement('timer-item');
    const timeContainer = document.querySelector('.timer');
    timeContainer.append(timeElement);
    formElements.workoutForm.classList.add('hidden');
  }
}

// calls every function to run application
function main() {
  const timerSetupBtn = document.querySelector('.setupTimer-btn');
  formElemHandles();
  timerSetupBtn.addEventListener('click', displayForm);
  formElements.workoutForm.addEventListener('click', formNavigation);
  formElements.workoutForm.addEventListener('click', populateObject);
  formElements.workoutForm.addEventListener('click', submitWorkout);
}

// starts application
main();
