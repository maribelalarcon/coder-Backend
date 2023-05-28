import productModel from "../models/product.model.js";

export default class ProductManager {
  getProducts = async ({ page = 1, limit = 10, sort, query = {} }) => {
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
      await productModel.paginate(query, {
        limit,
        page,
        sort: sort ? { price: sort } : null,
        lean: true,
      });

    return {
      docs,
      totalPages,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    };
  };

  addProduct = async (productData) => {
    try {
      const { docs: products } = await this.getProducts({});
      const product = {
        status: true,
        ...productData,
      };

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock ||
        !product.category
      ) {
        throw Error("Faltan campos obligatorios");
      }

      const productCode = products.findIndex(
        (_product) => _product.code === product.code
      );

      if (productCode === -1) {
        const product = await productModel.create(productData);
        return product;
      }
    } catch (error) {
      console.log("No se pudo agregar el producto", error);
      return;
    }
  };

  getProductById = async (idProduct) => {
    const product = await productModel.findOne({ _id: idProduct });

    console.log("product", product);
    if (!product) {
      console.log("Not Found");
    } else {
      return product;
    }
  };

  updateProduct = async (idProduct, product) => {
    try {
      const product = await productModel.updateOne({ _id: idProduct }, product);
      return product;
    } catch (error) {
      console.error(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      await productModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
