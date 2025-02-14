// Initial prices
var autoClickerPrice = 10;
let cookieMultiplierPrice = 50;
let cookieBakerPrice = 100;
let cookieFactoryPrice = 10000;
var cookieCount = 0;
var autoClickers = 0;
var cookieMultiplier = 1;
var cookieBakers = 0;
var cookieFactory = 0

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

class Upgrade {
    constructor(itemRef, priceRef, priceFactor, increaseAmount, priceVarName) {
        this.itemRef = itemRef; // Reference to the global variable (autoClickers, cookieMultiplier, etc.)
        this.priceRef = priceRef; // Reference to the global price variable
        this.priceFactor = priceFactor;
        this.increaseAmount = increaseAmount;
        this.priceVarName = priceVarName; // Name of the price variable to update globally
    }

    buyUpgrade() {
        if (cookieCount >= this.priceRef) {
            cookieCount -= this.priceRef;
            this.itemRef += this.increaseAmount; // Increase the upgrade amount
            this.priceRef = Math.floor(this.priceRef * this.priceFactor); // Update price

            cookieCountDisplay.textContent = "Cookies: " + cookieCount;

            // Update the global price variable dynamically
            if (this.priceVarName === "autoClickerPrice") {
                autoClickerPrice = this.priceRef;
            } else if (this.priceVarName === "cookieMultiplierPrice") {
                cookieMultiplierPrice = this.priceRef;
            } else if (this.priceVarName === "cookieBakerPrice") {
                cookieBakerPrice = this.priceRef;
            }
else if (this.priceVarName === "cookieFactoryPrice") {
    cookieFactoryPrice = this.priceRef
}
            updateShopPrices();
        } else {
            alert('Not enough cookies!');
        }
    }
}

function addACookie(){
    cookieCount += cookieMultiplier;
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}

function updateShopPrices() {
    document.getElementById("autoClickerPrice").textContent = "Price: " + autoClickerPrice + " Cookies";
    document.getElementById("cookieMultiplierPrice").textContent = "Price: " + cookieMultiplierPrice + " Cookies";
    document.getElementById("cookieBakerPrice").textContent = "Price: " + cookieBakerPrice + " Cookies";
    document.getElementById("cookieFactoryPrice").textContent = "Price: " + cookieFactoryPrice + " Cookies";
}

function buyItem(item) {
    let newUpgrade;

    if (item === 'autoClicker') {
        newUpgrade = new Upgrade(autoClickers, autoClickerPrice, 3, 1, "autoClickerPrice");
        newUpgrade.buyUpgrade();
        autoClickers++; // Make sure the global value increases
    } else if (item === 'cookieMultiplier') {
        newUpgrade = new Upgrade(cookieMultiplier, cookieMultiplierPrice, 2.5, 2, "cookieMultiplierPrice");
        newUpgrade.buyUpgrade();
        cookieMultiplier++; 
    } else if (item === 'cookieBaker') {
        newUpgrade = new Upgrade(cookieBakers, cookieBakerPrice, 3.1, 2, "cookieBakerPrice");
        newUpgrade.buyUpgrade();
        cookieBakers++;
    }
}

setInterval(() => {
    cookieCount += autoClickers;
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}, 2000);
