let cookieCount = 4095860;

let itemPrices = [
    10, // autoClickers
    50, // cookieMultiplier (starts at 1 to allow clicking to work)
    100, // ovens
    1000, // cookieFactory
    100000]; // cargoPlanes

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

const maxItems = 12; // Prevents overflowing of the containers

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

// Ensure cookieCountDisplay exists before updating
if (cookieCountDisplay) {
    cookieCountDisplay.textContent = "Cookies: " + formatNumber(cookieCount);
}

class Upgrade {
    constructor(itemID, priceFactor, itemImages) {
        this.itemID = itemID;
        this.priceFactor = priceFactor;
        this.itemImages = itemImages;
    }

   buyUpgrade() {
    if (cookieCount >= itemPrices[this.itemID]) {
        cookieCount -= itemPrices[this.itemID]; // Deduct cost
        itemPrices[this.itemID] *= this.priceFactor; // Increase price
        itemValues[this.itemID] += 1; // Increase item count

        let displayUpgradeParent = document.getElementById('itemDisplayNav').children[this.itemID];
        
        // Check if the container has less than 12 items
        if (displayUpgradeParent.children.length < maxItems) {
            // Create a new image element
            let displayImage = document.createElement("IMG"); 
            displayImage.setAttribute('src', itemImages[this.itemID]); // Set the image source
            displayImage.setAttribute('height', "100px"); // Set image height
            displayImage.setAttribute('width', "100px");  // Set image width
            
            // Append the image to the container
            displayUpgradeParent.appendChild(displayImage);
        }

        // Update the UI to reflect the changes
        updateUI();
    } else {
        alert("Not enough cookies!"); // Show alert if not enough cookies
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
        newUpgrade = new Upgrade(2, 3);
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
        cookieCountDisplay.textContent = "Cookies: " + formatNumber(cookieCount);
        
        document.getElementById("autoClickerPrice").innerHTML = "Price: " + formatNumber(itemPrices[0]) + " Cookies";
        document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + formatNumber(itemPrices[1]) + " Cookies";
        document.getElementById("ovenPrice").innerHTML = "Price: " + formatNumber(itemPrices[2]) + " Cookies";
        document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + formatNumber(itemPrices[3]) + " Cookies";
        document.getElementById("cargoPlanePrice").innerHTML = "Price: " + formatNumber(itemPrices[4]) + " Cookies";
    }
}

function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(2) + "S";  // Sextillions
    if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qi"; // Quintillions
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "Q";  // Quadrillions
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";    // Billions
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";    // Millions
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";    // Thousands
    return num; // No formatting for small numbers
}
