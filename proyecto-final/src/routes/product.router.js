import { Router } from "express";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { page, limit, sort, query } = req.query;

    const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await productManager.getProducts({
        page,
        limit,
        sort,
        query: query ? JSON.parse(query) : {},
      });

    res.send({
      status: "success",
      payload: docs,
      totalPages,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      nextLink: hasNextPage ? `/api/products?page=${nextPage}` : null,
      prevLink: hasPrevPage ? `/api/products?page=${prevPage}` : null,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ status: "error", error });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    res.send({ product });
  } catch (error) {
    res.status(404).send("Producto no encontrado");
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;

  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).send({ error: "No se pudo agregar el producto" });
  }

  try {
    const product = await productManager.addProduct({
      title,
      description,
      price,
      code,
      stock,
      category,
    });

    if (product) {
      return res.status(200).send({ status: "success", payload: product });
    } else {
      res.status(500).send({
        status: "error",
        error: "No se pudo agregar el producto",
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ status: "error", error });
  }
});
//creo y piso -reemplazar
router.put("/:pid", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const pid = req.params.pid;
  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).send({ error: "No se pudo agregar el producto" });
  }

  try {
    const product = await productManager.updateProduct(pid, {
      title,
      description,
      price,
      code,
      stock,
      category,
    });
    return res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    res
      .status(500)
      .send({ status: "No se pudo actualizar el producto", error });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deleted = await productManager.deleteProduct(pid);

    if (deleted) {
      res.status(200).send({ status: "success", payload: deleted });
    }
  } catch (error) {
    res
      .status(400)
      .send({ status: "error", error: "Could not delete product" });
  }
});

export default router;
