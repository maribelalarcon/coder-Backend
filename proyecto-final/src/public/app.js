const CART_ID = "646f7c37b73924de219afb16";

async function addProductToCart(productId) {
  return fetch(`/api/carts/${CART_ID}/product/${productId}`, {
    method: "POST",
  });
}
