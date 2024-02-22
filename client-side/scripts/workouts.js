

/*
Displays any element containing the hidden class or hides elements containing the hidden class 
*/

function displayElement(elementId){
    const hiddenElement = document.querySelector(elementId);
    if(hiddenElement.classList.contains("hidden")){
        hiddenElement.classList.remove("hidden");
    } else {
        hiddenElement.classList.add("hidden");
    }
    
}

function init(){
    const createButton = document.querySelector('#create-workout');
    createButton.addEventListener('click',displayElement('#workout-form-init'));
}

window.addEventListener('load', init);