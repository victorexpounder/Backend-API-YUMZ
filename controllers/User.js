import { createError } from "../error.js" 
import Recipe from "../models/Recipe.js";
import User from "../models/User.js" 
import { Resend } from 'resend';
import crypto from 'crypto'
import bcrypt from 'bcryptjs';



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
        next(createError(403, "You can only update our own account")) 
    }
}
export const handleAvailability = async(req, res, next) =>{
    try {
        const user = await User.findOne({handle : req.params.handle})
        if(user)
        {
            return(next(createError(403, `${req.params.handle} has been taken`)));
        }else{
            res.status(200).json(req.params.handle)
        }
    } catch (error) {
        next(error)
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
export const removeFavorite = async(req, res, next) =>{
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $pull : {favorites : req.params.videoId}
            })
            res.status(200).json("Removed from Favorites")
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
export const sendPasswordReset = async(req, res, next) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return(next(createError(404, "User not found")));
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        // Save the reset token to the user in the database
        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();
        const resetLink = ` http://localhost:3000/forgot-password/reset/${resetToken}`;
        const resend = new Resend('re_55Ree3An_F9zTa4134PD2j87JeJSPnX7F');

        await resend.emails.send({
        from: 'noreply@resend.dev',
        to: req.body.email,
        subject: 'Password Reset',
        html: `<p>Click on the link below to reset password</p> <br />
                ${resetLink} <br />
                <p>This link will expire in one hour</p> <br />
                <strong>if you did not request for this please ignore</strong>
        `
        }); 
        res.status(200).json("password reset link sent check email inbox")
    } catch (error) {
        next(error);
    }
}

export const PasswordReset = async(req, res, next) =>{
    const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    // Update the user's password
    user.password = hash;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json('Password reset successfully');
  } catch (error) {
    console.error(error);
    next(error);
  }
}


