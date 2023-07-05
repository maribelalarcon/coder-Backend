import * as ProductService from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const { page, limit, sort, query } = req.query;

    const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await ProductService.getProducts({
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
};

export const getProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await ProductService.getProductById(pid);
    res.send({ product });
  } catch (error) {
    res.status(404).send("Producto no encontrado");
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;

  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).send({ error: "No se pudo agregar el producto" });
  }

  try {
    const product = await ProductService.addProduct({
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
};

export const updateProduct = async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const pid = req.params.pid;
  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).send({ error: "No se pudo agregar el producto" });
  }

  try {
    const product = await ProductService.updateProduct(pid, {
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
};

export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const deleted = await ProductService.deleteProduct(pid);

    if (deleted) {
      res.status(200).send({ status: "success", payload: deleted });
    }
  } catch (error) {
    res
      .status(400)
      .send({ status: "error", error: "Could not delete product" });
  }
};
