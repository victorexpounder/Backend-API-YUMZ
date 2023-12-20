import express from 'express'
import { addFavorite, deleteUser, follow, getUser, handleAvailability, like, removeFavorite, unfollow, unlike, update } from '../controllers/User.js';
import { verifyTken } from '../verifyToken.js';

const router = express.Router();

//update User
router.put("/:id",verifyTken, update)
//delete User
router.delete("/:id",verifyTken, deleteUser)
//get a User
router.get("/find/:id", getUser)
//follow a User
router.put("/follow/:id", verifyTken, follow)
//unfollow a User
router.put("/unfollow/:id", verifyTken, unfollow)
//like a recipe
router.put("/like/:recipeId", verifyTken, like) 
//unlike a recipe
router.put("/unlike/:recipeId", verifyTken, unlike)
//add a recipe to favorites
router.put("/favorite/:videoId", verifyTken, addFavorite)

router.put("/unfavorite/:videoId", verifyTken, removeFavorite)

//check handle availability
router.get("/handle/:handle", handleAvailability)

export default router; 