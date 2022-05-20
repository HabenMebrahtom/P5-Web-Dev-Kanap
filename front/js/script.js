const apiUrl = "http://localhost:3000/api/products";

const items = document.getElementById('items')

const getData = async () => {
    try {

        const response = await fetch(apiUrl);
         const jsonResponse = await response.json();
        
        jsonResponse.forEach(product => {
            items.innerHTML += `
             <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altText}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
            
        })  

    } catch(error) {
        console.log(error)
    }
}

getData();