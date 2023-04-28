import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();

const productManager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home.handlebars", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts.handlebars", { products });
});

export default router;
