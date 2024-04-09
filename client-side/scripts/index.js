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
    formElems.exTitle = document.querySelector('#exerTitle');
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
                        exerciseNavigation();
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
    const form2Section = document.querySelector('#exercise-form');
    let exerciseIndex = parseInt(form2Section.dataset.workoutindex);
    console.log(exerciseIndex)
    formElems.exTitle.textContent = ` ${workoutObj.exercises[exerciseIndex].exerciseName}`;

    for(i=0; i < ui.nextBtns.length; i++){
        ui.nextBtns[i].addEventListener('click',function(){
            if(exerciseIndex < workoutObj.exercises.length-1){
                exerciseIndex += 1;
                formElems.exTitle.textContent = `${workoutObj.exercises[exerciseIndex].exerciseName}`;
            } 
            
        })
    }

    for(i=0; i < ui.prevBtns.length; i++){
        ui.prevBtns[i].addEventListener('click',function(){
            if(exerciseIndex > 0){
                exerciseIndex -= 1;
                formElems.exTitle.textContent = `${workoutObj.exercises[exerciseIndex].exerciseName}`
            } 

            
        })
    }

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
    FormElemReferences();
    setupUiReferences();
    formNavigation();
    ui.createWrkBtn.addEventListener('click',setupForm);
    console.log(workoutObj);
}

//starts application
main() 