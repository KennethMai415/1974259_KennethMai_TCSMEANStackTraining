let shoppingCartItems : any = new Array();
let cartCount: number = 0;

class item {
    constructor(readonly itemName: any , readonly price: any, public quantity: number) { };
}

function reloadShoppingItems() : void {
    let items : any = sessionStorage.getItem("AddedItems");
    if(items != null) {
        let cartSize = 0;
        let parsedItems = JSON.parse(items);

        for(let element of parsedItems) {
            shoppingCartItems.push(element);
            cartSize += element.quantity;
        }
        cartCount = cartSize;
        updateCartSize(cartSize);
    }
}

function addToCart(itemID : string) : void {
    const itemElement = document.querySelector("#" + itemID);
    let productItem : item = new item(itemElement?.getAttribute("data-itemName"), itemElement?.getAttribute("data-itemPrice"), 1);

    if(shoppingCartItems.length == 0) {
        shoppingCartItems.push(productItem);
    } else {
        let found : boolean = false;
        for(let el of shoppingCartItems) {
            if(itemID == el.itemName) {
                el.quantity++;
                found = true;
                break;
            }
        }
        if(!found) {
            shoppingCartItems.push(productItem);
        }
    }
    cartCount++;
    updateCartSize(cartCount);
    sessionStorage.setItem("AddedItems", JSON.stringify(shoppingCartItems));
}

function loadShoppingCart() : void {
    let checkoutPrice = 0;
    let cartCount = 0;
    let table = document.getElementById("shoppingCartTable");

    if(table != null) {
        let body = table.getElementsByTagName("tbody")[0];
        let items : any = sessionStorage.getItem("AddedItems");
        let parsedItems = JSON.parse(items);
        for(let element of parsedItems) {
            let newRow = body.insertRow(0);   

            newRow.insertCell(0).innerHTML= element.itemName;    
            newRow.insertCell(1).innerHTML= element.quantity;                  
            newRow.insertCell(2).innerHTML= element.price;
        
            checkoutPrice += parseFloat(element.quantity) * parseFloat(element.price);
            cartCount += element.quantity;
        }
        const totalPriceElement = document.createElement('p');
        totalPriceElement.className = 'p';
        totalPriceElement.innerHTML = `<p style="color:white">Total Checkout Price: $` + checkoutPrice.toFixed(2) + `</p>`;
        document.getElementById("shoppingCartArea")?.appendChild(totalPriceElement);
        updateCartSize(cartCount);
    }
}

function updateCartSize(cartCount : number) : void {
    let cartSizeLabel = document.getElementById("cartSize");
    if(cartSizeLabel) {
        cartSizeLabel.innerHTML = "Cart Size: " + cartCount;
    }
}