/*
TODO:
- Ensure there are no bugs in the code for the form and make sure functions are readable and maintainable.
BUGS:
- None 
*/

// Stores references to objects 
const ui = {};
const formElems = {};
let workoutObj = {};

// Obtains handles on UI objects
function uiHandles(){
    ui.createWrkBtn = document.querySelector('#create-Btn');
}

// Obtain handles on form element objects 
function formElemHandles(){
    formElems.workoutForm = document.querySelector('#workout-form');
    formElems.formSteps = [...formElems.workoutForm.querySelectorAll('.formSection')];
    formElems.workoutNameInput = document.querySelector('#workout-name');
    formElems.numExInput = document.querySelector('#num-exercises');
    formElems.exerciseTitle = document.querySelector('#exerTitle');

    formElems.exName = document.querySelector('#exerciseName');
    formElems.exDesc = document.querySelector('#exerciseDesc');
    formElems.exMin = document.querySelector('#exerciseMin');
    formElems.exSec = document.querySelector('#exerciseSec');
    formElems.restMin = document.querySelector('#restMin');
    formElems.restSec = document.querySelector('#restSec');

}

// Finds the step which contains the active class and displays it 
// ? Chaining operator returns undefined and prevents type error if no class contains the active class
function formStepHandler(){

    let currentStep = parseInt(
        formElems.formSteps.find((step)=>{
            return step.classList.contains('active')
    })?.dataset.step); 

    if(isNaN(currentStep)){ //Checks if the value is NaN and sets it to 0 
        currentStep = 1;
        displayCurrentStep(currentStep);
    }

    formElems.workoutForm.addEventListener('click',event=>{
        if(event.target.classList.contains('nextStepBtns')){
            currentStep += 1;
            displayCurrentStep(currentStep);
        } else if (event.target.classList.contains('prevStepBtns')){
            currentStep -=1;
            displayCurrentStep(currentStep);
        }
    })
  
}

// Displays the current step on the web page 
function displayCurrentStep(currentStep){
    formElems.formSteps.forEach((step)=>{
        step.classList.toggle('active',parseInt(step.dataset.step) === currentStep)
    });
}

// Creates the workout object and adds exercise objects in it.
function createWrkObject(){
    formElems.workoutForm.addEventListener('click',event=>{
        if(event.target.value == 'submitWrkData'){
            workoutObj.workoutName = formElems.workoutNameInput.value;
            workoutObj.exercises = [];
            for(let i = 0; i < formElems.numExInput.value; i++){
                exerciseObj = {
                    "exercise-name": `exercises ${i+1}`,
                    "exercise-desc": '',
                    "exercise-min": '',
                    "exercise-sec": '',
                    "rest-min": '',
                    "rest-sec": ''
                }
                workoutObj.exercises.push(exerciseObj)
            }
            formStep2Handler();
        }
    })
}

// Updates the exercise in the workout object / Clears input values / Updates input values 
function formStep2Handler(){
    let workoutIndex = parseInt(document.querySelector('#exercise-form').dataset.workoutindex);
    formElems.exerciseTitle.textContent = workoutObj.exercises[workoutIndex]['exercise-name'];
    obtainExerciseValues(workoutIndex);
    checker(workoutIndex, workoutObj.exercises.length);

    formElems.workoutForm.addEventListener('click',event=>{
        if((event.target.classList.contains('nextBtns') || event.target.classList.contains('nextStepBtns')) && workoutIndex < workoutObj.exercises.length){ // Next step btn condition is included for the final exercise
            updateExercise(workoutIndex);
            workoutIndex += 1;
            obtainExerciseValues(workoutIndex);
            formElems.exerciseTitle.textContent = workoutObj.exercises[workoutIndex]['exercise-name'];
            checker(workoutIndex,workoutObj.exercises.length);

        } else if (event.target.classList.contains('prevBtns') && workoutIndex > 0){
            updateExercise(workoutIndex);
            workoutIndex -= 1;
            obtainExerciseValues(workoutIndex);
            formElems.exerciseTitle.textContent = workoutObj.exercises[workoutIndex]['exercise-name'];
            checker(workoutIndex,workoutObj.exercises.length);
        } 
    })

    formElems.workoutForm.addEventListener('click', event=>{
        if(event.target.classList.contains('nextStepBtns')){
            formStep3Handler()
        }
    })
}

// Displays the whole workout to allow user to verify they're happy with the data
function formStep3Handler(){
    const mainBody = document.querySelector('#validationContainer');

    for(const exercise of workoutObj.exercises){
        let exerciseIndex = workoutObj.exercises.indexOf(exercise);
        const exerciseList = document.createElement('ul');
        for(const attribute in exercise){
            const attributeItem = document.createElement('li');
            attributeItem.textContent = workoutObj.exercises[exerciseIndex][attribute];
            exerciseList.append(attributeItem);
        }
        mainBody.append(exerciseList);
    }
}

// Displays previous step or next step button depending on the exercises position within the array
function checker(exerciseStep, exerciseLength){
    prevStepBtn = document.querySelector('#section2-prevSbtn');
    nextStepBtn = document.querySelector('#section2-nextSbtn');

    if(exerciseStep === 0){
        prevStepBtn.classList.remove('hidden')
    } else {
        prevStepBtn.classList.add('hidden')
    }

    if(exerciseStep === exerciseLength - 1){
        nextStepBtn.classList.remove('hidden');
    } else {
        nextStepBtn.classList.add('hidden');
    }
}

// Adds the input values from the form to the workout object.
function updateExercise(exerciseIndex){
    const step2 = document.querySelector('#exercise-form');
    const step2Inputs = [...step2.querySelectorAll('input')];
    step2Inputs.forEach((inputBox)=>{
        workoutObj.exercises[exerciseIndex][inputBox.id] = inputBox.value;
    })
}

// Obtains each exercises attributes and sets the corresponding input boxes values to those attributes
function obtainExerciseValues(exerciseIndex){
    const step2 = document.querySelector('#exercise-form');
    const step2Inputs = [...step2.querySelectorAll('input')];
    step2Inputs.forEach((inputBox)=>{
        inputBox.value = workoutObj.exercises[exerciseIndex][inputBox.id];
    })
  
}

// calls every function to run application
function main(){
    uiHandles();
    formElemHandles();
    ui.createWrkBtn.addEventListener('click',formStepHandler);
    ui.createWrkBtn.addEventListener('click',createWrkObject);
}

//starts application
main() 