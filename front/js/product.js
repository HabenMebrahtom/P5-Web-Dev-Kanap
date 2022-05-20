const apiUrl = "http://localhost:3000/api/products";

const params = new URLSearchParams(document.location.search);
const productId = params.get('id');

const productImage = document.getElementById('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors')

const getProduct = async () => {
    try {
        const response = await fetch(apiUrl + '/' + productId)
        const jsonResponse = await response.json();

         productImage.innerHTML += `
        <img src="${jsonResponse.imageUrl}" alt="${jsonResponse.altText}">`;
        description.innerHTML += `${jsonResponse.description}`;
        title.innerHTML += `${jsonResponse.name}`;
        price.innerHTML += `${jsonResponse.price/10}`;
    } catch (error) {
        console.log(error)
    }
};

getProduct();