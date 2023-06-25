const CART_ID = localStorage.getItem("cartId");

function goToCart() {
  window.location = `/carts/${CART_ID}`;
}

async function addProductToCart(productId) {
  return fetch(`/api/carts/${CART_ID}/product/${productId}`, {
    method: "POST",
  });
}

async function logout() {
  const result = await fetch("/api/sessions/logout");
  if (result.status === 200) {
    window.location = "/login";
  }
}
