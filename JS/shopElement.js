let cookieCount = -1;

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

const maxItems = 16; // Prevents overflowing of the containers

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

// Ensure cookieCountDisplay exists before updating
if (cookieCountDisplay) {
    cookieCountDisplay.textContent = "Cookies: " + formatNumber(cookieCount);
}


class game{
    constructor() {
        this.cookies = itemValues[0];
        this.addACookie();
    }

    updateUI() {
        cookieCountDisplay.textContent = "Cookies: " + formatNumber(cookieCount);
        document.getElementById("autoClickerPrice").innerHTML = "Price: " + formatNumber(itemPrices[0]) + " Cookies";
        document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + formatNumber(itemPrices[1]) + " Cookies";
        document.getElementById("ovenPrice").innerHTML = "Price: " + formatNumber(itemPrices[2]) + " Cookies";
        document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + formatNumber(itemPrices[3]) + " Cookies";
        document.getElementById("cargoPlanePrice").innerHTML = "Price: " + formatNumber(itemPrices[4]) + " Cookies";
    }

    addACookie() { // if the user clicked on a cookie manually
        cookieCount += itemValues[1]; // Use itemValues[1] for cookieMultiplier
        this.updateUI();
    }
    
}

class Upgrade {

   buyUpgrade(itemID, priceFactor) {
        if (cookieCount >= itemPrices[itemID]) {
            cookieCount -= itemPrices[itemID]; // Deduct cost
            itemPrices[itemID] = Math.floor(itemPrices[itemID] * priceFactor); // Increase price
            itemValues[itemID] += 1; // Increase item count

            let displayUpgradeParent = document.getElementById('itemDisplayNav').children[itemID];

            // Check if the container has less than 12 items
            if (displayUpgradeParent.children.length < maxItems) {
                // Create a new image element
                let displayImage = document.createElement("IMG"); 
                displayImage.setAttribute('src', itemImages[itemID]); // Set the image source
                displayImage.setAttribute('height', "70px"); // Set image height
                displayImage.setAttribute('width', "70px");  // Set image width

                // Append the image to the container
                displayUpgradeParent.appendChild(displayImage);
            }

            // Update the UI to reflect the changes
            Game.updateUI();
        } else {
            alert("Not enough cookies!"); // Show alert if not enough cookies
        }
    }
}

let Game = new game();
let newUpgrade = new Upgrade();

    // Auto cookie generation every 2 seconds
    setInterval(() => {
        cookieCount += itemValues[0];      // AutoClickers
        cookieCount += itemValues[2] * 5;  // Ovens
        cookieCount += itemValues[3] * 10; // Cookie Factories
        cookieCount += itemValues[4] * 50; // Cargo Planes
        Game.updateUI();  // Call updateUI from the instance, not the class
    }, 2000);

function formatNumber(num){
    if (num >= 1e18) return (num / 1e18).toFixed(2) + "S";  // Sextillions
    if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qi"; // Quintillions
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "Q";  // Quadrillions
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";    // Billions
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";    // Millions
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";    // Thousands
    return num; // No formatting for small numbers
}