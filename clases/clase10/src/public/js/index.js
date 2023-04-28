const socket = io();

const productList = document.getElementById("product-list");

socket.on("products-updated", (products) => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerText = `${product.title} (${product.price})`;
    productList.appendChild(li);
  });
});
