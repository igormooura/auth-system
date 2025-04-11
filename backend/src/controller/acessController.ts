import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

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

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      'super_secret_key',
      { expiresIn: '15m' }
    );

    const resetLink = `http://localhost:5137/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: '"Support Team" <' + process.env.EMAIL_USER + '>',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `
    });

    res.status(200).json({ message: "Password reset email sent successfully" });

  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ message: "Error sending password reset email" });
  }
};