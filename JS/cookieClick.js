// Global variables
let cookieCount = 0;
let autoClickers = 0;
let cookieMultiplier = 1;
let cookieBakers = 1;

const cookieCountDisplay = document.getElementById("cookieCount");

// Add a cookie with each click
function addACookie() {
    cookieCount += cookieMultiplier;  // Add cookies based on multiplier
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}
