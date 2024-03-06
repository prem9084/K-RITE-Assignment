import express from "express";
import formidable from "express-formidable";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { isAuth } from "../middlesware/authMiddelware.js";

const router = express.Router();

router.post("/register", formidable(), registerController);
router.post("/login", loginController);

router.get("/user-auth", isAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
