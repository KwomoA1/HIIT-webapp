//TODO:Function to navigate between steps of the form.

// Stores references to UI objects 
const ui = {} 
const formElems = {}
let workoutObj = {
    workoutName: '',
    exercises:[]
}

function setupUiReferences(){
    ui.createWrkBtn = document.querySelector('#create-Btn');
    ui.formSections = document.querySelectorAll('form > section');
    ui.nextStepBtns = document.querySelectorAll('.nextStepBtns');
    ui.prevStepBtns = document.querySelectorAll('.prevStepBtns');
    ui.numExElem = document.querySelector('#num-exercises');
    ui.nextBtns = document.querySelectorAll('.nextBtns');
    ui.prevBtns = document.querySelectorAll('.prevBtns');
}

function FormElemReferences(){
    formElems.wrkName = document.querySelector('#workout-name');
    formElems.numEx = document.querySelector('#num-exercises');
    formElems.exName = document.querySelector('#exercise-name');
    formElems.exDesc = document.querySelector('#exercise-desc');
    formElems.exDur = document.querySelector('#exercise-dur');
    formElems.restDur = document.querySelector('#rest-dur');
}

function setupForm(){
    for(const section of ui.formSections){
        if(section.classList.contains('hidden') && section.dataset.step == 1){
            section.classList.remove('hidden');
        }
    }
}

function createWrkObject(){
    workoutObj.workoutName = formElems.wrkName.textContent; 
    for(let i = 0; i < formElems.numEx.value; i++){
        execriseObj = {
            'exercise name': `exercises ${i+1}`,
            'exercise description': ``,
            'exercise duration': ``,
            'rest duration': ``
        }
        workoutObj.exercises.push(exerciseObj)
    }
}


// calls every function to run application
function main(){
    setupUiReferences();
    ui.createWrkBtn.addEventListener('click',setupForm);
    ui.numExElem.addEventListener('input',createWrkObject);
    console.log(workoutObj);
}

//starts application
main() 