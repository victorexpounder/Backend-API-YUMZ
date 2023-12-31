import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,   
        required : true,
    },
    lastName : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
        unique: true,
    }, 
    handle : {
        type: String,
        unique: true,
    }, 
    password : { 
        type: String,
        required : true,
    }, 
    img : {
        type: String,
    }, 
    coverImg : {
        type: String,
    }, 
    handle : {
        type: String,
        unique: true,
    }, 
    description : { 
        type: String,
    }, 
    followers : {
        type: Number,
        default: 0,
    }, 
    following : {
        type: [String],
    }, 
    favorites : {
        type: [String],
    }, 
    resetToken : {
        type: String,
    }, 
    resetTokenExpiration : {
        type: Date,
    }, 
},
 {timestamps: true}
);

export default mongoose.model("User", UserSchema);  
