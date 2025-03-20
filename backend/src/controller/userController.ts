import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from "bcrypt";

export const createUser = async (req: Request,res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existentUser = await UserModel.findOne({
      email: req.body.email,
    }).session(session);

    if (existentUser) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: "Usuário já existe" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({
      nome: req.body.nome,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
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
