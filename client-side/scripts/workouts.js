const userWorkoutsArray = []
const createWorkoutBtn = document.querySelector('#createWorkoutBtn');
const nextStepBtn = document.querySelector('#stepOneNextBtn');
let formIndex = 0;


createWorkoutBtn.addEventListener('click',createWorkoutBtnHandler);
nextStepBtn.addEventListener('click',nextBtnHandler);

// Group functions associated with create workout behaviour
function createWorkoutBtnHandler(event){
    createWorkoutBtn.classList.add('hidden');
    navigatingForm(event);
}

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
    
    if(event.target.classList.contains('nextBtn')){
        formStep2Section.dataset.exerciseIndex = parseInt(formStep2Section.dataset.exerciseIndex) + 1;
        for(const child of formStep2Section.children){
            if(child.id == 'exerciseTitle'){
                child.textContent = userWorkoutsArray[0]['exercises'][formStep2Section.dataset.exerciseIndex]['name'];
            }
        }
    }
    else if (event.target.classList.contains('previousBtn')){
        formStep2Section.dataset.exerciseIndex = parseInt(formStep2Section.dataset.exerciseIndex) - 1;
        for(const child of formStep2Section.children){
            if(child.id == 'exerciseTitle'){
                child.textContent = userWorkoutsArray[0]['exercises'][formStep2Section.dataset.exerciseIndex]['name'];
            }
        }
    }

}

function workoutUpdate(){

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
    
    if(event.target.classList.contains('nextButton') || event.target.textContent == "Create Workout"){
        formIndex +=1;
    }
    else if(event.target.classList.contains('previousButton')){
        formIndex -= 1;
    }

    formElementsValidation() 
}

function formElementsValidation(){
    const formSteps = document.querySelectorAll('[data-step]');
    
    formSteps.forEach((element)=>{
        if(element.dataset.step == formIndex){
            element.classList.add('active');
        }
        else if(element.dataset.step != formIndex && element.classList.contains('active')){
            element.classList.remove('active');
        }
    })
}