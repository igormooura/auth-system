import express from "express";
import { createUser, getUsers } from "../controller/authController"; 

const router = express.Router();

router.post("/register", createUser);
router.get("/users", getUsers);

export default router;