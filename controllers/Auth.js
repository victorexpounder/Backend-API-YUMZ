import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
export const signup = async(req, res, next) =>{
    try{
        //hashing our password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        //seting our new user from our user schema created
        const newUser = new User({...req.body, password: hash });

        await newUser.save();
        res.status(200).send("User created Successfully");
        
    }catch(err){
       next(err);
    }
}  
  
export const signIn = async(req, res, next) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return(next(createError(404, "User not found")));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return(next(createError(400, "Wrong Credentials")));

        const {password, ...others} = user._doc
        const token = jwt.sign({id : user._id}, process.env.JWT)
        res.cookie("access_token", token, {
            httpOnly : true,
        })
        .status(200)
        .json(others) 
    }catch(err){ 
       next(err);
    } 
}  
  