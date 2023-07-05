import * as CartServcie from "../services/cart.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await CartServcie.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
};

export const getCartId = async (req, res) => {
  const cid = req.params.cid;
  const cart = await CartServcie.getCartById(cid);

  if (cart) {
    res.status(200).send({ products: cart.products });
  } else {
    res.status(404).send({ error: "El carrito no existe" });
  }
};

export const postCard = async (req, res) => {
  const cart = await CartServcie.addCart(req.body);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res.status(400).send({ error: "No se pudo crear el carrito" });
  }
};

export const postCardId = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const cart = await CartServcie.addProductToCart(cid, pid);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res
      .status(400)
      .send({ error: "No se pudo agregar el producto al carrito" });
  }
};

export const putCard = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;

  const cart = await CartServcie.updateCartProduct(cid, pid, quantity);

  if (cart) {
    return res.status(200).send(cart);
  } else {
    return res.status(400).send({
      error: "No se pudo actualizar la cantidad del producto en el carrito",
    });
  }
};

export const deleteCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const result = await CartServcie.deleteProductFromCart(cid, pid);

  if (result) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({
      error: "No se pudo borrar el producto del carrito",
    });
  }
};

export const deleteCardId = async (req, res) => {
  const cid = req.params.cid;

  const result = await CartServcie.deleteAllProducts(cid);

  if (result) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({
      error: "No se pudieron borrar los productos del carrito",
    });
  }
};

export const deleteCradId = async (req, res) => {
  const cid = req.params.cid;

  const result = await CartServcie.deleteAllProducts(cid);

  if (result) {
    return res.status(200).send(result);
  } else {
    return res.status(400).send({
      error: "No se pudieron borrar los productos del carrito",
    });
  }
};
