import cors from "cors";
import express from "express";
import path from 'path';
import userRouter from './routes/user.js'
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
    path:"./data/config.env",
})

// router.post()
// Using middleware to send the data
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true // for giving header to frontend like cookies so credentials has to be true
    })
);

app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)

app.get('/',(req,res)=>{
    res.send("Working")
})

// using error middleware
app.use(errorMiddleware)
