
const workoutObj = {
    "workout name": "",
    "exercises": [] 
}

// Loads buttons and event listeners once the page loads 
function init(){
    const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
    createWorkoutBtn.addEventListener('click',displayWorkoutForm);
}

//Display initial form to create workout
function displayWorkoutForm(event){
    const formContainer = document.querySelector('#formContainer');
    const workoutFormTemplate = document.querySelector('#workoutFormTemplate');
    const clonedTemplate = workoutFormTemplate.content.cloneNode(true);
    formContainer.append(clonedTemplate); 
    event.target.remove(); 

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

    workoutObj["workout name"] = workoutNameInput.value;
    for(index = 0; index < exerciseNumInput.value; index++){
        let exerciseObj = {
            "name": `exercise ${index + 1}`,
            "description": "",
            "duration": "" 
        };
        workoutObj["exercises"].push(exerciseObj);
    }
    formTemplateContainer.remove();

    // Adds the exercise form template to the DOM
    let formIndex = 0;
    const exerciseFormTemplate = document.querySelector('#exerciseFormTemplate');
    const cloneExerciseForm = exerciseFormTemplate.content.cloneNode(true); 
    cloneExerciseForm.querySelector('#workout').textContent = workoutObj['workout name'];
    cloneExerciseForm.querySelector('#exercise').textContent = workoutObj['exercises'][formIndex]['name'];
    formContainer.append(cloneExerciseForm);



    const exerciseTitle = document.querySelector('#exercise');
    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#previousBtn');
    const submitWorkoutForm = document.querySelector('#submitBtn');
    const cancelBtn = document.querySelector('#cancelBtn');



    nextBtn.addEventListener('click',()=>{
        if(formIndex !== exerciseNumInput.value-1){
            formIndex += 1
            exerciseTitle.textContent = workoutObj['exercises'][formIndex]['name']
            if(formIndex > 0){
                prevBtn.classList.remove('hidden');
            }
            if(formIndex == exerciseNumInput.value-1){
                submitWorkoutForm.classList.remove('hidden');
                cancelBtn.classList.remove('hidden');
                nextBtn.classList.add('hidden');
            }
            
        }
    });

    prevBtn.addEventListener('click',()=>{
        if(formIndex !== 0){
            formIndex -= 1
            exerciseTitle.textContent = workoutObj['exercises'][formIndex]['name']
            if(formIndex == 0){
                prevBtn.classList.add('hidden');
            }
            if(formIndex < exerciseNumInput.value-1){
                submitWorkoutForm.classList.add('hidden');
                cancelBtn.classList.add('hidden');
                nextBtn.classList.remove('hidden');
            }
        } 
    });
}
window.addEventListener('load', init);