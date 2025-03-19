import "dotenv/config"
import express from 'express'
import connectToDb from './config/db'

const app = express()

app.get("/", (req, res) =>{ 
    res.send("hello there!")
})


app.listen(4000, async () =>{
    console.log("Development running on 4000");
    await connectToDb();
})
