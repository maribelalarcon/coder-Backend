import passport from "passport";
import { Router } from "express";
import {
  postLogin,
  failLogin,
  failRegister,
  postRegister,
  getGit,
  authenticateGit,
  incompleteValue,
  logoutError,
} from "../controllers/sessions.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "fail-register" }),
  postRegister
);

router.get("/fail-register", failRegister);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "fail-login" }),
  postLogin
);

router.get("/fail-login", failLogin);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  getGit
);

router.get(
  "/github-callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  authenticateGit
);

router.post("/reset", incompleteValue);

router.get("/logout", logoutError);

export default router;
