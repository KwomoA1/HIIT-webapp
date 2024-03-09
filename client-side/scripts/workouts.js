const userWorkoutsArray = []

const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
createWorkoutBtn.addEventListener('click',displayWorkoutForm);


/*
//Display form to create workout 
function displayWorkoutForm(event){
    const formContainer = document.querySelector('#formContainer');
    const workoutFormTemplate = document.querySelector('#workoutFormTemplate');
    const clonedTemplate = workoutFormTemplate.content.cloneNode(true);
    formContainer.append(clonedTemplate); 
    event.target.classList.add('hidden'); 

    const submitWorkoutBtn = document.querySelector('#submitWorkout');
    submitWorkoutBtn.addEventListener('click',submitWorkoutHandler)

}

//Checks for data input and then displays an exercise form
function submitWorkoutHandler(){
    const workoutNameInput = document.querySelector('#workoutName');
    const exerciseNumInput = document.querySelector('#numberExercises');
    const formContainer = document.querySelector('#formContainer')
    const formTemplateContainer = document.querySelector('#removeWorkoutForm');

    if(workoutNameInput.value == "" || exerciseNumInput.value == ""){
        const validationMessage = document.createElement('p');
        validationMessage.textContent = "Make sure you've entered a workout name and number of exercises";
        formContainer.append(validationMessage);
        const intervalId = setInterval(()=>{
            validationMessage.remove();
        },5000)
    }

    const workoutObj = {
        "workout name": workoutNameInput.value,
        "exercises": []
    }

    userWorkoutsArray.push(workoutObj);
    const userWorkoutsIndex = userWorkoutsArray.length - 1;
    
    for(index = 0; index < exerciseNumInput.value; index++){
        let exerciseObj = {
            "name": `exercise ${index + 1}`,
            "description": "Enter description",
            "duration": 0
        };
        userWorkoutsArray[userWorkoutsIndex]['exercises'].push(exerciseObj);
    }
    formTemplateContainer.remove();

    loadExerciseTemplate(userWorkoutsIndex);
}
   
// Loads the exercise form onto webpage
function loadExerciseTemplate(createdWorkoutIndex){
    let formIndex = 0;
    const exerciseFormTemplate = document.querySelector('#exerciseFormTemplate');
    const cloneExerciseTemplate = exerciseFormTemplate.content.cloneNode(true);
    cloneExerciseTemplate.querySelector('#workout').textContent = userWorkoutsArray[createdWorkoutIndex]['workout name'];
    cloneExerciseTemplate.querySelector('#exercise').textContent = `Exercise: ${userWorkoutsArray[createdWorkoutIndex]['exercises'][0]['name']}`;
    cloneExerciseTemplate.querySelector('#exerciseName').value = userWorkoutsArray[createdWorkoutIndex]['exercises'][0]['name'];
    cloneExerciseTemplate.querySelector('#exerciseDescription').value = userWorkoutsArray[createdWorkoutIndex]['exercises'][0]['description'];
    cloneExerciseTemplate.querySelector('#exerciseDuration').value = userWorkoutsArray[createdWorkoutIndex]['exercises'][0]['duration'];
    formContainer.append(cloneExerciseTemplate);

    // Obtaining form input elements and buttons 
    const exerciseTitle = document.querySelector('#exercise');
    const exerciseNameInput = document.querySelector('#exerciseName');
    const exerciseDescInput = document.querySelector('#exerciseDescription');
    const exerciseDurInput = document.querySelector('#exerciseDuration');
    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#previousBtn');
    const submitWorkoutForm = document.querySelector('#submitBtn');
    const cancelBtn = document.querySelector('#cancelBtn');

    const exerciseLen = userWorkoutsArray[createdWorkoutIndex]['exercises'].length

    nextBtn.addEventListener('click',nextBtnHandler);
    prevBtn.addEventListener('click',prevBtnHandler);
    submitWorkoutForm.addEventListener('click',cancelBtnHandler);
    cancelBtn.addEventListener('click',cancelBtnHandler);
    exerciseNameInput.addEventListener('input',inputChangeHandler);
    exerciseDescInput.addEventListener('input',inputChangeHandler);
    exerciseDurInput.addEventListener('input',inputChangeHandler);

    function inputChangeHandler(){
        const createdWorkoutIndex = userWorkoutsArray.length - 1;
        userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['name'] = exerciseNameInput.value;
        userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['description'] = exerciseDescInput.value;
        userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['duration'] = exerciseDurInput.value;
    }

    function nextBtnHandler(){
        const createdWorkoutIndex = userWorkoutsArray.length - 1;
        if(formIndex !== exerciseLen-1){
            formIndex += 1;
            exerciseTitle.textContent = `Exercise: ${userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['name']}`;
            exerciseNameInput.value = userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['name'];
            exerciseDescInput.value = userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['description'];
            exerciseDurInput.value = userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['duration'];

            if(formIndex === exerciseLen-1){
                nextBtn.classList.add('hidden');
                submitWorkoutForm.classList.remove('hidden');
                cancelBtn.classList.remove('hidden');
            }
            if(formIndex > 0){
                prevBtn.classList.remove('hidden'); 
            }
        }
    }

    function prevBtnHandler(){
        const createdWorkoutIndex = userWorkoutsArray.length - 1;
        if(formIndex !== 0){
            formIndex -= 1;
            exerciseTitle.textContent = `Exercise: ${userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['name']}`;
            exerciseNameInput.value = userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['name'];
            exerciseDescInput.value = userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['description'];
            exerciseDurInput.value = userWorkoutsArray[createdWorkoutIndex]['exercises'][formIndex]['duration'];
            if(formIndex < exerciseLen -1){
                nextBtn.classList.remove('hidden');
                submitWorkoutForm.classList.add('hidden');
                cancelBtn.classList.add('hidden');
            }
            if(formIndex === 0){
                prevBtn.classList.add('hidden');
            }
        }
    }

    function cancelBtnHandler(event){
        const createdWorkoutIndex = userWorkoutsArray.length - 1;
        if(event.target === submitWorkoutForm){
            console.log("Workout sent to database");
        }
        const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
        const removeExerciseForm = document.querySelector('#removeExerciseForm');
        userWorkoutsArray.splice(createdWorkoutIndex,1);
        removeExerciseForm.remove()
        createWorkoutBtn.classList.remove('hidden');
    }

}
*/