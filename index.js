import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/User.js'
import RecipeRoutes from './routes/Recipe.js'
import CommentsRoutes from './routes/Comments.js'
import AuthRoutes from './routes/Auth.js'
//initializing express
const app = express();

// dovenv config
dotenv.config();

//fuction to connect to our mongoDB cluster
const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to DB")
    }).catch((err)=>{
        throw err;
    })
}

app.use(express.json);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", userRoutes);  
app.use("/api/recipes", RecipeRoutes);
app.use("/api/comments", CommentsRoutes);

app.listen(8800, ()=>{  
    connect();  
    console.log('app server running on port 8800....')
})