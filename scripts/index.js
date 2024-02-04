
// elements 
const stopwatchLabel = document.querySelector('#stopwatch');
const startTimerButton = document.querySelector('#startButton');
const warmUpTimerButton = document.querySelector('#warmUpTimer');
const restTimerButton = document.querySelector('#restTimer');
const setsButton = document.querySelector('#setsLabel');
const minutesSecondsEditor = document.querySelector('#minutesSecondsForm');
const minutesInput = document.querySelector('#minutes');
const secondsInput = document.querySelector('#seconds');

// Event Listeners 
warmUpTimer.addEventListener('click',displayWidget);
startButton.addEventListener('click', displayWidget);
excerciseTimer.addEventListener('click',displayWidget);
restTimer.addEventListener('click',displayWidget);


//Display element on page.
function displayWidget(){
    const form = document.querySelector('#minutesSecondsForm');
    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
        return;
    }
    form.classList.add('hidden');
}

