import express from "express";
import { createUser, getAllUsers, getUserById, updateUser } from "../controller/userController"; 

const router = express.Router();

router.post("/register", createUser);
router.get("/users", getAllUsers);
router.get("/user/:_id", getUserById);
router.put("/user/:_id", updateUser)

export default router;