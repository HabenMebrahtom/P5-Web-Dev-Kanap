const params = new URLSearchParams(document.location.search);
const orderID = params.get('orderId');


const displayOrderId = document.getElementById('orderId');

displayOrderId.innerHTML = orderID;