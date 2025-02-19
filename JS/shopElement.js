let cookieCount = 0;

// Initial prices
let autoClickerPrice = 10;
let autoClickers = 0;

let cookieMultiplierPrice = 50;
let cookieMultiplier = 1;

let ovens = 0;
let ovenPrice = 100;

let cookieFactory = 0;
let cookieFactoryPrice = 10;

let cargoPlane = 0;
let cargoPlanePrice = 100000;

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
                autoClickerPrice *= this.priceFactor;
                document.getElementById("autoClickerPrice").textContent = "Price: " + autoClickerPrice + " Cookies";
                autoClickers += 1;

            } else if (this.priceVarName === "cookieMultiplierPrice") {
                cookieMultiplierPrice = this.priceRef;
                document.getElementById("cookieMultiplierPrice").textContent = "Price: " + cookieMultiplierPrice + " Cookies";
                cookieMultiplier += 1;
            } else if (this.priceVarName === "cookieMultiplierPrice") {
                ovenPrice = this.priceRef;
                document.getElementById("cookieMultiplierPrice").textContent = "Price: " + ovenPrice + " Cookies";
                cookieMultiplier += 1;
            }
            else if (this.priceVarName === "ovenPrice"){
                cookieFactoryPrice = this.priceRef
                document.getElementById("ovenPrice").textContent = "Price: " + cookieFactoryPrice + " Cookies";
                ovens += 1;

            }
            else if (this.priceVarName === "cookieFactoryPrice"){
                cookieFactoryPrice = this.priceRef
                document.getElementById("cookieFactoryPrice").textContent = "Price: " + cookieFactoryPrice + " Cookies";
                cookieFactory += 1;
            }
            else if (this.priceVarName === "cargoPlane"){
                cargoPlanePrice = this.priceRef
                document.getElementById("cargoPlanePrice").textContent = "Price: " + cargoPlanePrice + " Cookies"
            }
        } else {
            alert('Not enough cookies!');
        }
    }
}

function addACookie(){
    cookieCount += cookieMultiplier;
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}

function buyItem(item) {
    let newUpgrade;

    if (item === 'autoClicker') {
        newUpgrade = new Upgrade(autoClickers, autoClickerPrice, 3, 1, "autoClickerPrice");
        newUpgrade.buyUpgrade();
    } else if (item === 'cookieMultiplier') {
        newUpgrade = new Upgrade(cookieMultiplier, cookieMultiplierPrice, 2.5, 2, "cookieMultiplierPrice");
        newUpgrade.buyUpgrade();
    } else if (item === 'oven') {
        newUpgrade = new Upgrade(ovens, ovenPrice, 3.1, 2, "ovenPrice");
        newUpgrade.buyUpgrade();
    }else if (item === "cookieFactory"){
        newUpgrade = new Upgrade(cookieFactory, cookieFactoryPrice, 6,5, "cookieFactoryPrice");
        newUpgrade.buyUpgrade();
    }
}

setInterval(() => {
    cookieCount += autoClickers;
    cookieCount += ovens * 3;
    cookieCount += cookieFactory * 10;

    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}, 2000);