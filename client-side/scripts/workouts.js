const userWorkoutsArray = []
const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
const formSteps = document.querySelectorAll('[data-step]');
const nextStepBtn = document.querySelector('#stepOneNextBtn');
let formIndex = 1;


createWorkoutBtn.addEventListener('click',()=>{
    formSteps.forEach((element,index) => {
        if(element.dataset.step == 1 && formIndex == 1){
            element.classList.add('active');
        }
    });
});

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


