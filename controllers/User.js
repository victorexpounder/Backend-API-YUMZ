import { createError } from "../error.js" 
import Recipe from "../models/Recipe.js";
import User from "../models/User.js" 

export const update = async(req, res, next) =>{
    //verify user
    if(req.params.id === req.user.id)
    {
        try{
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                $set : req.body,
                },
                {new: true} 
            );
            res.status(200).json(updatedUser);
        }catch(err){
            next(err)
        }
    }else{
        next(createError(403, "You can only update your own details"))
    }
}

export const deleteUser = async(req, res, next) =>{
    if(req.params.id === req.user.id)
    {
        try{
            await User.findOneAndDelete(
                req.params.id
            );
            res.status(200).json("user has been deleted");
        }catch(err){
            next(err)
        }
    }else{
        next(createError(403, "You can only delete our own account"))
    }
}
export const getUser = async(req, res, next) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) next(createError(404, "User does not exist"));
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}
export const follow = async(req, res, next) =>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push : {following : req.params.id}
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc : {followers : 1}
        })
        res.status(200).json("followed sucessfully");
    } catch (error) {
        next(error)
    }
}

export const unfollow = async(req, res, next) =>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull : {following : req.params.id}
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc : {followers : -1}
        })
        res.status(200).json("Unfollowed sucessfully");
    } catch (error) {
        
    }
}
export const addFavorite = async(req, res, next) =>{
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $push : {favorites : req.params.videoId}
            })
            res.status(200).json("Added to Favorites")
        } catch (error) {
            next(error);
        }
}
export const like = async(req, res, next) =>{
    const id = req.user.id;
    const recipeId = req.params.recipeId;
    try {
        await Recipe.findByIdAndUpdate(recipeId, {
            $addToSet : {likes:id},
            $pull : {dislikes:id} 
        })
        res.status(200).json("like added succesfully")
    } catch (error) { 
        next(error)
    }
    
}
export const unlike = async(req, res, next) =>{
    const id = req.user.id;
    const recipeId = req.params.recipeId;
    try {
        await Recipe.findByIdAndUpdate(recipeId, {
            $pull : {likes : id},
            $addToSet : {dislikes: id}
        })
        res.status(200).json("Recipe Disliked succesfully") 
    } catch (error) {
        next(error)
    }
    
}
