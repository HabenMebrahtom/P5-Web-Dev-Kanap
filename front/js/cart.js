const cartItems = [];


// get items from local Storage
const getCartItems = () => {
    for (const [key, value] in Object.entries(localStorage(value))) {
     cartItems.push(value)
    } 
    console.log(cartItems);
}