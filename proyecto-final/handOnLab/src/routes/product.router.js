import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.dao.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", getProducts);

router.get("/:pid", getProduct);

router.post("/", createProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
