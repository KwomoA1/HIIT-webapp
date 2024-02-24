/*
A workout is considered an object it's attribute being its name and multiple exercises in it
Each excerise is an object with a property of name, description and duration
Because there is multiple exercises an array is needed 
Each user can have multiple workouts therefore an array is needed.
*/

//TODO: Complete code so once the submit button is pressed input fields are generated for each exercise and stored as json


const workoutObj = {
    "workout name": "",
    "exercises": [] 
}

function init(){
    const createWorkoutBtn = document.querySelector('#create-workout');
    createWorkoutBtn.addEventListener('click',displayElement);

    const workoutFormSubmitBtn = document.querySelector('#submit-workout-form');
    workoutFormSubmitBtn.addEventListener('click',generateEditButtons);
    workoutFormSubmitBtn.addEventListener('click',createWorkoutObject);
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

// Sends objects arguments in
const pastObject = createWorkoutObject.bind(workoutObj);

// Create workout object and stores it in json format 
function createWorkoutObject(workoutObject){
    const workoutName = document.querySelector('#workout-name');
    const exerciseNumInput = document.querySelector('#exercise-number');

    workoutObj["workout name"] = workoutName.value;

    for(let index = 0; index < exerciseNumInput.value; index++){
        const exerciseObj = {
            "name": `Exercise ${index + 1}`,
            "description": `This is exercise ${index + 1}`,
            "duration": 0
        }
        workoutObj["exercises"].push(exerciseObj)
    }
    console.log(workoutObj["workout name"]);
    console.log(workoutObj["exercises"]);
}

// Generate buttons to edit each exercise 
function generateEditButtons(){
    const exerciseNumInput = document.querySelector('#exercise-number');
    const setupWorkoutSection = document.querySelector('#edit-exercises-buttons');
    const createWorkoutBtn = document.querySelector('#create-workout');
    const workoutForm = document.querySelector('#workout-form-init');

    createWorkoutBtn.classList.add('hidden');
    workoutForm.classList.add('hidden');

// Creates buttons based on number of exercises and sets the attribute 
    for(let index = 0; index < exerciseNumInput.value; index++){
        const editExerciseBtn = document.createElement('button');
        editExerciseBtn.setAttribute('id',`Exercise${index}-button`);
        editExerciseBtn.setAttribute('class','wrapper'); //wrapper is a class element which sets element display to block
        editExerciseBtn.textContent = `Edit exercise ${index + 1}`;
        setupWorkoutSection.appendChild(editExerciseBtn);

        editExerciseBtn.addEventListener('click',clickSpecial);
    }

    function clickSpecial(){
        console.log("Hello")
    }
}


window.addEventListener('load', init);