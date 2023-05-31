const CART_ID = "646f7c37b73924de219afb16";

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
