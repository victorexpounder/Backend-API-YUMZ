import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId : {
        type: String,
        required : true,
    },
    recipeId : {
        type: String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
     
},
 {timestamps: true}
);

export default mongoose.model("comment", CommentSchema); 