let cookieCount = 0;

class Upgrade{
    price;
    value;
    imageurl;
    priceFactor;

    constructor(price, value, imgurl, priceFactor, displayParent){
        this.price = price;
        this.value = value;
        this.imageurl= imgurl;
        this.priceFactor = priceFactor;
        this.displayParent = displayParent;
    }

    buyUpgrade() {
        if (cookieCount >= this.price){
            cookieCount -= this.price; // Deduct cost
            this.price = Math.floor(this.price * this.priceFactor); // Increase price
            this.value += 1; // Increase item count

            let displayUpgradeParent = document.getElementById(this.displayParent);

            // Check if the container has less than 12 items
            if (displayUpgradeParent.children.length < maxItems) {
                // Create a new image element
                let displayImage = document.createElement("IMG"); 
                displayImage.setAttribute('src', this.imageurl); // Set the image source
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

let upgradeList = [
    new Upgrade(10, 0, "../IMG/Muis.png",1.3, "autoclickerDisplay"), // autoclickers
    new Upgrade(50, 1, "../IMG/Cookie.png",1.5, "multiplierDisplay"), // cookie_multiplier
    new Upgrade(100, 0, "../IMG/cookieBaker.png",1.5, "ovenDisplay"), // ovens
    new Upgrade(1000, 0, "../IMG/factory.png",1.5, "factoryDisplay"), // factories
    new Upgrade(100000, 0, "../IMG/Airplane.png",1.5, "planeDisplay"), // airplanes
]

const maxItems = 16; // Prevents overflowing of the containers

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

class game{
    formatNumber(num){
        if (num >= 1e18) return (num / 1e18).toFixed(2) + "S";  // Sextillions
        if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qi"; // Quintillions
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "Q";  // Quadrillions
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";    // Billions
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";    // Millions
        if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";    // Thousands
        return num; // No formatting for small numbers
    }
    updateUI() {
        cookieCountDisplay.textContent = "Cookies: " + this.formatNumber(cookieCount);
        document.getElementById("autoClickerPrice").innerHTML = "Price: " + formatNumber(upgradeList[0].price) + " Cookies";
        document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + formatNumber(upgradeList[1].price) + " Cookies";
        document.getElementById("ovenPrice").innerHTML = "Price: " + formatNumber(upgradeList[2].price) + " Cookies";
        document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + formatNumber(upgradeList[3].price) + " Cookies";
        document.getElementById("cargoPlanePrice").innerHTML = "Price: " + formatNumber(upgradeList[4].price) + " Cookies";
    }

    
    addACookie() { // if the user clicked on a cookie manually
        cookieCount += upgradeList[1].value;
        this.updateUI();
    }
}

let Game = new game();
    // Auto cookie generation every 2 seconds
    setInterval(() => {
        cookieCount += upgradeList[0].value;      // AutoClickers
        cookieCount += upgradeList[2].value * 5;  // Ovens
        cookieCount += upgradeList[3].value * 10; // Cookie Factories
        cookieCount += upgradeList[4].value * 50; // Cargo Planes
        Game.updateUI();  // Call updateUI from the instance, not the class
    }, 2000);
