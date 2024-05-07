// TODO : Increase code maintainability

// Stores references to objects
const formElements = {};
export let workoutObj = {};

// Stores the form element ui handles in formElements
function formElemHandles() {
  formElements.workoutForm = document.querySelector('#workout-form');
  formElements.formSections = [...formElements.workoutForm.querySelectorAll('.formSection')];
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
    })?.dataset.step); // If not active class is found it sets it to null

  if (isNaN(formElements.formIndex)) { /* Checks if the value is NaN and sets it to 1 */
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
    formStep3Handler();
  }
}

// Handles the functionality for the previous button
function prevBtnHandler() {
  formElements.formindex -= 1;
  toggleActive(formElements.formIndex);
  if (formElements.formIndex === 1) {
    clearWorkoutObj();
    clearInputFields();
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

// Remove annoymous functions

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

// Duplicates exercises form template to DOM
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
  for (const input of exerciseInputBoxes) {
    workoutObj.exercises[input.dataset.exerciseIndex][input.id] = input.value;
  }
  calcExerciseDuration();
  calcRestDuration();
  calcWorkoutDuration();
}

// Calculate the total duration of the exercise using the hour, minutes, seconds values
function calcExerciseDuration() {
  const exercises = workoutObj.exercises;
  for (const exercise of exercises) {
    const exerciseDuration = [parseInt(exercise['exercise-hour']), parseInt(exercise['exercise-min']), parseInt(exercise['exercise-sec'])];
    exercise['exercise-dur'] = convertToSeconds(exerciseDuration);
  }
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
  const totalRestDuration = workoutObj.restDuration * workoutObj.exercises.length;
  workoutObj.workoutDuration = workoutObj.workoutDuration + totalRestDuration;
}

// Converts time duration to seconds array format must be [hour, minutes, seconds]
function convertToSeconds(digitalTime) {
  const totalSeconds = digitalTime[0] * 3600 + digitalTime[1] * 60 + digitalTime[2];
  return totalSeconds;
}

// Turn into template
function formStep3Handler() {
  const mainBody = document.querySelector('#validationContainer');
  const workoutTitle = document.createElement('h2');
  workoutTitle.textContent = `Workout name: ${workoutObj.workoutName}`;
  mainBody.append(workoutTitle);

  for (const exercise of workoutObj.exercises) {
    const exerciseIndex = workoutObj.exercises.indexOf(exercise);
    const exerciseList = document.createElement('ul');
    const exerciseNameItem = document.createElement('li');
    exerciseNameItem.textContent = `Exercise name: ${workoutObj.exercises[exerciseIndex]['exercise-name']}`;
    exerciseList.append(exerciseNameItem);
    const exerciseDescItem = document.createElement('li');
    exerciseDescItem.textContent = `Exercise description: ${workoutObj.exercises[exerciseIndex]['exercise-desc']}`;
    exerciseList.append(exerciseDescItem);
    const exerciseDurItem = document.createElement('li');
    exerciseDurItem.textContent = `Exercise duration: ${workoutObj.exercises[exerciseIndex]['exercise-hour']}:${workoutObj.exercises[exerciseIndex]['exercise-min']}:${workoutObj.exercises[exerciseIndex]['exercise-sec']}`;
    exerciseList.append(exerciseDurItem);
    mainBody.append(exerciseList);
  }

  const restDurItem = document.createElement('li');
  restDurItem.textContent = `Rest Duration: ${workoutObj.restDuration}`;
  mainBody.append(restDurItem);

  formElements.workoutForm.addEventListener('click', event => {
    if (event.target.classList.contains('submit-btn')) {
      submitWorkout();
    }
  });
}

// Clears the entire workout object
function clearWorkoutObj() {
  workoutObj = {};
}

// Removes the clone template fields from step 2 of the form
function clearInputFields() {
  const exerciseInputField = [...document.querySelectorAll('.exerciseInput'), ...document.querySelectorAll('.exerciseLabel'), ...document.querySelectorAll('ul'), ...document.querySelectorAll('h2')];
  for (const input of exerciseInputField) {
    input.remove();
  }
}


// Set the workout countdown and exercise countdown
function submitWorkout() {
  const timeElement = document.createElement('timer-item');
  const timeContainer = document.querySelector('.timer');
  timeContainer.append(timeElement);
  const formContainer = document.querySelector('#workout-form');
  formContainer.classList.add('hidden');
}


// calls every function to run application
function main() {
  const timerSetupBtn = document.querySelector('.setupTimer-btn');
  formElemHandles();
  timerSetupBtn.addEventListener('click', displayForm);
  formElements.workoutForm.addEventListener('click', formNavigation);
  formElements.workoutForm.addEventListener('click', populateObject);
}

// starts application
main();
