import * as UserService from "../services/user.service.js";
import { createHash } from "../utils.js";

export const postRegister = async (req, res) => {
  res.send({ status: "success", message: "User registered" });
};

export const failRegister = async (req, res) => {
  res.send({ status: "error", message: "Register failed" });
};

export const postLogin = async (req, res) => {
  console.log("user", req.user);

  if (req.user) {
    req.session.name = req.user.name;
    req.session.email = req.user.email;
    req.session.rol = req.user.rol;

    return res.status(200).send({ success: "Bienvenido" });
  }

  return res
    .status(400)
    .send({ status: "error", error: "Invalid credentials" });
};

export const failLogin = async (req, res) => {
  res.send({ status: "error", message: "Login failed" });
};
export const getGit = async (req, res) => {
  res.send({ status: "success", message: "User registered" });
};

export const authenticateGit = async (req, res) => {
  console.log("github user", req.user);

  req.session.name = req.user.name;
  req.session.email = req.user.email;
  req.session.rol = req.user.rol;
  res.redirect("/products");
};

export const incompleteValue = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });

    const user = await UserService.findOne({ email });

    if (!user)
      return res.status(400).send({ status: "error", error: "User not found" });

    user.password = createHash(password);

    await UserService.updateOne({ email }, user);

    res.send({ status: "success", message: "Password reset" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export const logoutError = (req, res) => {
  req.session.destroy((error) => {
    console.log("logout error", error);
    if (error) return res.status(500).send({ status: "error", error });
    res.redirect("/");
  });
};
