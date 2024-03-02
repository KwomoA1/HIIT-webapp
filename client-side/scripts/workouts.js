
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
    const workoutFormTemplate = document.querySelector('#createWorkoutForm');
    const clonedTemplate = workoutFormTemplate.content.cloneNode(true);
    formContainer.append(clonedTemplate); 
    event.target.remove(); 

    const submitWorkoutBtn = document.querySelector('#submitWorkout');
    submitWorkoutBtn.addEventListener('click',submitWorkoutHandler)

}

function submitWorkoutHandler(){
    const workoutNameInput = document.querySelector('#workoutName');
    const exerciseNumInput = document.querySelector('#numberExercises');
    const formContainer = document.querySelector('#formContainer')

    if(workoutNameInput.value == "" || exerciseNumInput.value == ""){
        const validationMessage = document.createElement('p');
        validationMessage.textContent = "Make sure you've entered a workout name and number of exercises";
        formContainer.append(validationMessage);
        const intervalId = setInterval(()=>{
            validationMessage.remove();
        },5000)
    }
}
    

window.addEventListener('load', init);