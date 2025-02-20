let cookieCount = 0;

let itemPrices = [10, 50, 100, 1000, 100000];

let itemValues = [ 
    0, // autoClickers
    1, // cookieMultiplier (starts at 1 to allow clicking to work)
    0, // ovens
    0, // cookieFactory
    0  // cargoPlanes
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
        newUpgrade = new Upgrade(1, 2.5);
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
    if (cookieCountDisplay) {
        cookieCountDisplay.textContent = "Cookies: " + cookieCount;
    }
}
