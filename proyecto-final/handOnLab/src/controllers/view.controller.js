import * as CartService from "../services/cart.service.js";
import * as ProductService from "../services/product.service.js";

export const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

export const privateAccess = (req, res, next) => {
  if (!req.session.email) return res.redirect("/login");
  next();
};

export const getProduct = async (req, res) => {
  const { page, limit = 2, sort, query } = req.query;

  try {
    const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await ProductService.getProducts({
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
};

export const getCarts = async (req, res) => {
  const cid = req.params.cid;
  const cart = await CartService.getCartById(cid);

  if (cart) {
    res.render("cart", cart);
  } else {
    res.status(404).send({ error: "El carrito no existe" });
  }
};

export const getRegister = (req, res) => {
  res.render("register");
};
export const getLogin = (req, res) => {
  res.render("login");
};
export const getPrivateAccess = (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
};
