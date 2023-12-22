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
        
    },
    videoUrl : {
        type: String,
        
    },
    category : {
        type: [String],
        default: []
    },
    likes : {
        type: [String],
        default: [],
    },
    dislikes : {
        type: [String],
        default: []
    },
    
},
 {timestamps: true}
);

export default mongoose.model("Recipe", RecipeSchema); 