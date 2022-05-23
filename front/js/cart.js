const cartItems = [];
const productId = [];
const cartTotalPrice = [];
const totalQty = [];

const displayItems = document.getElementById('cart__items');
 const qtyDisplay = document.getElementById('totalQuantity')


// get items from local Storage
const getCartItems = () => {
    for (const [key, value] of Object.entries(localStorage)) {
     cartItems.push(JSON.parse(value))
    } 
    console.log(cartItems);
    
    // getting id's from cartItems and push to productId 
   for(let item of cartItems) {
     productId.push(item.id);
    }
    
     console.log(productId);
}

getCartItems();



// display cart items inside html file

if (cartItems.length < 1) {
    alert('Your Cart is empty please select a product');
    window.location.href = 'index.html';
}

if (cartItems.length > 0) {
    for (let item of cartItems) {
       
    displayItems.innerHTML += ` <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${item.image}" alt="${item.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantity: </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="qty" value="${item.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                         <p class="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>`;
   }
}


// calculate the total quantity of items

const totalQuantity = () => {
    let qty = 0;
    for (let item of cartItems) {
        qty += parseInt(item.qty)   
    }

    totalQty.push(qty)
    qtyDisplay.innerHTML = totalQty;
}

totalQuantity();

// calculate the total price

const totalPrice = () => {

}

totalPrice();