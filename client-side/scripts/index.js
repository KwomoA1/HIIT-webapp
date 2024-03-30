//TODO:Function to navigate between steps of the form.

// Stores references to UI objects 
const ui = {} 

function setupUiReferences(){
    ui.createWrkBtn = document.querySelector('#create-Btn');
    ui.formSections = document.querySelectorAll('form > section');
    ui.nextStepBtns = document.querySelectorAll('.nextStepBtns');
    ui.prevStepBtns = document.querySelectorAll('.prevStepBtns') 
    ui.nextBtns = document.querySelectorAll('.nextBtns');
    ui.prevBtns = document.querySelectorAll('.prevBtns')
}

function setupForm(){
    for(const section of ui.formSections){
        if(section.classList.contains('hidden') && section.dataset.step == 1){
            section.classList.remove('hidden');
        }
    }
}


// calls every function to run application
function main(){
    setupUiReferences();
    ui.createWrkBtn.addEventListener('click',setupForm);
}

//starts application
main() 