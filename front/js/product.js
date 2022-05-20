const apiUrl = "http://localhost:3000/api/products";

const params = new URLSearchParams(window.location.serach);
const productId = params.get(id);