let cookieCount = 0;

let itemPrices = [
    10, // autoClickers
    50, // cookieMultiplier (starts at 1 to allow clicking to work)
    100, // ovens
    1000, // cookieFactory
    100000];// cargoPlanes

let itemValues = [ 
    0, // autoClickers
    1, // cookieMultiplier (starts at 1 to allow clicking to work)
    0, // ovens
    0, // cookieFactory
    0  // cargoPlanes
];

const itemImages = [
    "../IMG/Muis.png",
    "../IMG/Cookie.png",
    "../IMG/cookieBaker.png",
    "../IMG/factory.png",
    "../IMG/Airplane.png",
];

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

// Ensure cookieCountDisplay exists before updating
if (cookieCountDisplay) {
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
}

class Upgrade {
    constructor(itemID, priceFactor) {
        this.itemID = itemID;
        this.priceFactor = priceFactor;
    }

    buyUpgrade() {
        if (cookieCount >= itemPrices[this.itemID]) {
            cookieCount -= itemPrices[this.itemID]; // Deduct cost
            itemPrices[this.itemID] *= this.priceFactor; // Increase price
            itemValues[this.itemID] += 1; // Increase item count

            let displayImage = document.createElement("IMG"); 
            displayImage.setAttribute('src', itemImages[this.itemID]);
            displayImage.setAttribute('height', "100px");
            displayImage.setAttribute('width', "100px");

            let displayUpgradeParent =  document.getElementById('itemDisplayNav').children[this.itemID];
            displayUpgradeParent.appendChild(displayImage);

            updateUI();
        } else {
            alert("Not enough cookies!");
        }
    }
}

function addACookie() {
    cookieCount += itemValues[1]; // Use itemValues[1] for cookieMultiplier
    updateUI();
}

function buyItem(item) {
    let newUpgrade;
    if (item === 'autoClicker') {
        newUpgrade = new Upgrade(0, 3);
    } else if (item === 'cookieMultiplier') {
        newUpgrade = new Upgrade(1, 2);
    } else if (item === 'oven') {
        newUpgrade = new Upgrade(2, 3.1);
    } else if (item === "cookieFactory") {
        newUpgrade = new Upgrade(3, 6);
    } else if (item === "cargoPlane") {
        newUpgrade = new Upgrade(4, 3);
    }

    if (newUpgrade) {
        newUpgrade.buyUpgrade();
    }
}

// Auto cookie generation every 2 seconds
setInterval(() => {
    cookieCount += itemValues[0];      // AutoClickers
    cookieCount += itemValues[2] * 5;  // Ovens
    cookieCount += itemValues[3] * 10; // Cookie Factories
    cookieCount += itemValues[4] * 50; // Cargo Planes
    updateUI();
}, 2000);

// Function to update UI
function updateUI() {
    cookieCountDisplay.textContent = "Cookies: " + cookieCount;
    document.getElementById("autoClickerPrice").innerHTML = "Price: " + itemPrices[0] + " Cookies";
    document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + itemPrices[1] + " Cookies";
    document.getElementById("ovenPrice").innerHTML = "Price: " + itemPrices[2] + " Cookies";
    document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + itemPrices[3] + "Cookies";
}