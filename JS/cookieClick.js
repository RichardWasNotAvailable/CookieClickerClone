
let cookieCount = 0;


const cookieCountDisplay = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");

function addACookie(){
    cookieCount += 1;  // Adds 1 cookie per click
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}

