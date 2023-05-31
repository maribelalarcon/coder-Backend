import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists)
      return res
        .status(400)
        .send({ status: "error", error: "El usuario ya existe" });

    const user = {
      email,
      password,
      first_name,
      last_name,
    };

    await userModel.create(user);

    res.send({ status: "success", message: "Usuario registrado con exito" });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.post("/login", async (req, res) => {
  console.log("session", req.session);

  if (req.session?.email)
    return res.status(200).send({ success: "Bienvenido" });

  if (
    req.body.email === "adminCoder@coder.com" &&
    req.body.password === "adminCod3r123"
  ) {
    req.session.name = "Coder House";
    req.session.email = req.body.email;
    req.session.rol = "admin";

    return res.status(200).send({ success: "Bienvenido" });
  }

  const user = await userModel.findOne({ email: req.body.email });

  if (user) {
    if (user.password === req.body.password) {
      req.session.name = `${user.first_name} ${user.last_name}`;
      req.session.email = req.body.email;
      req.session.rol = "usuario";
      res.status(200).send({ success: "Bienvenido" });
    } else {
      res.status(400).send({ error: "Contraseña incorrecta" });
    }
  } else {
    res.status(400).send({ error: "El usuario no existe" });
  }
});

//se cierra la session
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return restart.status(500).send({ status: "error", error });
    res.status(200).send({ sucess: "Usuario deslogueado correctamente " });
  });
});

export default router;
