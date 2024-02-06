
window.addEventListener('load',pageInit)

function pageInit(){
    // elements 


    // Event Listeners
    

}

// Update each timer value 
function setTotalTime(event){
    totalTime = {
        warmUpTimer:{
            minutes:10,
            seconds:0
        },
        exerciseTimer:{
            minutes:20,
            seconds:0
        },
        restTimer:{
            minutes:30,
            seconds:0
        }
    }

    for(const obj in totalTime){
        if(event.target.textContent == obj){

        }
    }
}
