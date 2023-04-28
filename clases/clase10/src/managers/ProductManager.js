import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (productData) => {
    try {
      const products = await this.getProducts();
      const product = {
        id: products.length + 1,
        status: true,
        ...productData,
      };

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnails ||
        !product.code ||
        !product.stock ||
        !product.category
      ) {
        return;
      }
      const productCode = products.findIndex(
        (_product) => _product.code === product.code
      );

      if (productCode === -1) {
        products.push(product);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return product;
      }
    } catch (error) {
      console.log(
        `El code ${product.code} ya existe ${products[productCode].title}`
      );
      return;
    }
  };

  getProductById = async (idProduct) => {
    try {
      const products = await this.getProducts();
      const productById = products.find((product) => product.id === idProduct);

      if (!productById) {
        console.log("Not Found");
      } else {
        return productById;
      }
    } catch (error) {
      console.error(error);
    }
  };

  updateProduct = async (idProduct, product) => {
    try {
      let products = await this.getProducts();

      const productIndex = products.findIndex(
        (product) => product.id === idProduct
      );

      if (product.id) {
        return;
      }

      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...product,
        };

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return products[productIndex];
      } else {
        console.log("Producto no existe", idProduct);
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      let products = await this.getProducts();
      products = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
