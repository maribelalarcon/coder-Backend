import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.render("carts", { carts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/products", async (req, res) => {
  const { page, limit = 2, sort, query } = req.query;

  try {
    const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await productManager.getProducts({
        page,
        limit,
        sort,
        query: query ? JSON.parse(query) : {},
      });

    res.render("products", {
      products: docs,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ status: "error", error });
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.render("cart", cart);
  } else {
    res.status(404).send({ error: "El carrito no existe" });
  }
});

export default router;
