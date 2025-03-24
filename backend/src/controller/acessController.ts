import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: "All fields need being filled" });
    }

    const existentUser = await UserModel.findOne({ email }).session(session);

    if (existentUser) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: "Usuer already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save({ session });
    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .json({ message: "User successfully created", user: newUser });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Intern error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;


    if (!email || !password) {
      res.status(400).json({ error: "Required fields not filled." });
    }

    const user = await UserModel.findOne({ email }).session(session);

    if (!user) {
      res.status(404).json({ message: "Wrong email or password." });
      return;
    }

    if (!user.password || typeof user.password !== "string") {
      res.status(500).json({ error: "Wrong email or password." });
      return;
    }

    const correctPwd = await bcrypt.compare(password, user.password);

    if (!correctPwd) {
      res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'segredo_demais',
      { expiresIn: '2h' }
    )

    await session.commitTransaction();
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
    
  } catch {
    await session.abortTransaction();
    res.status(500).json({ error: "Internal server error" });
  } finally {
    session.endSession();
  }
};
