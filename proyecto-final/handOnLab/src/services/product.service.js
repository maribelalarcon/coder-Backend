import { PRODUCTSDAO } from "../dao/index.js";

const getProducts = async ({ page = 1, limit = 10, sort, query = {} }) => {
  const products = await PRODUCTSDAO.getProducts({ page, limit, sort, query });
  return products;
};

const addProduct = async (productData) => {
  const product = await PRODUCTSDAO.addProduct(productData);
  return product;
};

const getProductById = async (idProduct) => {
  const product = await PRODUCTSDAO.getProductById(idProduct);
  return product;
};

const updateProduct = async (idProduct, product) => {
  const productUpdated = await PRODUCTSDAO.updateProduct(idProduct, product);
  return productUpdated;
};

const deleteProduct = async (id) => {
  const productDeleted = await PRODUCTSDAO.deleteProduct(id);
  return productDeleted;
};

export {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
