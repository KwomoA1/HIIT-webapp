/*
A workout is considered an object it's attribute being its name and multiple exercises in it
Each excerise is an object with a property of name, description and duration
Because there is multiple exercises an array is needed 
Each user can have multiple workouts therefore an array is needed.
*/
/*
Completed: 
- Creates workout
- Edit workouts 
- Store workouts 
*/

//TODO: Messy Code! Update function and variables names, include validation and error handling for functions 


const workoutObj = {
    "workout name": "",
    "exercises": [] 
}

// Loads buttons and event listeners once the page loads 
function init(){
    const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
    createWorkoutBtn.addEventListener('click',displayWorkoutForm);

    const workoutFormSubmitBtn = document.querySelector('#submitWorkoutBtn');
    workoutFormSubmitBtn.addEventListener('click', workoutFormSubmitHandler);

}

function workoutFormSubmitHandler(){
    createWorkoutObject();
    createExerciseInputs();
}


// Displays the create workout form inputs 
function displayWorkoutForm(){
    const createWorkoutForm = document.querySelector("#createWorkoutForm");
    if(createWorkoutForm.classList.contains('hidden')){
        createWorkoutForm.classList.remove('hidden');
    }else{
        createWorkoutForm.classList.add('hidden');
    }
}



// Create workout object and then stores data into the object   
function createWorkoutObject(){
    const workoutNameInput = document.querySelector('#workout-name');
    const exerciseNumInput = document.querySelector('#exercise-number');

    workoutObj["workout name"] = workoutNameInput.value;

    for(let index = 0; index < exerciseNumInput.value; index++){
        let exerciseObj = {
            "name": `Exercise ${index + 1}`,
            "description": `This is exercise ${index + 1}`,
            "duration": 0
        }
        workoutObj["exercises"].push(exerciseObj) //Pushing each exercise object into the array 
    }
}



// Creates input boxes to allow the user to create each exercise and their properties (name, description, duration)
function createExerciseInputs(){
    // Obtain workout form and button to hide it
    const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
    const workoutForm = document.querySelector('#createWorkoutForm');
    createWorkoutBtn.classList.add('hidden');
    workoutForm.classList.add('hidden');

    const exerciseNumInput = document.querySelector('#exercise-number');
    const createExerciseForm = document.querySelector('#edit-exercises-buttons');
    
    //Create workout heading so user knows which workout these exercises will fall under 
    const workoutTitle = document.createElement('h2');
    workoutTitle.textContent = `Workout name: ${workoutObj['workout name']}`;
    createExerciseForm.appendChild(workoutTitle);

// Creates buttons based on number of exercises and sets the attribute 
    for(let index = 0; index < exerciseNumInput.value; index++){

        // Creates unordered list to store all list items under 
        let exerciseList = document.createElement('ul');
        let exerciseUL = document.querySelector(`#exercise${index + 1}-data`);
        exerciseList.setAttribute('id',`exercise${index + 1}-data`);
        createExerciseForm.appendChild(exerciseList);
       

        //Create list item for name 
        let exerciseNameItem = document.createElement('li');
        exerciseNameItem.setAttribute('id',`exercise${index + 1}-name`);
        let nameLi = document.querySelector('#exercise${index + 1}-name')
        exerciseUL.appendChild(exerciseNameItem);

        let exerciseNameInput = document.createElement('input');
        exerciseNameInput.setAttribute('id','');
        exerciseNameInput.setAttribute('type','');
        exerciseNameInput.setAttribute('placeholder','');
        exerciseNameInput.setAttribute('size','');
        nameLi.appendChild(exerciseNameInput);


        /*
        //Create list item for description  
        const exerciseDescItem = document.createElement('li');
        exerciseDescItem.setAttribute('id',`exercise${index + 1}-desc`);
        exerciseDescItem.textContent = `Description: ${workoutObj['exercises'][index]['description']}`;
        exerciseUL.appendChild(exerciseDescItem);

        //Create list item for duration 
        const exerciseDurItem = document.createElement('li');
        exerciseDurItem.setAttribute('id',`exercise${index + 1}-dur`);
        exerciseDurItem.textContent = `Duration: ${workoutObj['exercises'][index]['duration']} minutes`;
        exerciseUL.appendChild(exerciseDurItem);
        */
    
}


window.addEventListener('load', init);