import express from "express";
import { login, createUser } from "../controller/acessController";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login)

export default router;