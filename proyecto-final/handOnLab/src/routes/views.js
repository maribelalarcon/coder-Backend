import { Router } from "express";

import {
  privateAccess,
  getCarts,
  getProduct,
  getRegister,
  publicAccess,
  getLogin,
  getPrivateAccess,
} from "../controllers/view.controller.js";

const router = Router();

router.get("/products", privateAccess, getProduct);

router.get("/carts/:cid", privateAccess, getCarts);

router.get("/register", publicAccess, getRegister);

router.get("/login", publicAccess, getLogin);

router.get("/", privateAccess, getPrivateAccess);

export default router;
