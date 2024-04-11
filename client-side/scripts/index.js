//TODO:Function to navigate between steps of the form.

// Stores references to UI objects 
const ui = {};
const formElems = {};

let workoutObj = {
    workoutName: '',
    exercises:[]
};

// Obtains handles on UI objects
function uiHandles(){
    ui.createWrkBtn = document.querySelector('#create-Btn');
}

// Obtain handles on form element objects 
function formElemHandles(){
    formElems.workoutForm = document.querySelector('#workout-form');
    formElems.formSteps = [...formElems.workoutForm.querySelectorAll('.formSection')];
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

function displayCurrentStep(currentStep){
    formElems.formSteps.forEach((step)=>{
        step.classList.toggle('active',parseInt(step.dataset.step) === currentStep)
    });
}

function createWrkObject(){
    workoutObj.workoutName = formElems.wrkName.value; 
    for(let i = 0; i < formElems.numEx.value; i++){
        exerciseObj = {
            exerciseName: `exercises ${i+1}`,
            'exercise description': ``,
            'exercise duration': ``,
            'rest duration': ``
        }
        workoutObj.exercises.push(exerciseObj)
    }
}


// calls every function to run application
function main(){
    uiHandles();
    formElemHandles();
    ui.createWrkBtn.addEventListener('click',formStepHandler);
}

//starts application
main() 