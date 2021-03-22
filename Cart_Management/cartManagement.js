var shoppingCartItems = new Array();
var cartCount = 0;
var item = /** @class */ (function () {
    function item(itemName, price, quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
    ;
    return item;
}());
function reloadShoppingItems() {
    var items = sessionStorage.getItem("AddedItems");
    if (items != null) {
        var cartSize = 0;
        var parsedItems = JSON.parse(items);
        for (var _i = 0, parsedItems_1 = parsedItems; _i < parsedItems_1.length; _i++) {
            var element = parsedItems_1[_i];
            shoppingCartItems.push(element);
            cartSize += element.quantity;
        }
        cartCount = cartSize;
        updateCartSize(cartSize);
    }
}
function addToCart(itemID) {
    var itemElement = document.querySelector("#" + itemID);
    var productItem = new item(itemElement === null || itemElement === void 0 ? void 0 : itemElement.getAttribute("data-itemName"), itemElement === null || itemElement === void 0 ? void 0 : itemElement.getAttribute("data-itemPrice"), 1);
    if (shoppingCartItems.length == 0) {
        shoppingCartItems.push(productItem);
    }
    else {
        var found = false;
        for (var _i = 0, shoppingCartItems_1 = shoppingCartItems; _i < shoppingCartItems_1.length; _i++) {
            var el = shoppingCartItems_1[_i];
            if (itemID == el.itemName) {
                el.quantity++;
                found = true;
                break;
            }
        }
        if (!found) {
            shoppingCartItems.push(productItem);
        }
    }
    cartCount++;
    updateCartSize(cartCount);
    sessionStorage.setItem("AddedItems", JSON.stringify(shoppingCartItems));
}
function loadShoppingCart() {
    var _a;
    var checkoutPrice = 0;
    var cartCount = 0;
    var table = document.getElementById("shoppingCartTable");
    if (table != null) {
        var body = table.getElementsByTagName("tbody")[0];
        var items = sessionStorage.getItem("AddedItems");
        var parsedItems = JSON.parse(items);
        for (var _i = 0, parsedItems_2 = parsedItems; _i < parsedItems_2.length; _i++) {
            var element = parsedItems_2[_i];
            var newRow = body.insertRow(0);
            newRow.insertCell(0).innerHTML = element.itemName;
            newRow.insertCell(1).innerHTML = element.quantity;
            newRow.insertCell(2).innerHTML = element.price;
            checkoutPrice += parseFloat(element.quantity) * parseFloat(element.price);
            cartCount += element.quantity;
        }
        var totalPriceElement = document.createElement('p');
        totalPriceElement.className = 'p';
        totalPriceElement.innerHTML = "<p style=\"color:white\">Total Checkout Price: $" + checkoutPrice.toFixed(2) + "</p>";
        (_a = document.getElementById("shoppingCartArea")) === null || _a === void 0 ? void 0 : _a.appendChild(totalPriceElement);
        updateCartSize(cartCount);
    }
}
function updateCartSize(cartCount) {
    var cartSizeLabel = document.getElementById("cartSize");
    if (cartSizeLabel) {
        cartSizeLabel.innerHTML = "Cart Size: " + cartCount;
    }
}
