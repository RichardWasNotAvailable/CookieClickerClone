console.log("Cheated cookies are awful! ඞ")
class Shop{
    price;
    itemCount;
    imageurl;
    priceFactor;

    constructor(price, itemCount, imgurl, priceFactor, displayParentId, saveName,value){
        this.price = price;
        this.itemCount = itemCount;
        this.imageurl= imgurl;
        this.priceFactor = priceFactor;
        this.displayParentId = displayParentId;
        this.saveName = saveName;
        this.value = value;
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

            Game.updateImage(this.displayParentId, this.imageurl);

            if (this.itemCount === 1 && this.targetShop) {
                this.targetShop.value = this.value;
                console.log(`Upgraded ${this.targetShop.saveName} value to ${this.value}`);
            }

            Game.updateUI();
            Game.saveGame(this.saveName, this.itemCount);
            Game.saveGame(this.saveName + "price", this.price);
        } else {
            alert("Not enough cookies!");
        }
    }
}   

let shopList = [
    new Shop(10, 0, "IMG/Muis.png",1.5, "autoclickerDisplay", 'autoclickers',1), // autoclickers
    new Shop(50, 1, "IMG/Cookie.png",1.5, "multiplierDisplay", 'multiplier',1), // cookie_multiplier
    new Shop(100, 0, "IMG/cookieBaker.png",1.5, "ovenDisplay", 'ovens',5), // ovens
    new Shop(1000, 0, "IMG/factory.png",1.5, "factoryDisplay", 'factories',100), // factories
    new Shop(100000, 0, "IMG/Airplane.png",1.5, "planeDisplay", 'airplanes',250), // airplanes
]

let upgradeList = [
    new ItemUpgrades(500, 0, "IMG/GoudenMuis.png", 1.5, "autoclickerDisplay", "goldenMouse", 10, shopList[0]),
    new ItemUpgrades(2500, 1, "IMG/stroopwafel.png", 1.5, "multiplierDisplay", "stroopwaffle", 5, shopList[1]),
    new ItemUpgrades(20000, 0, "IMG/SupercookieBaker.png", 1.5, "ovenDisplay", "superOven", 30, shopList[2]),
    new ItemUpgrades(100000, 0, "IMG/Electricfactory.png", 1.5, "factoryDisplay", "electricFactory", 50, shopList[3]),
    new ItemUpgrades(150000, 0, "IMG/BiggerCargoAirplane.png", 1.5, "planeDisplay", "bigCargoPlane", 100, shopList[4]),
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

    loadGame(){
        // loading the cookies
        let loadedCookies = localStorage.getItem("cookies");
        if (loadedCookies != null){
            this.cookieCount = parseInt(loadedCookies);
        }

        // loading the items
        let itemCounter = 0;

        shopList.forEach(itemType => {
            let itemName = itemType.saveName;
            if (localStorage.getItem(itemName)){
                let itemCount = localStorage.getItem(itemName); // getting the items from the local storage
                shopList[itemCounter].loadItem(itemCount); // calling the method that loads the correct amount of items into the game
            }
            // loading 
            let priceName = itemType.saveName + "price";
            if (localStorage.getItem(priceName)){
                let itemPrice = localStorage.getItem(priceName); // getting the items from the local storage
                shopList[itemCounter].price = itemPrice;
            }
            itemCounter += 1;
        });
     }

    updateUI() {
        cookieCountDisplay.textContent = "Cookies: " + this.formatNumber(Game.cookieCount);
        // Shop Prices
        document.getElementById("autoClickerPrice").innerHTML = "Price: " + this.formatNumber(shopList[0].price);
        document.getElementById("cookieMultiplierPrice").innerHTML = "Price: " + this.formatNumber(shopList[1].price);
        document.getElementById("ovenPrice").innerHTML = "Price: " + this.formatNumber(shopList[2].price);
        document.getElementById("cookieFactoryPrice").innerHTML = "Price: " + this.formatNumber(shopList[3].price);
        document.getElementById("cargoPlanePrice").innerHTML = "Price: " + this.formatNumber(shopList[4].price);

        // Shops Prices
        document.getElementById("goldenMousePrice").innerHTML = "Price: " + this.formatNumber(upgradeList[0].price);
        document.getElementById("StroopwafflePrice").innerHTML = "Price: " + this.formatNumber(upgradeList[1].price);
        document.getElementById("SuperOvenPrice").innerHTML = "Price: " + this.formatNumber(upgradeList[2].price);
        document.getElementById("ElectricFactoryPrice").innerHTML = "Price: " + this.formatNumber(upgradeList[3].price);
        document.getElementById("BigcargoPlanePrice").innerHTML = "Price: " + this.formatNumber(upgradeList[4].price);

        // adjusting the itemsDisplays width to match with scrolling of parent
        let displayNavWidth = document.getElementById("itemDisplayNav").scrollWidth;
        let items = document.querySelectorAll(".itemDisplay");
        items.forEach(item => {
            item.style.width = `${displayNavWidth}px`; // Set each item's width to match
        });
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
        this.cookieCount += shopList[1].itemCount;
        this.updateUI();
        this.makeCookieFall(); // makes a falling cookie
    }

    updateImage(displayId, newImageUrl){
        let imageDisplay = document.getElementById(displayId);
        let displayChildren = imageDisplay.childNodes;

        for (let i=0; i < displayChildren.length; i++){ // looping through each image
            displayChildren[i].setAttribute('src', newImageUrl);
        }
    }

    makeCookieFall(){
        let fallingCookie = document.createElement("img");
        fallingCookie.src = "IMG/Cookie.png";
        fallingCookie.classList.add("falling-cookie");

        // Position the cookie at the mouse click location
        fallingCookie.style.left = `${event.clientX - 25}px`;
        fallingCookie.style.top = `${event.clientY - 25}px`;
        document.body.appendChild(fallingCookie);
        // Remove the cookie after animation ends
        setTimeout(() => fallingCookie.remove(), 1000);
    }
}

class menu{
    constructor(menuId){
        this.menuId = menuId;
        this.menuItem = document.getElementById(this.menuId);
        this.menuIsOpen = false;
    }

    openShopMenu(){// opens and closes the menu depending on menuIsOpen
        
        if (this.menuIsOpen == false){
            this.menuItem.style.width = "20%"; // opening the menu
            document.getElementById("itemDisplayNav").style.width = "80%";

        }else{
            this.menuItem.style.width = "0"; // closing the menu
            document.getElementById("itemDisplayNav").style.width = "100%";
        }
        this.menuIsOpen = !this.menuIsOpen; // switching menu to open or closed
    }
}

let Game = new game(0);
let Menu = new menu("shop");

Game.loadGame();

// Auto cookie generation every 2 seconds
setInterval(() => {
    Game.cookieCount += shopList[0].itemCount * shopList[0].value; // AutoClickers
    Game.cookieCount += shopList[2].itemCount * shopList[2].value; // Ovens
    Game.cookieCount += shopList[3].itemCount * shopList[3].value; // Cookie Factories
    Game.cookieCount += shopList[4].itemCount * shopList[4].value; // Cargo Planes

    Game.saveGame('cookies', Game.cookieCount);
    Game.updateUI();
}, 2000);
