import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager("./src/files/products.json");

const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();

  const productLimit = products.splice(0, limit);
  !limit ? res.send({ products }) : res.send({ products: productLimit });
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const product = await productManager.getProductById(pid);
  product
    ? res.send({ product })
    : res.status(404).send("Producto no encontrado");
});

router.post("/", async (req, res) => {
  const product = await productManager.addProduct(req.body);

  if (product) {
    return res.status(200).send(product);
  } else {
    return res.status(400).send({ error: "No se pudo agregar el producto" });
  }
});

router.put("/:pid", async (req, res) => {
  const productData = await req.body;
  const pid = Number(req.params.pid);
  const product = await productManager.updateProduct(pid, productData);

  if (product) {
    return res.status(200).send(product);
  } else {
    return res.status(400).send({ error: "No se pudo actualizar el producto" });
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const deleted = await productManager.deleteProduct(pid);

  if (deleted) {
    res.status(200).send();
  } else {
    res
      .status(400)
      .send({ status: "error", error: "Could not delete product" });
  }
});

export default router;
