import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jzn49.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log("Connected to DB!");
    } catch (error) {
        console.log("Could not connect to database", error);
        process.exit(1);
    }
};

export default connectToDb;