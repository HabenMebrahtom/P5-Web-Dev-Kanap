const cartItems = [];
const productId = [];
const cartTotalPrice = [];
const totalQty = [];

const displayItems = document.getElementById('cart__items');
const qtyDisplay = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');



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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="newQuantity" value="${item.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                         <p class="deleteItem" id="deleteItem">Delete</p>
                    </div>
                  </div>
                </div>
              </article>`;
   }
}


// remove an item from local storage
const removeCartItem = document.getElementById('deleteItem');

const removeItems = () => {
    for (let i = 0; i < cartItems.length; i++) {
        removeCartItem.value = Object.keys(localStorage)[i];
        removeCartItem.addEventListener('click', () => {
            if (removeCartItem.value) {
                localStorage.removeItem(removeCartItem.value)
                location.reload();
         }
    })
    }
}

removeItems();

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

const calculateTotalPrice = () => {
    for (let item of cartItems) {
        let price = parseInt(item.price);
        let itemQty = parseInt(item.qty);

        const tPrice = price * itemQty;
         cartTotalPrice.push(tPrice);
    }   
}

calculateTotalPrice();


//calculate the sum of total prices and display it inside html

const totalAmount = cartTotalPrice.reduce((prev, current) => {
    return prev + current;
})

totalPrice.innerHTML = totalAmount;


//update cart items with change in the quality input

const updateItems = () => {

    const newQty = document.getElementById('newQuantity');

    for (let i = 0; i < cartItems.length; i++) {
        newQty.addEventListener('change', (event) => {
            event.preventDefault();

            if (newQty.value > 0) {
                let newCartObject = {
                    id: cartItems[i].id,
                    name: cartItems[i].name,
                    color: cartItems[i].color,
                    price: cartItems[i].price,
                    qty: event.target.value,
                    image: cartItems[i].image,
                    alt: cartItems[i].alt
                }
                const itemKey = `${cartItems[i].name}, ${cartItems[i].id}`;
                window.localStorage.setItem(itemKey, JSON.stringify(newCartObject));
                location.reload(true);
            }
        });
    }
}

updateItems()