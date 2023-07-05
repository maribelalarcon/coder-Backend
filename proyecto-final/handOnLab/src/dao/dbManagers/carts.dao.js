import cartModel from "../models/cart.model.js";

export default class CartsDao {
  constructor() {
    console.log("Working cart with DB");
  }

  getCarts = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };

  addCart = async (cartData) => {
    const cart = {
      ...cartData,
    };

    if (!cartData.products) {
      throw Error("El carrito debe poseer productos");
    }

    return await cartModel.create(cart);
  };

  addProductToCart = async (idCart, idProduct) => {
    const cart = await cartModel.findOne({ _id: idCart });

    if (cart) {
      const product = cart.products.find(
        (product) => product.product === idProduct
      );

      if (product) {
        return await this.updateCartProduct(
          idCart,
          idProduct,
          product.quantity + 1
        );
      } else {
        return await cartModel.updateOne(
          { _id: idCart },
          {
            $push: { products: { product: idProduct, quantity: 1 } },
          }
        );
      }
    }
  };

  updateCartProduct = async (idCart, idProduct, quantity) => {
    //Encontrar el indice
    const query = { _id: idCart };

    const updateDocument = {
      $set: { "products.$[i].quantity": quantity },
    };

    const options = {
      arrayFilters: [
        {
          "i.product": idProduct,
        },
      ],
    };

    return await cartModel.updateOne(query, updateDocument, options);
  };

  deleteProductFromCart = async (idCart, idProduct) => {
    return await cartModel.updateOne(
      { _id: idCart },
      { $pull: { products: { product: idProduct } } }
    );
  };

  deleteAllProducts = async (idCart) => {
    return await cartModel.updateOne({ _id: idCart }, { products: [] });
  };

  getCartById = async (idCart) => {
    try {
      const [cartById] = await cartModel.find({ _id: idCart }).lean();

      console.log("cartById", cartById);

      if (!cartById) {
        console.log("Not Found");
      } else {
        return cartById;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
