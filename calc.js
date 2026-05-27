// select display screen

let display = document.getElementById("display");

// add values to the display
function appendValue(value){

    display.value += value;
}

// clear display
function clearDisplay(){
    display.value = "";
}

// delete last character
function deleteLast(){

    display.value = display.value.slice(0, -1);
}

//calculate result

function calculate(){

    try{
        display.value = eval(display.value);
    }

    catch(error){
        display.value = "Error";
    }
}