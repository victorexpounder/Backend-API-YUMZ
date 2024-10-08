import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/User.js'
import RecipeRoutes from './routes/Recipe.js'
import CommentsRoutes from './routes/Comments.js'
import AuthRoutes from './routes/Auth.js'
import cookieParser from 'cookie-parser';
import { getEnv } from 'swiftenv';
//initializing express
const app = express();

const mongo = getEnv("MONGO")

//fuction to connect to our mongoDB cluster
const connect = () =>{
    mongoose.connect(mongo).then(()=>{
        console.log("connected to DB")
    }).catch((err)=>{
        console.log("!Cannot connect to DB")   
    })  
} 
 
app.use(cookieParser()); 
app.use(express.json()); 
app.use("/api/auth", AuthRoutes);
app.use("/api/users", userRoutes);  
app.use("/api/recipes", RecipeRoutes);
app.use("/api/comments", CommentsRoutes);
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something Went Wrong!";
    return res.status(status).json({
        success : false,
        message, 
        status, 

    }) 
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.listen(8800, ()=>{  
    connect();  
    console.log('app server running on port 8800....')
})
