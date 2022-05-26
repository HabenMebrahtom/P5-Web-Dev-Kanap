const apiUrl = "http://localhost:3000/api/products";

// get product id from the search parameter
const params = new URLSearchParams(document.location.search);
const productId = params.get('id');

const productImage = document.getElementById('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');


const getProduct = async () => {
    try {

        //fetching data
        const response = await fetch(apiUrl + '/' + productId)
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        
        // display product inside html with the fetched data
         productImage.innerHTML += `
            <img src="${jsonResponse.imageUrl}" alt="${jsonResponse.altText}">`;
            description.innerHTML += `${jsonResponse.description}`;
            title.innerHTML += `${jsonResponse.name}`;
            price.innerHTML += `${jsonResponse.price}`; 
            colors.innerHTML = `
            <option value="">--Please, select a color --</option>
            ${jsonResponse.colors.map(color => {
                return `<option value="${color}"> ${color}</option>`;
            })
                }`;  
         
        setItems(jsonResponse);

    } catch (error) {
        console.log(error)
    }
};

       // Set Items to local storage
const setItems = (product) => {
   
    addToCart.addEventListener('click', (event) => {
                event.preventDefault();

        if (quantity.value > 0) {

            //cart object
            let cartObject = {
                    id: product._id,
                    name: product.name,
                    color: colors.value,
                    price: product.price,
                    qty: quantity.value,
                    image: product.imageUrl,
                    alt: product.altTxt
            }  

            const itemKey = `${product.name}, ${product.color}`;
            window.localStorage.setItem(itemKey, JSON.stringify(cartObject));
        }   
        
        window.location.href = "cart.html"
    })
}


getProduct();