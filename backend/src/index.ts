import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./config/db";
import cookieParser from "cookie-parser";
import catchErrors from "./utils/catchErrors";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:4000",
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("EAE")
});

app.use("/auth", authRoutes); 

// error middleware
app.use(errorHandler);

app.listen(4000, async () => {
    console.log("Development running on 4000");
    await connectToDb();
});