let cookieCount = 0;

class Upgrade{
    price;
    value;
    imageurl;
    priceFactor;

    constructor(price, value, imgurl, priceFactor, displayParentId){
        this.price = price;
        this.value = value;
        this.imageurl= imgurl;
        this.priceFactor = priceFactor;
        this.displayParentId = displayParentId;
    }

    buyUpgrade() {
        if (cookieCount >= this.price){ // if the user has enough cookies
            cookieCount -= this.price; // Deduct cost
            this.price = Math.floor(this.price * this.priceFactor); // Increase price
            this.value += 1; // Increase item count

            let displayUpgradeParent = document.getElementById(this.displayParentId);

            // Check if the container has less than 16 items
            if (displayUpgradeParent.children.length < maxItems) {
                // Create a new image element
                let displayImage = document.createElement("IMG"); 
                displayImage.setAttribute('src', this.imageurl); // Set the image source
                displayImage.setAttribute('height', "100%"); // Set image height
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

let shopList = [
    new Upgrade(10, 0, "IMG/Muis.png",1.5, "autoclickerDisplay"), // autoclickers
    new Upgrade(50, 1, "IMG/Cookie.png",1.5, "multiplierDisplay"), // cookie_multiplier
    new Upgrade(100, 0, "IMG/cookieBaker.png",1.5, "ovenDisplay"), // ovens
    new Upgrade(1000, 0, "IMG/factory.png",1.5, "factoryDisplay"), // factories
    new Upgrade(100000, 0, "IMG/Airplane.png",1.5, "planeDisplay"), // airplanes
]

let upgradeList = [
    new Upgrade(500, 0, "IMG/GoudenMuis.png",1.5, "goldenautoclickerDisplay"), // golden_mouse
    new Upgrade(2500, 1, "IMG/stroopwafel.png",1.5, "stroopwaffleDisplay"), // stroopwaffles
    new Upgrade(20000, 0, "IMG/SupercookieBaker.png",1.5, "superovenDisplay"), // super_ovens
    new Upgrade(100000, 0, "IMG/Electricfactory.png",1.5, "elecfactoryDisplay"), // electric_factories
    new Upgrade(150000, 0, "IMG/BiggerCargoAirplane.png",1.5, "bplaneDisplay"), // big_cargo_planes
]

const maxItems = 16; // Prevents overflowing of the containers

// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

class game{
    updateUI() {
        cookieCountDisplay.textContent = "Cookies: " + this.formatNumber(cookieCount);

        // Shop Prices
        document.getElementById("autoClickerPrice").innerHTML = "Price: " + this.formatNumber(shopList[0].price);
        document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + this.formatNumber(shopList[1].price);
        document.getElementById("ovenPrice").innerHTML = "Price: " + this.formatNumber(shopList[2].price);
        document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + this.formatNumber(shopList[3].price);
        document.getElementById("cargoPlanePrice").innerHTML = "Price: " + this.formatNumber(shopList[4].price);

        // Upgrades Prices
        document.getElementById("goldenMousePrice").innerHTML = "Price: " + this.formatNumber(upgradeList[5].price);
        document.getElementById("StroopwafflePrice").innerHTML = "Price: " + this.formatNumber(upgradeList[6].price);
        document.getElementById("SuperOvenPrice").innerHTML = "Price: " + this.formatNumber(upgradeList[7].price);
        document.getElementById("ElectricFactoryPrice").innerHTML = "Price: " + this.formatNumber(upgradeList[8].price);
        document.getElementById("BigcargoPlanePrice").innerHTML = "Price: " + this.formatNumber(upgradeList[9].price);
    }

    formatNumber(num){
        if (num >= 1e18) return (num / 1e18).toFixed(2) + "S";  // Sextillions
        if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qi"; // Quintillions
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "Q";  // Quadrillions
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";    // Billions
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";    // Millions
        if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";    // Thousands
        return num; // No formatting for small numbers
    }

    addACookie() { // if the user clicked on a cookie manually
        cookieCount += shopList[1].value;
        this.updateUI();
    }
}

class menu{

    constructor(menuId){
        this.menuId = menuId;
        this.menuItem = document.getElementById(this.menuId);
        this.menuIsOpen = false;
    }

    openShopMenu(){
        
        if (this.menuIsOpen == false){
            this.menuItem.style.width = "20%";
        }else{
            this.menuItem.style.width = "0";
        }
        this.menuIsOpen = !this.menuIsOpen;
    }
}

let Game = new game();
let Menu = new menu("shop");

// Auto cookie generation every 2 seconds
setInterval(() => {
    cookieCount += shopList[0].value;       // AutoClickers
    cookieCount += shopList[2].value * 5;   // Ovens
    cookieCount += shopList[3].value * 10;  // Cookie Factories
    cookieCount += shopList[4].value * 50;  // Cargo Planes

    cookieCount += upgradeList[5].value * 10  // Golden Mouse
    cookieCount += upgradeList[7].value * 30;  // Super Oven
    cookieCount += upgradeList[8].value * 50;    //  Electric Factories
    cookieCount += upgradeList[9].value * 100;  // Bigger Cargo Plane

    Game.updateUI();  // Call updateUI from the instance, not the class
}, 2000);
