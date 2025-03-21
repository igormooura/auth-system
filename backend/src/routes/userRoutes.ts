import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController"; 
import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:_id", getUserById);
router.put("/user/:_id", authMiddleware ,updateUser);
router.delete("/user/:_id", authMiddleware ,deleteUser);

export default router;