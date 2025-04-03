import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      res.status(400).json({ message: "All fields need to be filled" });
      return;
    }

    const existentUser = await UserModel.findOne({ email });

    if (existentUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User successfully created", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Required fields not filled." });
      return;
    }

    const user = await UserModel.findOne({ email });

    if (!user || !user.password || typeof user.password !== "string") {
      res.status(404).json({ message: "Wrong email or password." });
      return;
    }

    const correctPwd = await bcrypt.compare(password, user.password);

    if (!correctPwd) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      'segredo_demais',
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: "Login successful", token, user });

  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

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
    if (email) user.email = email;
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
