import express from 'express'
import { addComments, deleteComments, getComments } from '../controllers/Comments.js';
import { verifyTken } from '../verifyToken.js';

const router = express.Router();

//add comment
router.post("/", verifyTken, addComments)
//delete comment
router.delete("/:id", verifyTken, deleteComments)
//get comment
router.get("/:recipeId", getComments)

export default router;