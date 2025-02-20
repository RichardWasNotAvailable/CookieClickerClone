let cookieCount = 0;

// Initial prices
let autoClickers = 0;
let cookieMultiplier = 1;
let ovens = 0;
let cookieFactory = 0;

let itemPrices = [
    10, 50, 100, 1000
];

let itemValues = [ // each 0 here is an item value
    0, // autoclickers
    1, // cookieMultiplier
    0, // ovens
    0, // cookiefactory
];

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

class Upgrade {
    constructor(itemID, priceFactor) {
        this.itemID = itemID; // Reference to the global variable (autoClickers, cookieMultiplier, etc.)
        this.priceFactor = priceFactor;
    }

    buyUpgrade() {
        //alert(cookieCount + "/" + itemPrices[this.itemID])
        if (cookieCount >= itemPrices[this.itemID]){
            cookieCount -= itemPrices[this.itemID]; // subtracting cookies from price
            itemPrices[this.itemID] *= this.priceFactor; // increasing price
            itemValues[this.itemID] += 1; // giving the player the item(by adding one)
            
            alert(itemValues[0]);
        }
    }
}

function addACookie(){
    cookieCount += cookieMultiplier;
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}

function buyItem(item) {
    let newUpgrade;

    if (item === 'autoClicker'){
        newUpgrade = new Upgrade(0, 3);
        newUpgrade.buyUpgrade();
    } else if (item === 'cookieMultiplier') {
        newUpgrade = new Upgrade(1, 2.5);
        newUpgrade.buyUpgrade();
    } else if (item === 'oven') {
        newUpgrade = new Upgrade(2, 3.1);
        newUpgrade.buyUpgrade(ovens);
    }else if (item === "cookieFactory"){
        newUpgrade = new Upgrade(3, 6);
        newUpgrade.buyUpgrade();
    }
}

setInterval(() => {
    cookieCount += itemValues[0];
    cookieCount += itemValues[2] * 5;
    cookieCount += itemValues[3] * 10;

    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}, 2000);