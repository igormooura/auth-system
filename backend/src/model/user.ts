import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		nome: String,
		email: String,
		password: String,
	},
	{ versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;