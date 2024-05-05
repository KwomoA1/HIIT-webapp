// TODO : Add CSS to workout main page and form
// Stores references to objects
const ui = {};
const formElements = {};
export let workoutObj = {};


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
  const restInputs = document.querySelector('#rest-inputs');
  step2Form.insertBefore(cloned, restInputs);
}

// Create workout object and clone input boxes
function createWrkObject() {
  formElements.workoutForm.addEventListener('click', event => {
    if (event.target.classList.contains('submitWrkData')) {
      workoutObj.workoutName = formElements.workoutNameInput.value;
      workoutObj.exercises = [];
      workoutObj.restDuration = 0;
      for (let i = 0; i < formElements.numExInput.value; i++) {
        const exerciseObj = {
          'exercise-name': `exercises ${i + 1}`,
          'exercise-desc': '',
          'exercise-hour': '',
          'exercise-min': '',
          'exercise-sec': '',
          'exercise-dur': '',
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
    workoutObj.exercises[input.dataset.exerciseIndex][input.id] = input.value;
  }
  calculateDuration();
  const workoutDuration = [...workoutObj.exercises];
  workoutObj.totalWorkoutDuration = 0;
  for (const exercise of workoutDuration) {
    workoutObj.totalWorkoutDuration += exercise['exercise-dur'];
  }

  workoutObj.totalWorkoutDuration = workoutObj.totalWorkoutDuration + (workoutObj.restDuration * workoutObj.exercises.length);
}

// Calculate rest duration
function calculateRestDuration() {
  const restInputs = [...document.querySelectorAll('.restInput')];
  const values = [];
  for (const input of restInputs) {
    values.push(parseInt(input.value));
  }
  workoutObj.restDuration = convertToSeconds(values);
}


// Calculate the total duration of the exercise using the hour, minutes, seconds values
function calculateDuration() {
  const exercises = workoutObj.exercises;
  for (const exercise of exercises) {
    const exerciseDuration = [parseInt(exercise['exercise-hour']), parseInt(exercise['exercise-min']), parseInt(exercise['exercise-sec'])];
    exercise['exercise-dur'] = convertToSeconds(exerciseDuration);
  }
  calculateRestDuration();
}


// Converts time duration to seconds array format must be [hour, minutes, seconds]
function convertToSeconds(digitalTime) {
  const totalSeconds = digitalTime[0] * 3600 + digitalTime[1] * 60 + digitalTime[2];
  return totalSeconds;
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
    mainBody.append(exerciseList);
  }

  const restDurItem = document.createElement('li');
  restDurItem.textContent = `Rest Duration: ${workoutObj.restDuration}`;
  mainBody.append(restDurItem);

  formElements.workoutForm.addEventListener('click', event => {
    if (event.target.classList.contains('submitBtns')) {
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
