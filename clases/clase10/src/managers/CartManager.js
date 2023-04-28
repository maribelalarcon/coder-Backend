import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  addCart = async (cartData) => {
    try {
      const carts = await this.getCarts();

      const cart = {
        id: carts.length + 1,
        ...cartData,
      };

      if (!cartData.products) {
        return;
      }

      carts.push(cart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

      return cart;
    } catch (error) {
      console.log(`No se pudo crear el cart`);
      return;
    }
  };

  addProductToCart = async (idCart, idProduct) => {
    try {
      const carts = await this.getCarts();
      const cartByIdIndex = carts.findIndex((cart) => cart.id === idCart);

      console.log("cartsbyindex", cartByIdIndex);

      if (cartByIdIndex !== -1) {
        const cartById = carts[cartByIdIndex];
        const products = cartById.products;
        const productByIdIndex = products.findIndex(
          (product) => product.id === idProduct
        );

        console.log("producbyindex", productByIdIndex);

        if (productByIdIndex !== -1) {
          // El producto ya esta en el carrito
          const product = products[productByIdIndex];

          const updatedProduct = {
            ...product,
            quantity: product.quantity + 1,
          };

          carts[cartByIdIndex].products[productByIdIndex] = updatedProduct;

          await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, "\t")
          );

          return carts[cartByIdIndex];
        } else {
          // El producto no esta en el carrito
          carts[cartByIdIndex].products.push({
            id: idProduct,
            quantity: 1,
          });

          console.log("cart", carts);

          await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, "\t")
          );

          return carts[cartByIdIndex];
        }
      } else {
        console.log("Cart not found");
        return;
      }
    } catch (error) {
      console.log(`No se pudo crear el cart`);
      return;
    }
  };

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (idCart) => {
    try {
      const carts = await this.getCarts();
      const cartById = carts.find((cart) => cart.id === idCart);

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
