console.log("Cheated cookies are awful! ඞ")
class Shop{
    price;
    itemCount;
    imageurl;
    priceFactor;
    upgradeTier;
    upgradedIMG;

    constructor(price, itemCount, imgurl, priceFactor, displayParentId, saveName,value, upgradeTier, upgradedIMG){
        this.price = price;
        this.itemCount = itemCount;
        this.imageurl= imgurl;
        this.priceFactor = priceFactor;
        this.displayParentId = displayParentId;
        this.saveName = saveName;
        this.value = value;
        this.upgradeTier = upgradeTier;
        this.upgradedIMG = upgradedIMG;
    }

    buyItem() {
        if (Game.cookieCount >= this.price){ // if the user has enough cookies
            Game.cookieCount -= this.price; // Deduct cost
            this.price = Math.floor(this.price * this.priceFactor); // Increase price

            this.loadItem(1); // adding one of the item bought and displaying it
            Game.updateUI(); // updating the ui
            Game.saveGame(this.saveName, this.itemCount); // saving the bought item

            console.log(this.saveName + "price", this.price);
            Game.saveGame(this.saveName + "price", this.price); // saving new itemPrice
        } else {
            alert("Not enough cookies!"); // Show alert if not enough cookies
        }
    }

    loadItem(amountToAdd){ // methods that loads items and displays them
        for (let i=0; i < amountToAdd; i++){ // loading each item
            let displayShopParent = document.getElementById(this.displayParentId);
            // Create a new image element
            let displayImage = document.createElement("IMG");
            displayImage.setAttribute('src', this.imageurl); // Set the image source
            displayImage.setAttribute('height', "100%"); // Set image height
            // Append the image to the container
            displayShopParent.appendChild(displayImage);
            this.itemCount += 1;
        }
    }     
}

class ItemUpgrades extends Shop {
    constructor(price, itemCount, imgurl, priceFactor, displayParentId, saveName, value, targetShop) {
        super(price, itemCount, imgurl, priceFactor, displayParentId, saveName, value);
        this.targetShop = targetShop;
    }

    buyUpgrade() {
        if (Game.cookieCount >= this.price) {
            Game.cookieCount -= this.price;
            this.itemCount += 1;
            this.price = Math.floor(this.price * this.priceFactor);
    
            // Update the stats display for this specific upgrade
            this.updateUpgradeStats();
    
            // Update UI and save progress
            if (this.targetShop){
                this.targetShop.value *= 2;

                console.log("saving " + this.saveName + "count");
                console.log("value " + this.itemCount);

                Game.saveGame(this.saveName + "count", this.itemCount);// saving the upgrade count
                Game.saveGame(this.targetShop.saveName + "value", this.targetShop.value); // saving the upgrade value
                Game.saveGame(this.saveName + "price", this.price); // saving the upgrade price
            }

            Game.updateUI();
        } else {
            alert("Not enough cookies!");
        }
    }

    updateUpgradeStats() {
        // Update only the specific upgrade stat, not all
        if (this.saveName === "goldenMouse") {
            document.getElementById("goldenMouseStat").textContent = `Golden Mouse: ${this.itemCount}`;
        } else if (this.saveName === "diamondCookie") {
            document.getElementById("diamondCookieStat").textContent = `diamondCookies:  ${this.itemCount}`;
        } else if (this.saveName === "superOven") {
            document.getElementById("superOvenStat").textContent = `Super Oven:  ${this.itemCount}`;
        } else if (this.saveName === "electricFactory") {
            document.getElementById("electricFactoryStat").textContent = `Electric Factory:  ${this.itemCount}`;
        } else if (this.saveName === "bigCargoPlane") {
            document.getElementById("bigCargoPlaneStat").textContent = `Big Cargo Plane:  ${this.itemCount}`;
        }
    }
}    

let shopList = [
    new Shop(10, 0, "IMG/Muis.png",1.5, "autoclickerDisplay", 'autoclickers',1,0), // autoclickers
    new Shop(50, 0, "IMG/Cookie.png",1.5, "multiplierDisplay", 'multiplier',1,0), // cookie_multiplier
    new Shop(100, 0, "IMG/cookieBaker.png",1.5, "ovenDisplay", 'ovens',5,0), // ovens
    new Shop(1000, 0, "IMG/factory.png",1.5, "factoryDisplay", 'factories',100,0), // factories
    new Shop(100000, 0, "IMG/Airplane.png",1.5, "planeDisplay", 'airplanes',250,0), // airplanes
]

let upgradeList = [
    new ItemUpgrades(500, 0, "IMG/GoudenMuis.png", 15, "autoclickerDisplay", "goldenMouse", 2, shopList[0]),
    new ItemUpgrades(2500, 0, "IMG/diamondCookie.png", 15, "multiplierDisplay", "diamondCookie", 2.5, shopList[1]),
    new ItemUpgrades(20000, 0, "IMG/SupercookieBaker.png", 15, "ovenDisplay", "superOven", 2.5, shopList[2]),
    new ItemUpgrades(100000, 0, "IMG/Electricfactory.png", 15,"factoryDisplay", "electricFactory", 2.5, shopList[3]),
    new ItemUpgrades(150000, 0, "IMG/BiggerCargoAirplane.png", 15, "planeDisplay", "bigCargoPlane", 5, shopList[4]),
];


// Reference to the cookie counter display
let cookieCountDisplay = document.getElementById("cookieCount");

class game{

    constructor(cookies){
        this.cookieCount = cookies;
    }

    saveGame(name, amount){
        localStorage.setItem(name, amount);
    }

    loadGame() {
        let loadedCookies = localStorage.getItem("cookies");
        if (loadedCookies !== null && !isNaN(parseInt(loadedCookies))) {
            this.cookieCount = parseInt(loadedCookies);
        } else {
            this.cookieCount = 0;
        }
        this.updateUI();
    
        shopList.forEach((itemType, index) => {
            const item = shopList[index];
            const keys = [
                { suffix: '', method: 'loadItem', parse: true },       // item count
                { suffix: 'price', property: 'price' },                 // price
                { suffix: 'value', property: 'value' }                  // Itemvalue
            ];
        
            keys.forEach(({ suffix, method, property, parse }) => {
                const key = itemType.saveName + suffix; // define the key
                const storedValue = localStorage.getItem(key);
        
                if (storedValue !== null) { // if the value is found
                    if (method) {
                        item[method](parse ? parseInt(storedValue) : storedValue); 
                    } else if (property) {
                        item[property] = parse ? parseInt(storedValue) : storedValue;
                    }
                }
            });
        });

        // loading the upgradePrices
       // Load upgrade counts and update UI
        upgradeList.forEach((upgrade) => {
            let count = localStorage.getItem(upgrade.saveName + "count");
            if (count !== null) {
                upgrade.itemCount = parseInt(count); // Save the value to itemCount
                console.log("loading" + upgrade.saveName + "count");
                console.log("loading " + upgrade.itemCount);
            }
        
            // Load saved upgrade price
            const upgradePrice = localStorage.getItem(upgrade.saveName + "price");
            if (upgradePrice !== null){
                upgrade.price = parseInt(upgradePrice);
            }
            upgrade.updateUpgradeStats(); // Refresh the UI
        });
    }
    

    updateUI() {
        cookieCountDisplay.textContent = "Cookies: " + formatNumber(Game.cookieCount);
        // Shop Prices

        document.getElementById("autoClickerPrice").innerHTML = "Price: " + formatNumber(shopList[0].price);
        document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + formatNumber(shopList[1].price);
        document.getElementById("ovenPrice").innerHTML = "Price: " + formatNumber(shopList[2].price);
        document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + formatNumber(shopList[3].price);
        document.getElementById("cargoPlanePrice").innerHTML = "Price: " + formatNumber(shopList[4].price);

        // upgrades
        document.getElementById("goldenMousePrice").innerHTML = "Price: " + formatNumber(upgradeList[0].price);
        document.getElementById("diamondCookiePrice").innerHTML = "Price: " + formatNumber(upgradeList[1].price);
        document.getElementById("SuperOvenPrice").innerHTML = "Price: " + formatNumber(upgradeList[2].price);
        document.getElementById("ElectricFactoryPrice").innerHTML = "Price: " + formatNumber(upgradeList[3].price);
        document.getElementById("BigcargoPlanePrice").innerHTML = "Price: " + formatNumber(upgradeList[4].price);

        // adjusting the itemsDisplays width to match with scrolling of parent
        let displayNavWidth = document.getElementById("itemDisplayNav").scrollWidth;
        let items = document.querySelectorAll(".itemDisplay");
        items.forEach(item => {
            item.style.width = `${displayNavWidth}px`; // Set each item's width to match
        });

        let CPSCounter = 0; // updating the CPS counter
        shopList.forEach(item => { // looping each shop item
            if (item.saveName != "multiplier"){ // since multipliers shouldn't give cookies, it's filterd here
                Game.cookieCount += item.itemCount * item.value;
    
                CPSCounter += item.itemCount * item.value; // calculating the CPS
                console.log(CPSCounter);
                document.getElementById('CPSCounter').innerHTML = "per second: " + formatNumber(CPSCounter);// updating the CPSCounter
            }
        })
    }

    addACookie() { // if the user clicked on a cookie manually
        this.cookieCount += shopList[1].itemCount * shopList[1].value + 1;
        this.updateUI();
        this.makeCookieFall(); // makes a falling cookie
    }

    makeCookieFall(){ // method that makes a small falling cookie if you click on the big cookie
        let fallingCookie = document.createElement("img");
        fallingCookie.src = "IMG/Cookie.png";
        fallingCookie.classList.add("falling-cookie");

        // Position the cookie at users mouse locataion
        fallingCookie.style.left = `${event.clientX - 25}px`;
        fallingCookie.style.top = `${event.clientY - 25}px`;
        document.body.appendChild(fallingCookie);
        // Remove the cookie after animation ends
        setTimeout(() => fallingCookie.remove(), 1000);
    }

    spawnGoldenCookie(){ // method that makes golden cookies  spawn
        let randomNumber = Math.floor(Math.random() * 2) + 1; // random number from 1 to 100
        if (randomNumber != 1){ // 43 is just a random number I selected. If the random number is 42 it spawns a a golden cookie
            let goldenCookie = document.createElement("img");
            goldenCookie.classList.add("goldenCookie");
            goldenCookie.src = "IMG/GoldenCookie.png";
            goldenCookie.style.left = Math.floor(Math.random() * 100) + 1 + '%'; // randomizing the cookies position
            goldenCookie.style.top = Math.floor(Math.random() * 100) + 1 + '%';
            document.body.appendChild(goldenCookie);

            goldenCookie.onclick = () => {
                this.cookieCount *= 1.5
                Math.floor(this.cookieCount); // rounding the cookiecount to a whole number
                this.updateUI;

                goldenCookie.remove(); // remove it right after click
            };

            setTimeout(() => goldenCookie.remove(), 3000);
        }
    }
}

class menu {
    static currentlyOpenMenu = null; // static variable to track the open menu

    constructor(menuId) {
        this.menuId = menuId;
        this.menuItem = document.getElementById(this.menuId);
        this.menuIsOpen = false;
    }

    openShopMenu() {
        // If another menu is open and it's not this one, close it
        if (menu.currentlyOpenMenu && menu.currentlyOpenMenu !== this) {
            menu.currentlyOpenMenu.closeMenu();
        }

        if (!this.menuIsOpen) { // if the menu is closed, open it
            this.menuItem.style.width = "20%";
            document.getElementById("itemDisplayNav").style.width = "80%";
            this.menuIsOpen = true;
            menu.currentlyOpenMenu = this;
        } else { // close the menu
            this.closeMenu();
        }
    }

    closeMenu() {
        this.menuItem.style.width = "0";
        document.getElementById("itemDisplayNav").style.width = "100%";
        this.menuIsOpen = false;
    }
}
let Game = new game(0);
let Menu = new menu("shop");
let UpgradesMenu = new menu("upgradesMenu");

Game.loadGame();

function formatNumber(num){
    if (num >= 1e18) return (num / 1e18).toFixed(2) + "S";  // Sextillions
    if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qi"; // Quintillions
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "Q";  // Quadrillions
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";    // Billions
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";    // Millions
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";    // Thousands
    return num; // No formatting for small numbers
}

// Auto cookie generation every 2 seconds
setInterval(() => {
    Game.saveGame('cookies', Game.cookieCount); // saving the cookieCount
    Game.updateUI();
    Game.spawnGoldenCookie();
}, 2000);