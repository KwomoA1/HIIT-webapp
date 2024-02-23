/*
A workout is considered an object it's attribute being its name and multiple exercises in it
Each excerise is an object with a property of name, description and duration
Because there is multiple exercises an array is needed 
Each user can have multiple workouts therefore an array is needed.
*/

//TODO: Complete code so once the submit button is pressed input fields are generated for each exercise and stored as json
function init(){
    const createWorkoutBtn = document.querySelector('#create-workout');
    createWorkoutBtn.addEventListener('click',displayElement);

    const workoutFormSubmitBtn = document.querySelector('#submit-workout-form');
    workoutFormSubmitBtn.addEventListener('click',obtainInfo);
}


// Displays the create workout form inputs 
function displayElement(){
    const createWorkoutForm = document.querySelector("#workout-form-init");
    if(createWorkoutForm.classList.contains('hidden')){
        createWorkoutForm.classList.remove('hidden');
    }else{
        createWorkoutForm.classList.add('hidden');
    }
}

//Obtains Workout name and number exercises to store 
function obtainInfo(){
    const workoutNameInput = document.querySelector('#workout-name');
    const exerciseNumberInput = document.querySelector('#exercise-number');
    
    let workoutName =  workoutNameInput.value;
    let exerciseNum = exerciseNumberInput.value; 
    console.log(workoutName);
    console.log(exerciseNum);
}


window.addEventListener('load', init);