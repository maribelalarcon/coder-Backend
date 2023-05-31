import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

//obtener
router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.status(200).send({ products: cart.products });
  } else {
    res.status(404).send({ error: "El carrito no existe" });
  }
});

//creo
router.post("/", async (req, res) => {
  const cart = await cartManager.addCart(req.body);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res.status(400).send({ error: "No se pudo crear el carrito" });
  }
});

//crear
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const cart = await cartManager.addProductToCart(cid, pid);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res
      .status(400)
      .send({ error: "No se pudo agregar el producto al carrito" });
  }
});

//actualizar
router.put("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;

  const cart = await cartManager.updateCartProduct(cid, pid, quantity);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res.status(400).send({
      error: "No se pudo actualizar la cantidad del producto en el carrito",
    });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const result = await cartManager.deleteProductFromCart(cid, pid);

  if (result) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({
      error: "No se pudo borrar el producto del carrito",
    });
  }
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const result = await cartManager.deleteAllProducts(cid);

  if (result) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({
      error: "No se pudieron borrar los productos del carrito",
    });
  }
});

export default router;
