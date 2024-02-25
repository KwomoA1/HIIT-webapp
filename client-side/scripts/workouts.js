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
    const createWorkoutBtn = document.querySelector('#create-workout');
    createWorkoutBtn.addEventListener('click',displayElement);

    const workoutFormSubmitBtn = document.querySelector('#submit-workout-form');
    workoutFormSubmitBtn.addEventListener('click', workoutFormSubmitHandler);

}

function workoutFormSubmitHandler(){
    createWorkoutObject();
    generateEditButtons();
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

// Sends objects arguments in


// Create workout object and then stores data into the object   
function createWorkoutObject(){
    const workoutName = document.querySelector('#workout-name');
    const exerciseNumInput = document.querySelector('#exercise-number');

    workoutObj["workout name"] = workoutName.value;

    for(let index = 0; index < exerciseNumInput.value; index++){
        const exerciseObj = {
            "name": `Exercise ${index + 1}`,
            "description": `This is exercise ${index + 1}`,
            "duration": 0
        }
        workoutObj["exercises"].push(exerciseObj) //Pushing each exercise object into the array 
    }
    console.log(workoutObj["workout name"]);
    console.log(workoutObj["exercises"]);
}



// Generate buttons to each exercise and edit buttons  
function generateEditButtons(){
    const exerciseNumInput = document.querySelector('#exercise-number');
    const setupWorkoutSection = document.querySelector('#edit-exercises-buttons');
    const createWorkoutBtn = document.querySelector('#create-workout');
    const workoutForm = document.querySelector('#workout-form-init');
    createWorkoutBtn.classList.add('hidden');
    workoutForm.classList.add('hidden');

    const workoutTitle = document.createElement('h2');
    workoutTitle.textContent = `Workout name: ${workoutObj['workout name']}`;
    setupWorkoutSection.appendChild(workoutTitle);

// Creates buttons based on number of exercises and sets the attribute 
    for(let index = 0; index < exerciseNumInput.value; index++){
        // Creating unordered list
        const exerciseList = document.createElement('ul');
        exerciseList.setAttribute('id',`exercise${index + 1}-data`);
        setupWorkoutSection.appendChild(exerciseList);

        const exerciseUL = document.querySelector(`#exercise${index + 1}-data`);


        //Create list item for name 
        const exerciseNameItem = document.createElement('li');
        exerciseNameItem.setAttribute('id',`exercise${index + 1}-name`);
        exerciseNameItem.textContent = `Exercise name: ${workoutObj["exercises"][index]['name']}`;
        exerciseUL.appendChild(exerciseNameItem);

        
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
        
        

        // Creating buttons 
        const editExerciseBtn = document.createElement('button');
        editExerciseBtn.setAttribute('id',`Exercise${index}-button`);
        editExerciseBtn.setAttribute('class','wrapper'); //wrapper is a class element which sets element display to block
        editExerciseBtn.setAttribute('value',`Exercise ${index + 1}`);
        editExerciseBtn.textContent = `Edit exercise ${index + 1}`;
        setupWorkoutSection.appendChild(editExerciseBtn);

        editExerciseBtn.addEventListener('click',editExercise);
    }

    function editExercise(event){
        const editPanel = document.querySelector('#edit-exercise-panel');
        const buttonId = event.target.id;
        const buttonValue = event.target.value;
        // Creates Title 
        const editFormTitle = document.createElement('h3');
        for ( let item of workoutObj["exercises"]){
            if(item['name'] == buttonValue){
                editFormTitle.textContent = `Editing: ${item['name']}`;
                editPanel.appendChild(editFormTitle);

                 // Name input field 
                const editExerciseName = document.createElement('input');
                editExerciseName.setAttribute('id',`${item['name']}`)
                editExerciseName.setAttribute('type','text');
                editExerciseName.setAttribute('placeholder',`${item['name']}`);
                editExerciseName.setAttribute('size',30);
                editPanel.appendChild(editExerciseName);

                // Description input field 
                const editDescription = document.createElement('input');
                editDescription.setAttribute('id',`${item['description']}`);
                editDescription.setAttribute('type','text');
                editDescription.setAttribute('placeholder',`${item['description']}`);
                editDescription.setAttribute('size',80);
                editPanel.appendChild(editDescription);

                //Duration input field
                const editDuration = document.createElement('input');
                editDuration.setAttribute('id',`${item['duration']}`)
                editDuration.setAttribute('type','number');
                editDuration.setAttribute('placeholder',`${item['duration']} Minutes`);
                editPanel.appendChild(editDuration);

                // Submit button creation 
                const editSubmitBtn = document.createElement('button');
                editSubmitBtn.setAttribute('value',`${item['name']}`);
                editSubmitBtn.textContent = "Submit edit"
                editPanel.appendChild(editSubmitBtn);
            

                editSubmitBtn.addEventListener('click',submitData);
                
                function submitData(){
                    const arraylength = workoutObj['exercises'].length;
                    for (index = 0; index < arraylength; index++){
                        if(workoutObj['exercises'][index]['name'] == editSubmitBtn.value){
                            const exerciseNameElement = document.querySelector(`#exercise${index + 1}-name`);
                            const exerciseDescElement = document.querySelector(`#exercise${index + 1}-desc`);
                            const exerciseDurElement = document.querySelector(`#exercise${index + 1}-dur`);

                            item['name'] = editExerciseName.value;
                            item['description'] = editDescription.value;
                            item['duration'] = editDuration.value;

                        
                
                            // Update text content of name, description, and duration elements
                            exerciseNameElement.textContent = `Exercise name: ${item['name']}`;
                            exerciseDescElement.textContent = `Description: ${item['description']}`;
                            exerciseDurElement.textContent = `Duration: ${item['duration']} minutes`;

                            
                            console.log(item);
                        }
                    }
                }
            }
        }
    }
}


window.addEventListener('load', init);