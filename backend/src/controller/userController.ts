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

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Users not found" });
  }
};

export const getUserById = async(req: Request, res:Response): Promise<void> => {
    try {
        const userId = req.params._id;
        const userById = await UserModel.findById(userId);

        
        if(!userById){
            res.status(404).json({message: "User not found"});
        }

            res.status(200).json(userById);
    } catch (error) {
        console.error("Error searching by id:", error);
        res.status(500).json({ message: "Internal error" });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body; 
    const userId = req.params._id; 
    

    const user = await UserModel.findById(userId).session(session);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); 

    await user.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "User updated successfully", user });

  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    console.error("Error updating user", error);
    res.status(500).json({ message: "Internal error" });
  }
};

export const deleteUser = async(req: Request, res: Response): Promise<void> =>{ 

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const userId = req.params._id;
      const user = await UserModel.findByIdAndDelete(userId).session(session);

      if (!user) {
        await session.abortTransaction();
        session.endSession();
        res.status(404).json({ message: "User not found" });
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({mesage: "User deleted with success"})
  } catch (error) { 
      await session.abortTransaction();
      session.endSession();
      console.error("Error deleting user: ", error);
      res.status(500).json({message:"Internal error"})
    } 
}