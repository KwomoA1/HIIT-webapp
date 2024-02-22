function init(){
    const createButton = document.querySelector('#create-workout');
    createButton.addEventListener('click',() => {
        const form = document.querySelector("#workout-form-init");
        if(form.classList.contains("hidden")){
            form.classList.remove("hidden");
        } else{
            form.classList.add("hidden");
        }
    })
}


window.addEventListener('load', init);