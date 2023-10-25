import express from 'express'
import { deleteUser, follow, getUser, like, unfollow, unlike, update } from '../controllers/User.js';
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
router.put("/unfollow/:id", unfollow)
//like a recipe
router.put("/like/:videoId", like)
//unlike a recipe
router.put("/unlike/:videoId", unlike)


export default router; 