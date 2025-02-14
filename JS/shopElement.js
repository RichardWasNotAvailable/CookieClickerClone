// Initial prices and values
let autoClickerPrice = 10;
let cookieMultiplierPrice = 50;
let cookieBakerPrice = 100;
let cookieFactoryPrice = 500;  // Example price for cookie factory
let cookieMultiplier = 1;
let cookieBakers = 1;
let cookieFactory = 1;
let autoClickers = 0;
let cookieCount = 0;  // Starting cookie count
let cookieCountDisplay = document.getElementById("cookieCountDisplay"); // Assuming this is the element displaying cookies

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
            autoClickerPrice = Math.floor(autoClickerPrice * 2); 
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
            cookieMultiplierPrice = Math.floor(cookieMultiplierPrice * 152);
            updateShopPrices();  // Update the price display in the shop
        } else {
            alert('Not enough cookies!');
        }
    } else if (item === 'cookieBaker') {
        if (cookieCount >= cookieBakerPrice) {
            cookieCount -= cookieBakerPrice;
            cookieBakers *= 2;  // Double the number of bakers
            cookieCountDisplay.textContent = "Cookies: " + cookieCount;

            cookieBakerPrice = Math.floor(cookieBakerPrice * 152);
            updateShopPrices();  // Update the price display in the shop
        } else {
            alert('Not enough cookies!');
        }
    } else if (item === 'cookieFactory') {
        if (cookieCount >= cookieFactoryPrice) {
            cookieCount -= cookieFactoryPrice;
            cookieFactory *= 2;  // Double the cookie factory
            cookieCountDisplay.textContent = "Cookies: " + cookieCount;

            cookieFactoryPrice = Math.floor(cookieFactoryPrice * 152);
            updateShopPrices();  // Update the price display in the shop
        } else {
            alert('Not enough cookies!');
        }
    }
}

// Start the auto-clicker
function startAutoClicker() {
    setInterval(() => {
        cookieCount += autoClickers;
        cookieCountDisplay.textContent = "Cookies: " + cookieCount;
    }, 2000);  // Adds a cookie every 2 seconds
}

// Update the prices displayed in the shop
function updateShopPrices() {
    // Update the displayed price in the shop for each item
    document.getElementById("autoClickerPrice").textContent = "Price: " + autoClickerPrice + " Cookies";
    document.getElementById("cookieMultiplierPrice").textContent = "Price: " + cookieMultiplierPrice + " Cookies";
    document.getElementById("cookieBakerPrice").textContent = "Price: " + cookieBakerPrice + " Cookies";
    document.getElementById("cookieFactoryPrice").textContent = "Price: " + cookieFactoryPrice + " Cookies";
}
