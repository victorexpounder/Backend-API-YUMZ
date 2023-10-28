import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    userId : {
        type: String,
        required : true,
    },
    title : {
        type: String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
    imgUrl : {
        type: String,
        required : true,
    },
    videoUrl : {
        type: String,
        required : true,
    },
    category : {
        type: [String],
        default: []
    },
    likes : {
        type: Number,
        default: 0,
    },
    dislikes : {
        type: [String],
        default: []
    },
    
},
 {timestamps: true}
);

export default mongoose.model("Recipe", RecipeSchema); 