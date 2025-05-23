import express from "express";
import { login, createUser, forgotPassword, resetPassword } from "../controller/acessController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login)
router.post("/forgotpassword", forgotPassword);
router.post("/reset-password", resetPassword);


router.get("/verify-auth", authMiddleware, (req, res) => {
    res.status(200).json({ 
      message: "Autenticação válida.",
      user: req.user 
    });
  })

export default router;