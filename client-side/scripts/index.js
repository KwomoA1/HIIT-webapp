//TODO:Function to navigate between steps of the form.

// Stores references to UI objects 
const ui = {};
const formElems = {};
let formIndex;
let workoutObj = {
    workoutName: '',
    exercises:[]
};

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
    formElems.exTitle = document.querySelector('.exTitle');
    formElems.exName = document.querySelector('#exercise-name');
    formElems.exDesc = document.querySelector('#exercise-desc');
    formElems.exDur = document.querySelector('#exercise-dur');
    formElems.restDur = document.querySelector('#rest-dur');
}

function setupForm(){
    formIndex = 1;
    for(const section of ui.formSections){
        if(section.dataset.step == formIndex){
            section.classList.add('active');
        } 
    }
}

function formNavigation(event){
    for(let i =0; i < ui.nextStepBtns.length; i++){
        ui.nextStepBtns[i].addEventListener('click', function(event){
            if(formIndex < 3){
                formIndex += 1;
                ui.formSections.forEach(section=>{
                    section.classList.remove('active');
                    if(section.dataset.step == formIndex){
                        section.classList.add('active');
                    }
                })
            }

            if(event.target.value=="submit"){
                createWrkObject()
                ui.formSections.forEach(section=>{
                    if(section.dataset.step ==2){
                        formElems.exTitle.textContent = `Exercise ${workoutObj.exercises[section.dataset.workoutIndex + 1]}`
                    }
                })
            }
        })
    }

    for(let i=0; i < ui.prevStepBtns.length; i++){
        ui.prevStepBtns[i].addEventListener('click',function(){
            if(formIndex > 1){
                formIndex -=1;
                ui.formSections.forEach(section=>{
                    section.classList.remove('active');
                    if(section.dataset.step == formIndex){
                        section.classList.add('active');
                    }
                })
            }
        })
    }
}

function exerciseNavigation(){

}

function createWrkObject(){
    workoutObj.workoutName = formElems.wrkName.textContent; 
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
    FormElemReferences();
    setupUiReferences();
    formNavigation();
    ui.createWrkBtn.addEventListener('click',setupForm);
    console.log(workoutObj);
}

//starts application
main() 