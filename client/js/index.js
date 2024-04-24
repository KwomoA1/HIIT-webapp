/*

TODO:

BUGS:
- None

*/

// Imports


// Stores references to objects
const ui = {};
const formElements = {};
let workoutObj = {};

// Stores main DOM ui element handles in ui
function uiHandles() {
  ui.createWrkBtn = document.querySelector('#create-Btn');
}

// Stores the form element ui handles in formElements
function formElemHandles() {
  formElements.title = document.querySelector('.formTitle');
  formElements.workoutForm = document.querySelector('#workout-form');
  formElements.formSteps = [...formElements.workoutForm.querySelectorAll('.formSection')];
  formElements.workoutNameInput = document.querySelector('#workout-name');
  formElements.numExInput = document.querySelector('#num-exercises');
}

// This function displays the step in the multi-step form which contains the class 'active'
function displayActiveStep() {
  ui.createWrkBtn.classList.add('hidden');
  let currentStep = parseInt(
    formElements.formSteps.find((step) => {
      return step.classList.contains('active');
    })?.dataset.step); // If not active class is found it sets it to null
  if (isNaN(currentStep)) { /* Checks if the value is NaN and sets it to 1 */
    currentStep = 1;
    displayCurrentStep(currentStep);
  }

  formElements.workoutForm.addEventListener('click', event => {
    if (event.target.classList.contains('nextStepBtns')) {
      currentStep += 1;
      displayCurrentStep(currentStep);
      if (currentStep === 3) {
        submitExercises();
        formStep3Handler();
      }
    } else if (event.target.classList.contains('prevStepBtns')) {
      currentStep -= 1;
      displayCurrentStep(currentStep);
      if (currentStep === 1) {
        clearWorkoutObj();
        clearInputFields();
      }
    }
  });
}


// Displays the current step on the web page
function displayCurrentStep(currentStep) {
  formElements.formSteps.forEach((step) => {
    step.classList.toggle('active', parseInt(step.dataset.step) === currentStep);
  });
}

// Duplicates exercises form template to DOM
function cloneTemplate(exerciseIndex) {
  const exerciseTemplate = document.querySelector('#exerciseFormTemplate');
  const step2Form = document.querySelector('#exercise-form');
  const cloned = exerciseTemplate.content.cloneNode(true);
  const title = cloned.querySelector('#exercise-title');
  title.textContent = `exercise ${exerciseIndex + 1}`;
  const group = [...cloned.querySelectorAll('.exerciseInput')];
  group.forEach((inputBox) => {
    inputBox.dataset.exerciseIndex = exerciseIndex;
  });
  const navBtns = document.querySelector('#nav-buttons');
  step2Form.insertBefore(cloned, navBtns);
}

// Create workout object and clone input boxes
function createWrkObject() {
  formElements.workoutForm.addEventListener('click', event => {
    if (event.target.classList.contains('submitWrkData')) {
      workoutObj.workoutName = formElements.workoutNameInput.value;
      workoutObj.exercises = [];
      for (let i = 0; i < formElements.numExInput.value; i++) {
        const exerciseObj = {
          'exercise-name': `exercises ${i + 1}`,
          'exercise-desc': '',
          'exercise-hour': '',
          'exercise-min': '',
          'exercise-sec': '',
          'rest-hour': '',
          'rest-min': '',
          'rest-sec': '',
        };
        workoutObj.exercises.push(exerciseObj);
        cloneTemplate(i);
      }
    }
  });
}

// Adds input values to workout object
function submitExercises() {
  const exerciseInputBoxes = [...document.querySelectorAll('.exerciseInput')];
  for (const input of exerciseInputBoxes) {
    if (input.type === 'number') {
      if (input.value.length === 1) {
        input.value = `0${input.value}`;
      }
    }
    workoutObj.exercises[input.dataset.exerciseIndex][input.id] = input.value;
  }
}

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
    const restDurItem = document.createElement('li');
    restDurItem.textContent = `Rest duration: ${workoutObj.exercises[exerciseIndex]['rest-hour']}:${workoutObj.exercises[exerciseIndex]['rest-min']}:${workoutObj.exercises[exerciseIndex]['rest-sec']}`;
    exerciseList.append(restDurItem);

    mainBody.append(exerciseList);
  }
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


// calls every function to run application
function main() {
  uiHandles();
  formElemHandles();
  ui.createWrkBtn.addEventListener('click', displayActiveStep);
  ui.createWrkBtn.addEventListener('click', createWrkObject);
}

// starts application
main();
