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
      console.log("Productos ya existente");
      return;
  };

  const productCode = this.products.findIndex((product)=>product.code === code);
  if (productCode === -1){
    this.products.push(product)
    console.log ("Producto agregado")
    return;
  }else{
    console.log (`El code ${product.code} ya existe ${this.products[productCode].title}`)
    return;
  }

  getProductById = (idProduct) => {
    const product = this.products.find((product) => product.id === idProduct);
    if (!product) {
      console.log("Not Found");
      return;
    } else {
      return product;
    
  }
};
const manager = new ProductManager();

console.log( manager.addProduct(
     "producto prueba",
     "Este es un producto prueba",
     200,
     "Sin imagen",
     "abc123",
     25
  )
);
console.log(product.getProducts())
// console.log(manager.getProductById());



