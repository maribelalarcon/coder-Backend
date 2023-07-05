export default class ProductsDao {
  getProducts = async ({ page = 1, limit = 10, sort, query = {} }) => {};

  addProduct = async (productData) => {};

  getProductById = async (idProduct) => {};

  updateProduct = async (idProduct, product) => {};

  deleteProduct = async (id) => {};
}
