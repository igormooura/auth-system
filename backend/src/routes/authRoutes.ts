import express from "express";
import { createUser, getAllUsers, getUserById } from "../controller/authController"; 

const router = express.Router();

//

router.post("/register", createUser);
router.get("/users", getAllUsers);
router.get("/user/:_id", getUserById);

export default router;