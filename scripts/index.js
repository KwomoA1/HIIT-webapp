
window.addEventListener('load',pageInit)

function pageInit(){
    // elements 
    const warmUpTimerButton = document.querySelector('#warmUpTimer');
    const exerciseTimerButton = document.querySelector('#exerciseTimer')
    const restTimerButton = document.querySelector('#restTimer');
    const setsButton = document.querySelector('#setsLabel');
    const minutesSecondsEditor = document.querySelector('#minutesSecondsForm');
    const minutesInput = document.querySelector('#minutes');
    const secondsInput = document.querySelector('#seconds');

    // Event Listeners
    

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