import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from "bcrypt";


export const createUser = async (req: Request,res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
  
      const { name, email, password } = req.body
  
      if(!email || !name || !password) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({message: "All fields need being filled"})
      }
  
      const existentUser = await UserModel.findOne({email}).session(session);
  
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
      res.status(201).json({ message: "User successfully created", user: newUser });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Intern error" });
    }
  };