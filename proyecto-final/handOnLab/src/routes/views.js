import { Router } from "express";
import CartManager from "../dao/dbManagers/CartManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.email) return res.redirect("/login");
  next();
};

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.render("carts", { carts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/products", privateAccess, async (req, res) => {
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
      session: req.session,
      isAdmin: req.session.rol === "admin",
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

router.get("/carts/:cid", privateAccess, async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.render("cart", cart);
  } else {
    res.status(404).send({ error: "El carrito no existe" });
  }
});

router.get("/register", publicAccess, (req, res) => {
  res.render("register");
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/", privateAccess, (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

export default router;
