import { CARTSDAO } from "../dao/index.js";

const getCarts = async () => {
  const carts = await CARTSDAO.getCarts();
  return carts;
};

const addCart = async (cartData) => {
  const cart = await CARTSDAO.addCart(cartData);
  return cart;
};

const addProductToCart = async (idCart, idProduct) => {
  const cart = await CARTSDAO.addProductToCart(idCart, idProduct);
  return cart;
};

const updateCartProduct = async (idCart, idProduct, quantity) => {
  const cart = await CARTSDAO.updateCartProduct(idCart, idProduct, quantity);
  return cart;
};

const deleteProductFromCart = async (idCart, idProduct) => {
  const cart = await CARTSDAO.deleteProductFromCart(idCart, idProduct);
  return cart;
};

const deleteAllProducts = async (idCart) => {
  const cart = await CARTSDAO.deleteAllProducts(idCart);
  return cart;
};

const getCartById = async (idCart) => {
  const cart = await CARTSDAO.getCartById(idCart);
  return cart;
};

export {
  getCarts,
  addCart,
  addProductToCart,
  updateCartProduct,
  deleteProductFromCart,
  deleteAllProducts,
  getCartById,
};
