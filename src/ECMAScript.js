class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    product.id = this.products.length + 1;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return;
    }

    const productCode = this.products.findIndex(
      (product) => product.code === code
    );
    if (productCode === -1) {
      this.products.push(product);
      return;
    } else {
      console.log(
        `El code ${product.code} ya existe ${this.products[productCode].title}`
      );
      return;
    }
  };
  getProductById = (idProduct) => {
    const productId = this.products.find((product) => product.id === idProduct);
    if (!productId) {
      console.log("Not Found");
    } else {
      return productId;
    }
  };
}

const testProductManager = new ProductManager();

console.log("TEST 1");
console.log(
  "Probando que el testProductManager se inicializa con una lista vacia de productos"
);
console.log(testProductManager.getProducts());
testProductManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
testProductManager.addProduct(
  "MacBook Air",
  "Revolucionado con el nuevo chip M2",
  1500,
  "Sin imagen",
  "AA89R45Q",
  50
);
console.log("===============");
console.log("Productos:", testProductManager.getProducts());
console.log("El producto encontrado es:", testProductManager.getProductById(3));

console.log("===============");
console.log("TEST 2");
testProductManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log("Productos:", testProductManager.getProducts());
console.log(testProductManager.getProductById(2));
