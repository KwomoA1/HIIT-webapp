
// Constant for class selectors
const SELECTORS = {
  // HTML Template selectors
  exerciseFormTpl: '#exerciseFormTemplate',
  exerciseDisTpl: '#exerciseDisplayTemplate',
  // Template input field Selectors
  exerciseInputFlds: '.exerciseInput',
  exerciseFldLabels: '.exerciseLabel',
  exerciseHeader: '#exercise-title',
  // Template label Selectors
  exerciseNameHdr: '.exerciseDis-name',
  exerciseDescHdr: '.exerciseDis-desc',
  exerciseDurHdr: '.exerciseDis-dur',
  sectionDivider: '.line',
  // Form Selectors
  workoutForm: '#workout-form',
  formSection: '.formSection',
  section2: '#exercise-form',
  workoutHeader: '.workout-title',
  restDurCont: '.rest-info',
  workoutDataCont: '#validationContainer',
  restDurHeader: '.rest-label',
  // Form input selectors
  workoutNameFld: '#workout-name',
  numExerciseFld: '#num-exercises',
  restInpFields: '.restInput',
  // Button selectors
  setupBtn: '.setupTimer-btn',
  // Web component selectors
  timerSection: '.timer',
};

// Stores references to objects
const formElements = {};
export let workoutObj = {};

// Stores the form element UI handles in formElements
function formElemHandles() {
  formElements.workoutForm = document.querySelector(SELECTORS.workoutForm);
  formElements.formSections = [...formElements.workoutForm.querySelectorAll(SELECTORS.formSection)];
  formElements.wrkNameInput = document.querySelector(SELECTORS.workoutNameFld);
  formElements.numExInput = document.querySelector(SELECTORS.numExerciseFld);
}

// Sets the formIndex and toggles the active class on the form section which index corresponds with the formIndex
function displayForm() {
  const setupBtn = document.querySelector(SELECTORS.setupBtn);
  setupBtn.classList.add('hidden');

  formElements.formIndex = parseInt(
    formElements.formSections.find((step) => {
      return step.classList.contains('active');
    })?.dataset.step); // If not active class is found it sets it to null

  if (isNaN(formElements.formIndex)) {
    /* Checks if the value is NaN and sets it to 1 */
    formElements.formIndex = 1;
    toggleActive(formElements.formIndex);
  }
}

// Toggles the 'active' class on the form section which step index matches matches the current step
function toggleActive(formIndex) {
  formElements.formSections.forEach((step) => {
    step.classList.toggle('active', parseInt(step.dataset.step) === formIndex);
  });
}

// runs form next and previous button functionality
function formNavHandler(event) {
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

// Removes the cloned template fields from step 2 of the form
function clearInputFields() {
  const exerciseInputField = [
    ...document.querySelectorAll(SELECTORS.exerciseInputFlds),
    ...document.querySelectorAll(SELECTORS.exerciseFldLabels),
    ...document.querySelectorAll('ul'),
    ...document.querySelectorAll('h2'),
    ...document.querySelectorAll(SELECTORS.sectionDivider),
  ];
  for (const input of exerciseInputField) {
    input.remove();
  }
}


// Sets the workout name and generates default data for exercises based on form section 1 input
function populateWorkoutObj(event) {
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
      'exercise-dur': '',
    };
    workoutObj.exercises.push(exerciseObj);
  }
}

// Clones a template to the webpage accepts a number as an argument will produce clones
function cloneTemplate(number) {
  const exFormTemplate = document.querySelector(SELECTORS.exerciseFormTpl);
  const formSection2 = document.querySelector(SELECTORS.section2);

  for (let i = 0; i < number; i++) {
    const cloned = exFormTemplate.content.cloneNode(true);
    const exerciseHeader = cloned.querySelector(SELECTORS.exerciseHeader);
    exerciseHeader.textContent = `exercise ${i + 1}`;
    const templateInputs = [...cloned.querySelectorAll(SELECTORS.exerciseInputFlds)];
    setExerciseIndex(templateInputs, i);
    formSection2.insertBefore(cloned, document.querySelector(SELECTORS.restDurHeader));
  }
}

// Sets the each input custom attribute exercise index to the matching index used later for sending input values to the object
function setExerciseIndex(clonedInputsBoxes, index) {
  for (const input of clonedInputsBoxes) {
    input.dataset.exerciseIndex = index;
  }
}

// Adds input values to workout object
function submitExercises() {
  const exerciseInputBoxes = [...document.querySelectorAll(SELECTORS.exerciseInputFlds)];
  let exerciseDurationInputs = [];
  for (const input of exerciseInputBoxes) {
    if (input.classList.contains('time')) {
      exerciseDurationInputs.push(parseInt(input.value));
      if (exerciseDurationInputs.length === 3) {
        workoutObj.exercises[input.dataset.exerciseIndex]['exercise-dur'] = convertToSeconds(exerciseDurationInputs);
        if (workoutObj.exercises[input.dataset.exerciseIndex]['exercise-dur'] === 0) {
          window.alert(`Exercise duration must be at least 1 seconds, Error location: exercise: ${workoutObj.exercises[input.dataset.exerciseIndex]['exercise-name']} please go back and change`);
        }
        // Once array length reaches 3 its emptied so it can be refilled again
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
  const restInputs = document.querySelectorAll(SELECTORS.restInpFields);
  const values = [];
  for (const input of restInputs) {
    values.push(parseInt(input.value));
  }
  workoutObj.restDuration = convertToSeconds(values);
  if (workoutObj.restDuration === 0) {
    workoutObj.restDuration = 1;
  }
}

// Calculate the overall workout duration
function calcWorkoutDuration() {
  const exercises = workoutObj.exercises;
  workoutObj.workoutDuration = 0;
  for (const exercise of exercises) {
    workoutObj.workoutDuration += exercise['exercise-dur'];
  }
  const totalRestDuration = workoutObj.restDuration * (workoutObj.exercises.length - 1); // Final exercise should not have a rest period after it
  workoutObj.workoutDuration = workoutObj.workoutDuration + totalRestDuration;
}

// Converts time duration to seconds array format must be [hour, minutes, seconds]
function convertToSeconds(digitalTime) {
  const totalSeconds = digitalTime[0] * 3600 + digitalTime[1] * 60 + digitalTime[2];
  return totalSeconds;
}

// Displays a list of each exercise in the workout for validation
function displayWorkoutObj() {
  const workoutTitle = document.querySelector(SELECTORS.workoutHeader);
  workoutTitle.textContent = `Workout name: ${workoutObj.workoutName}`;
  const restDurItem = document.querySelector(SELECTORS.restDurCont);
  restDurItem.textContent = `Rest intervals: ${formatTime(workoutObj.restDuration)}`;
  cloneDisplayTemplate(restDurItem);
}

// Clones the display template and adds it to the main DOM (Note: Change function name)
function cloneDisplayTemplate(location) {
  const displayTemplate = document.querySelector(SELECTORS.exerciseDisTpl);
  const displayContainer = document.querySelector(SELECTORS.workoutDataCont);

  for (const exercise of workoutObj.exercises) {
    const cloned = displayTemplate.content.cloneNode(true);
    cloned.querySelector(SELECTORS.exerciseNameHdr).textContent = `Exercise name: ${exercise['exercise-name']}`;
    cloned.querySelector(SELECTORS.exerciseDescHdr).textContent = `Exercise Description ${exercise['exercise-desc']}`;
    cloned.querySelector(SELECTORS.exerciseDurHdr).textContent = `Exercise duration: ${formatTime(exercise['exercise-dur'])}`;
    displayContainer.insertBefore(cloned, location);
  }
}

// Converts the exercise duration into a digital clock format
function formatTime(seconds) {
  const hmsTime = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60];
  for (const unit of hmsTime) {
    if (unit.toString().length === 1) {
      const duration = unit;
      const unitIndex = hmsTime.indexOf(unit);
      const newFormat = `0${duration}`;
      hmsTime[unitIndex] = newFormat;
    }
  }
  const digiClockFormat = `${hmsTime[0]}:${hmsTime[1]}:${hmsTime[2]}`;
  const format = sliceTimeFormat(digiClockFormat);
  return format;
}

// Removes any units of time not being used e.g. 00:01:00 turns into 1:00
function sliceTimeFormat(digitalTime) {
  let index = 0;
  for (const char of digitalTime) {
    if (parseInt(char) > 0) {
      index = digitalTime.indexOf(char);
      break;
    }
  }
  return digitalTime.slice(index);
}

// Set the workout countdown and exercise countdown
function submitWorkout(event) {
  if (event.target.classList.contains('submit-btn')) {
    const timeElement = document.createElement('timer-item');
    const timeContainer = document.querySelector(SELECTORS.timerSection);
    timeContainer.append(timeElement);
    formElements.workoutForm.classList.add('hidden');
  }
}

// calls every function to run application
function main() {
  const timerSetupBtn = document.querySelector(SELECTORS.setupBtn);
  formElemHandles();
  timerSetupBtn.addEventListener('click', displayForm);
  formElements.workoutForm.addEventListener('click', formNavHandler);
  formElements.workoutForm.addEventListener('click', populateWorkoutObj);
  formElements.workoutForm.addEventListener('click', submitWorkout);
}

// starts application
main();
