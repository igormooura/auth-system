import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./config/db";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes"; 
import acessRoutes from "./routes/acessRoutes"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("auth-system backend :D")
});


app.use(acessRoutes);
app.use(userRoutes); 


const startServer = async () => {
    try {
        await connectToDb();
        console.log("Database connected successfully!");

        
    } catch (error) {
        console.log("Error connecting to the database", error);
        process.exit(1); 
    }
};

startServer();

// error middleware
app.use(errorHandler);
