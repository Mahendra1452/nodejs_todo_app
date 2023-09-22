import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req,res)=>{
    const users = await User.find();
    res.status(201).json({
        users,
    })
}   

export const register = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
       
        if(user) return next(new ErrorHandler("User already exists",404))
        
        const hashPassword = await bcrypt.hash(password,10)
        user = await User.create({name,email,password:hashPassword})
        
        sendCookie(user,res,"Registered Successfully",201)
    } catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid email and password",404));
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if(!isMatch) return next(new ErrorHandler("Invalid email and password",404));
    
        sendCookie(user,res,`Welcome ${user.name}`,201);
    
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = (req,res) =>{
   
        res.status(200).json({
            success: true,
            user: req.user,
        })
}

export const logout = (req,res) =>{
    res.status(200).cookie("token",{expires: new Date(Date.now())}).json({
        success: true,
        user: req.user,
        sameSite: process.env.NODE_ENV === "Development"? "lax": "none",
        secure: process.env.NODE_ENV === "Development"? false: true,
    })
}

const isAuthenticated = async (req,res)=>{

}

export const specialFunc = (req,res)=>{
    res.json({
        success: true,
        message: "Just Joking",
    })
}

export const getUserByID = async (req,res)=>{
    const {id} = req.params;
    // const {id} = req.query.id;
    const user = await User.findById(id);
    // console.log(req.params)
    res.json({
        success: true,
        user
    })
}

export const updateUser = async (req,res)=>{
    const {id} = req.params;
    
    const user = await User.findById(id);
    
    res.json({
        success: true,
        message: "Updated"
    })
}

export const deleteUser = async (req,res)=>{
    const {id} = req.params;

    const user = await User.findById(id);

    //await user.remove();
    
    res.json({
        success: true,
        message: "Deleted"
    })
}













// export const updateUser = async (req,res)=>{
//     const {id} = req.params;
//     const user = User.findById(id);

//     res.json({
//         success: true,
//         message: "Updated",
//     });
// };

// export const deleteUser = async (req,res)=>{
//     const {id} = req.params;
//     const user = User.findById(id);

//     await user.remove();

//     res.json({
//         success: true,
//         message: "Deleted",
//     });
// };





