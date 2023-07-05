import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.dao.js";
import {
  getCarts,
  getCartId,
  postCard,
  postCardId,
  putCard,
  deleteCart,
  deleteCardId,
} from "../controllers/cart.controller.js";

const router = Router();
const cartManager = new CartManager();

//obtener
router.get("/", getCarts);

router.get("/:cid", getCartId);

//creo
router.post("/", postCard);

//crear
router.post("/:cid/product/:pid", postCardId);

//actualizar
router.put("/:cid/product/:pid", putCard);

router.delete("/:cid/product/:pid", deleteCart);

router.delete("/:cid", deleteCardId);

export default router;
