import { createError } from "../error.js";
import Comments from "../models/Comments.js"
import Recipe from "../models/Recipe.js";

export const addComments = async(req, res, next) =>{
    const newComment = new Comments({userId: req.user.id, ...req.body})
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment); 
    } catch (error) {
        next(error)
    }
}
export const deleteComments = async(req, res, next) =>{
    try {
        const comment = await Comments.findById(req.params.id)
        const recipe = await Recipe.findById(req.params.id)
        if(req.user.id == comment.userId || req.user.id == recipe.userId)
        {
            await Comments.findByIdAndDelete(req.params.id);
            res.status(200).json("comment deleted Successfully")
        }else{
            next(createError(403, "You can only delete your own comment"))  
        }
    } catch (error) {
        next(error)
    }
   
}
export const getComments = async(req, res, next) =>{
 try {
    const comments = await Comments.find({recipeId: req.params.recipeId});
    res.status(200).json(comments);
 } catch (error) { 
    next(error) 
 }
}