import { Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Users not found" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params._id;
    const userById = await UserModel.findById(userId);

    if (!userById) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params._id;

    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (name) user.name = name;

    if (email && email !== user.email) {
      const emailInUse = await UserModel.findOne({ email });

      if (emailInUse && emailInUse._id.toString() !== userId) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }

      user.email = email;
    }
    
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params._id;
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};
