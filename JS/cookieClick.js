document.addEventListener("DOMContentLoaded", function () {
    let cookieCount = 0;

    const cookieCountDisplay = document.getElementById("cookieCount");
    const cookieButton = document.getElementById("cookieButton");

    cookieButton.addEventListener("click", function () {
        cookieCount += 1;  // Adds 1 cookie per click
        cookieCountDisplay.textContent = "Cookies: " + cookieCount;
    });
});
