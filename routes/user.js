import express from "express";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import { getAllUsers,
    register,
    specialFunc,
    getUserByID,
    login,
    updateUser,
    deleteUser,
    getMyProfile,
    logout} 
    from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

mongoose
    .connect("mongodb+srv://mahendragudla:keil754A_2456@cluster0.0nxlmbb.mongodb.net/",{
        dbName: "backend_api",
    })
    .then(()=>console.log("Database connected"))
    .catch(e=>console.log(e))


// /userid/rfeferf
// /userid/abhi
// this has to be above the /userid/:id (dynamic routing)
// dynamic routing supposed to be at last

router.get("/userid/special",specialFunc)

router.get('/all', getAllUsers);

router.post("/new", register);

router.post("/login", login)

router.get("/logout", logout)

router.route("/userid/:id").get(getUserByID).put(updateUser).delete(deleteUser);

router.get("/me",isAuthenticated,getMyProfile);

export default router;