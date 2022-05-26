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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="new-quantity" value="${item.qty}">
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


//update cart items with change event in the quality input

const newQtys = document.querySelector('.itemQuantity');

   newQtys.addEventListener('change', (event) => {
        event.preventDefault();
       for (let item of cartItems) {
            let newCart = {
                id: item.id,
                name: item.name,
                color: item.color,
                price: item.price,
                qty: event.target.value,
                image: item.image,
                alt: item.alt
            }

                const itemKey = `${item.name}, ${item.color}`;
                localStorage.setItem(itemKey, JSON.stringify(newCart));
                location.reload();
            } 
    })
         




// validate the form

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');


// checking the valid email adress
const validateEmail = (mail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(mail).toLocaleLowerCase())) {
        return true;
    } else {
        return false;
    }
}


const passValidationForm = () => {
    if (firstName.value != "" && lastName.value != "" && address.value != "" && city.value != "" && validateEmail(email.value) != false) {
        return true;
    } else if(firstName.value === "") {
        firstNameErrorMsg.innerHTML = "Please write your  first name";
        firstNameErrorMsg.style.color = 'red';
        return false;
    } else if (lastName.value == "") {
        lastNameErrorMsg.innerHTML = "Please write your  last name";
        lastNameErrorMsg.style.color = 'red';
        return false;
    } else if (address.value == "") {
        addressErrorMsg.innerHTML = "Please write your  address";
        addressErrorMsg.style.color = 'red';
        return false;
    } else if (city.value == "") {
        cityErrorMsg.innerHTML = "Please write your  city name";
        cityErrorMsg.style.color = 'red';
        return false;
    } else if (validateEmail(email.value) == false || email.value == "") {
        emailErrorMsg.innerHTML = "Please enter your valid email adress";
        emailErrorMsg.style.color = 'red';
        return false
    } else {
        return false
    }
}

//passValidationForm();


// sending the selected Items to the server

const order = document.getElementById('order');

order.addEventListener('click', (event) => {
    event.preventDefault();

    if (passValidationForm()) {
        const postForm = async() => {
            const rawResponse = await fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value
                    },
                    products: productId
                })
            });

            const jsonRawResponse = await rawResponse.json();
            console.log(jsonRawResponse);

            localStorage.clear()
            
            location.href = `confirmation.html?orderId=${jsonRawResponse.orderId}`
        }

        postForm();
    }
})