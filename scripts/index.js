
window.addEventListener('load',init)

function init(){
    // elements 
    const stopwatchLabel = document.querySelector('#stopwatch');
    const startTimerButton = document.querySelector('#startButton');
    const warmUpTimerButton = document.querySelector('#warmUpTimer');
    const exerciseTimerButton = document.querySelector('#exerciseTimer')
    const restTimerButton = document.querySelector('#restTimer');
    const setsButton = document.querySelector('#setsLabel');
    const minutesSecondsEditor = document.querySelector('#minutesSecondsForm');
    const minutesInput = document.querySelector('#minutes');
    const secondsInput = document.querySelector('#seconds');

    // Event Listeners 

    warmUpTimerButton.addEventListener('click',displayElement(minutesSecondsEditor));
    startTimerButton.addEventListener('click', displayElement(minutesSecondsEditor));
    exerciseTimerButton.addEventListener('click',displayElement(minutesSecondsEditor));
    restTimerButton.addEventListener('click',displayElement(minutesSecondsEditor));

}


//Display element on page.
function displayElement(element){
    if(element.classList.contains('hidden')){
        element.classList.remove('hidden');
        return;
    }
    element.classList.add('hidden');
}



function displayTimerSetForm(event){
    const form = document.querySelector('#minutesSecondsForm');
    const formTitle = document.querySelector('#formTitle');
    formTitle.textContent = `${event.target.textContent}`;
    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
        return;
    }
    form.classList.add('hidden');
}

/*
// Update each timer value 
function setTotalTime(event){
    const minutesInput = document.querySelector('#minutes');
    const secondsInput = document.querySelector('#seconds');
    totalTime = {
        warmUpTimer:{
            minutes:10,
            seconds:0
        },
        exerciseTimer:{
            minutes:20,
            seconds:0
        },
        restTimer:{
            minutes:30,
            seconds:0
        }
    }

    for(const obj in totalTime){
        if(event.target.textContent == obj){

        }
    }

}

setTotalTime()
*/