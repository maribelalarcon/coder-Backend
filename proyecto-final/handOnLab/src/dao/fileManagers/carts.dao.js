export default class CartsDao {
  constructor() {
    console.log("Working cart with files");
  }

  getCarts = async () => {};

  addCart = async (cartData) => {};

  addProductToCart = async (idCart, idProduct) => {};

  updateCartProduct = async (idCart, idProduct, quantity) => {};

  deleteProductFromCart = async (idCart, idProduct) => {};

  deleteAllProducts = async (idCart) => {};

  getCartById = async (idCart) => {};
}
