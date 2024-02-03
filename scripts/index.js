

window.addEventListener("load",init) 


// Initialise all elements for page to work 
function init(){
    const stopwatch = document.querySelector('#stopwatch');
    const timerTitle = document.querySelector('#timerTitle');
    const excerciseDisplay = document.querySelector('#excerciseDisplay');
    const startButton = document.querySelector('#startButton');
    const warmUpTimer = document.querySelector('#warmUpTimer');
    const excerciseTimer = document.querySelector('#excerciseTimer');
    const restTimer = document.querySelector('#restTimer');
    const setsInput = document.querySelector('#setslabel');
    const timer = document.querySelector('form');
    const minutesInput = document.querySelector('#minutes');
    const secondsInput = document.querySelector('#seconds');

    warmUpTimer.addEventListener('click',displayWidget);
    startButton.addEventListener('click', displayWidget);
    excerciseTimer.addEventListener('click',displayWidget);
    restTimer.addEventListener('click',displayWidget);
    minutesInput.addEventListener('change',storeTime);
    secondsInput.addEventListener('change',storeTime);
    
}

function displayWidget(){
    const form = document.querySelector('#minutesSecondsForm');
    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
        return;
    }
    form.classList.add('hidden');
}

function storeTime(){
    const minutesElement = document.querySelector('#minutes');
    const secondsElement = document.querySelector('#seconds');

    const minValue = minutesElement.value; 
    const secValue = minutesElement.value; 

    console.log(minValue);
    console.log(secValue);
}

