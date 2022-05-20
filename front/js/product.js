const apiUrl = "http://localhost:3000/api/products";

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
        const response = await fetch(apiUrl + '/' + productId)
        const jsonResponse = await response.json();

         productImage.innerHTML += `
        <img src="${jsonResponse.imageUrl}" alt="${jsonResponse.altText}">`;
        description.innerHTML += `${jsonResponse.description}`;
        title.innerHTML += `${jsonResponse.name}`;
        price.innerHTML += `${jsonResponse.price / 10}`;
        colors.innerHTML = `
         <option value="">--Please, select a color --</option>
         ${jsonResponse.colors.map(color => {
             return `<option value="${color}"> ${color}</option>`;
         })}`;

        
        addToCart.addEventListener('submit', () => {
            const cartObject = {
                color: colors.value,
                id: productId,
                name: jsonResponse.name,
                price: jsonResponse.price / 10,
                quantity: quantity.value
            }

            console.log(cartObject);
        });
    } catch (error) {
        console.log(error)
    }
};

getProduct();