import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import passport from "passport";
import { createHash } from "../utils.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "fail-register" }),
  async (req, res) => {
    res.send({ status: "success", message: "User registered" });
  }
);

router.get("/fail-register", async (req, res) => {
  res.send({ status: "error", message: "Register failed" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "fail-login" }),
  async (req, res) => {
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
  }
);

router.get("/fail-login", async (req, res) => {
  res.send({ status: "error", message: "Login failed" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.send({ status: "success", message: "User registered" });
  }
);

router.get(
  "/github-callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("github user", req.user);

    req.session.name = req.user.name;
    req.session.email = req.user.email;
    req.session.rol = req.user.rol;
    res.redirect("/products");
  }
);

router.post("/reset", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).send({ status: "error", error: "User not found" });

    user.password = createHash(password);

    await userModel.updateOne({ email }, user);

    res.send({ status: "success", message: "Password reset" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    console.log("logout error", error);
    if (error) return res.status(500).send({ status: "error", error });
    res.redirect("/");
  });
});

export default router;
