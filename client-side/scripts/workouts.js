
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

<<<<<<< Updated upstream
    const exerciseNumInput = document.querySelector('#exercise-number');
    const createExerciseForm = document.querySelector('#edit-exercises-buttons');
    
    //Create workout heading so user knows which workout these exercises will fall under 
    const workoutTitle = document.createElement('h2');
    workoutTitle.setAttribute('id','#workout');
    workoutTitle.textContent = `Workout name: ${workoutObj['workout name']}`;
    createExerciseForm.appendChild(workoutTitle);

// Creates buttons based on number of exercises and sets the attribute 
    for(let index = 0; index < exerciseNumInput.value; index++){
=======
// Group functions associated with next button behaviour 
function nextBtnHandler(event){
    createWorkoutInstance();
    cloneExerciseTemplate();
    navigatingForm(event);
}

// Clones the exercise template to the page. 
function cloneExerciseTemplate(){
    const formContainer = document.querySelector('#createWorkoutForm');
    const exerciseFormTemplate = document.querySelector('#exerciseFormStep');
    const cloneExerciseForm = exerciseFormTemplate.content.cloneNode(true);
    const section = cloneExerciseForm.querySelector('#exerciseForm');
    cloneExerciseForm.querySelector('#exerciseTitle').textContent = userWorkoutsArray[0]['exercises'][section.dataset.exerciseIndex]['name'];
    formContainer.append(cloneExerciseForm);

    //Obtaining button elements and adding event listeners 
    const nextBtn = document.querySelector('#exNextBtn');
    const previousBtn = document.querySelector('#exPreBtn');

    nextBtn.addEventListener('click',nextAndPreBtnHandler);
    previousBtn.addEventListener('click',nextAndPreBtnHandler);

    function nextAndPreBtnHandler(event){
        exerciseNavigation(event);
        workoutUpdate();
    }

}

//Navigate through exercises and form steps
function exerciseNavigation(event){
    const formStep2Section = document.querySelector('#exerciseForm');
}
>>>>>>> Stashed changes

        // Creates unordered list to store all list items under 
        let exerciseList = document.createElement('ul');
        exerciseList.setAttribute('id',`exerciseUl${index}`);
        createExerciseForm.appendChild(exerciseList);

        // Create li element and title for each exercise;

        let titleItem = document.createElement('li');
        titleItem.setAttribute('id',`title${index + 1}`);
        titleItem.textContent = `Exercise ${ index + 1}`;
        exerciseList.appendChild(titleItem);
    
       

        //Creating the li element and input for the name property of each exercise
        let exerciseNameItem = document.createElement('li');
        exerciseNameItem.setAttribute('id',`exerciseLi${index}`);
        exerciseList.appendChild(exerciseNameItem);


        let exerciseNameInput = document.createElement('input');
        exerciseNameInput.setAttribute('id',`exercise${index + 1}-name`);
        exerciseNameInput.setAttribute('type','text');
        exerciseNameInput.setAttribute('placeholder','Name');
        exerciseNameInput.setAttribute('size','');
        exerciseNameItem.appendChild(exerciseNameInput);

        //Creating the li element and input for the description property of each exercise
        let exerciseDescItem = document.createElement('li');
        exerciseList.appendChild(exerciseDescItem);

        let exerciseDescInput = document.createElement('input');
        exerciseDescInput.setAttribute('id',`exercise${index + 1}-desc`);
        exerciseDescInput.setAttribute('type','text');
        exerciseDescInput.setAttribute('placeholder','Description')
        exerciseDescInput.setAttribute('size','');
        exerciseList.appendChild(exerciseDescInput);

        //Creating the li element and input for the duration property of each exercise
        let exerciseDurItem = document.createElement('li');
        exerciseList.appendChild(exerciseDurItem);

        let exerciseDurInput = document.createElement('input');
        exerciseDurInput.setAttribute('id',`exercise${index + 1}-dur`);
        exerciseDurInput.setAttribute('type','number');
        exerciseDurInput.setAttribute('placeholder','0 seconds');
        exerciseDurInput.setAttribute('size','');
        exerciseList.appendChild(exerciseDurInput);
    }

   const submitExerciseBtn = document.createElement('button');
   submitExerciseBtn.setAttribute('id','#submitExerciseBtn');
   submitExerciseBtn.textContent = "Submit";
   createExerciseForm.appendChild(submitExerciseBtn);
   submitExerciseBtn.addEventListener('click',submitExerciseData);

    // This function will reset the page to only include the create workout button and edit exercise button
    const cancelExerciseBtn = document.createElement('button');
    cancelExerciseBtn.setAttribute('id','cancelExerciseBtn');
    cancelExerciseBtn.textContent = "Cancel";
    createExerciseForm.appendChild(cancelExerciseBtn);


   // This function will store the data inputted into the object 
   function submitExerciseData(){
    for (let index = 0; index < exerciseNumInput.value; index++){
        let exerciseTitle = document.querySelector(`#title${index + 1}`).textContent;

        if(exerciseTitle == workoutObj["exercises"][index]["name"]){
            workoutObj["exercises"][index]["name"] = document.querySelector(`#exercise${index + 1}-name`).value;
            workoutObj["exercises"][index]["description"] = document.querySelector(`#exercise${index + 1}-desc`).value;
            workoutObj["exercises"][index]["duration"] = document.querySelector(`#exercise${index + 1}-dur`).value;
            console.log(workoutObj["exercises"][index]);
        }
        removeFormElements()
    }

    // Called within the submit event handler to remove all the form elements.
    function removeFormElements(){
        
        for(index = 0; index < exerciseNumInput.value; index++){
            let exerciseNameLi = document.querySelector(`#exercise${index + 1}-name`).remove();
            let exerciseDescLi = document.querySelector(`#exercise${index + 1}-desc`).remove();
            let exerciseDurLi = document.querySelector(`#exercise${index + 1}-dur`).remove();
            let exerciseTitleItem = document.querySelector(`#title${index + 1}`).remove();
            let exerciseLiItem = document.querySelector(`#exerciseLi${index}`).remove(); 
            let exerciseUlItem = document.querySelector(`#exerciseUl${index}`).remove(); 
        }
    
        workoutTitle.remove();
        submitExerciseBtn.removeEventListener('click',submitExerciseData)
        submitExerciseBtn.remove();
        cancelExerciseBtn.remove();
        const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
        createWorkoutBtn.classList.remove('hidden');
    }
   }
   

}

window.addEventListener('load', init);