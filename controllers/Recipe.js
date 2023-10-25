import { createError } from "../error.js";
import Recipe from "../models/Recipe.js"
import User from "../models/User.js";
export const addRecipe = async(req,res,next) =>{
    const newRecipe = new Recipe({userId: req.user.id, ...req.body})
    try {
        const savedRecipe = await newRecipe.save();
        res.status(200).json(savedRecipe);
    } catch (error) {
        next(error)
    }
}
export const updateRecipe = async(req,res,next) =>{
    try {
        const recipe = Recipe.findById(req.params.id)
        if(!recipe) next(createError(404, "Recipe Not Found"));
        if(recipe.userId == req.user.id)
        {
            const updatedRecipe = await Recipe.findOneAndUpdate(
                req.params.id,
                {
                    $set : req.body
                },
                {new: true}
            )
            res.status(200).json(updatedRecipe);
        }else{
            next(createError(403, "You can only update your video"))
        }
    } catch (error) {
        next(error)
    }
}
export const deleteRecipe = async(req, res, next) =>{
    try {
        const recipe = Recipe.findById(req.params.id)
        if(!recipe) next(createError(404, "Recipe Not Found"));
        if(recipe.userId == req.user.id)
        {
            await Recipe.findOneAndDelete(
                req.params.id,
            )
            res.status(200).json("recipe deleted");
        }else{
            next(createError(403, "You can only update your video"))
        }
    } catch (error) {
        next(error)
    }
}
export const getRecipe = async(req, res, next) =>{
    try {
        const recipe = Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    } catch (error) {
        next(error)
    }
}
export const random = async(req, res, next) =>{
    try {
        const recipes = Recipe.aggregate([{$sample : {size: 40}}]);
        res.status(200).json(recipes);
    } catch (error) {
        next(error)
    }
}
export const followedVid = async(req, res, next) =>{
    try {
        const user = User.find(req.user.id);
        const followedUsers = user.following;

        const list = Promise.all(
            followedUsers.map((channelId)=>{
                return Recipe.find({userId : channelId})
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const trend = async(req, res, next) =>{
    try {
        const recipe = Recipe.find().sort({likes : -1});
        res.status(200).json(recipe);
    } catch (error) {
        next(error)
    }
}