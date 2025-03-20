import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
	},
	{ versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;