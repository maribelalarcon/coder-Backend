import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const cartManager = new CartManager("./src/files/carts.json");

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send({ carts });
});

router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.status(200).send({ products: cart.products });
  } else {
    res.status(404).send({ error: "El carrito no existe" });
  }
});

router.post("/", async (req, res) => {
  const cart = await cartManager.addCart(req.body);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res.status(400).send({ error: "No se pudo crear el carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

  const cart = await cartManager.addProductToCart(cid, pid);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res
      .status(400)
      .send({ error: "No se pudo agregar el producto al carrito" });
  }
});

export default router;
