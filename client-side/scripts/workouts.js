const userWorkoutsArray = []
const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
const formSteps = document.querySelectorAll('[data-step]');
const nextStepBtn = document.querySelector('#stepOneNextBtn');
let formIndex = 0;


createWorkoutBtn.addEventListener('click',navigatingForm);

nextStepBtn.addEventListener('click',nextBtnHandler);

// Group functions associated with next button behaviour 
function nextBtnHandler(){
    createWorkoutInstance();
}

// Creates an object storing workout name submitted by user and exercise objects with default values
function createWorkoutInstance(){ 
    const numOfExercisesInput = document.querySelector('#numOfExercises').value;
    const workoutObj = {
        'workout name': document.querySelector('#workoutName').value,
        'exercises':[] 
    }
    for(i=0; i<numOfExercisesInput; i++){
        let exerciseObj ={
            'name': `exercises ${i+1}`,
            'description': ``,
            'duration':0
        }
        workoutObj['exercises'].push(exerciseObj)
    }
    userWorkoutsArray.push(workoutObj);
}

// Display different form steps depending on which button was clicked.
function navigatingForm(event){

    if(event.target.textContent === "Create Workout"){
        formIndex = 1;  
    } 
    else if(event.target.classList.contains('nextButton')){
        formIndex +=1;
    }
    else if(event.target.classList.contains('previousButton')){
        formIndex -= 1;
    }

    formSteps.forEach((element) => {
        if(element.dataset.step == formIndex){
            element.classList.add('active');
        }
    })
}