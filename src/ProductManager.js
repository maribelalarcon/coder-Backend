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

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      const products = await this.getProducts();

      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      product.id = products.length + 1;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return;
      }
      const productCode = products.findIndex(
        (product) => product.code === code
      );

      if (productCode === -1) {
        products.push(product);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return;
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

      if (productIndex) {
        products[productIndex] = product;

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
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
    } catch (error) {
      console.error(error);
    }
  };
}

const manager = new ProductManager("./products.json");
const products = await manager.getProducts();

console.log("TEST 1");
console.log("Al principio la lista de productos esta vacia:", products);
console.log();
console.log("===============");

console.log("TEST 2");
console.log("Es posible agregar un nuevo producto");

await manager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log("products:", await manager.getProducts());

console.log();
console.log("===============");

console.log("Luego sera posible obtener un producto con su id");
console.log("product", await manager.getProductById(1));
console.log();
console.log("===============");

console.log("Tambien sera posible actualizar un producto especifico con el id");

await manager.addProduct(
  "MacBook Air",
  "Revolucionado con el nuevo chip M2",
  1500,
  "Sin imagen",
  "AA89R45Q",
  50
);

const macbook = await manager.getProductById(2);

console.log("macbook", macbook, await manager.getProducts());

await manager.updateProduct(2, {
  ...macbook,
  title: "Macbook Pro",
});

console.log("products", await manager.getProducts());

console.log("Tambien es posible eliminar un producto por id");
await manager.deleteProduct(2);

console.log("products", await manager.getProducts());

console.log();
console.log("===============");
