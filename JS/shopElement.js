// Initial prices
let autoClickerPrice = 10;
let cookieMultiplierPrice = 50;
// Add a cookie with each click
function addACookie() {
    cookieCount += cookieMultiplier;  // Add cookies based on multiplier
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}

// Buy an item from the shop
function buyItem(item) {
    if (item === 'autoClicker') {
        if (cookieCount >= autoClickerPrice) {
            cookieCount -= autoClickerPrice;
            autoClickers += 1;
            cookieCountDisplay.textContent = "Cookies: " + cookieCount;

            // Increase the price of the autoClicker for the next purchase
            autoClickerPrice = Math.floor(autoClickerPrice * 1.5); // Increase by 50%
            updateShopPrices();  // Update the price display in the shop

            startAutoClicker();
        } else {
            alert('Not enough cookies!');
        }
    } else if (item === 'cookieMultiplier') {
        if (cookieCount >= cookieMultiplierPrice) {
            cookieCount -= cookieMultiplierPrice;
            cookieMultiplier *= 2;  // Doubles the cookie multiplier
            cookieCountDisplay.textContent = "Cookies: " + cookieCount;

            // Increase the price of the cookieMultiplier for the next purchase
            cookieMultiplierPrice = Math.floor(cookieMultiplierPrice * 1.5); // Increase by 50%
            updateShopPrices();  // Update the price display in the shop
        } else {
            alert('Not enough cookies!');
        }
    }
}

// Auto clicker function (adds cookies every second)
function startAutoClicker() {
    setInterval(() => {
        cookieCount += autoClickers;
        cookieCountDisplay.textContent = "Cookies: " + cookieCount;
    }, 1000);  // Adds cookies every 1 second
}

// Update the prices displayed in the shop
function updateShopPrices() {
    // Update the displayed price in the shop for each item
    document.getElementById("autoClickerPrice").textContent = "Price: " + autoClickerPrice + " Cookies";
    document.getElementById("cookieMultiplierPrice").textContent = "Price: " + cookieMultiplierPrice + " Cookies";
}
