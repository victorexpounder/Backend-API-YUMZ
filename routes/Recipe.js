import express from 'express'
import { addRecipe, deleteRecipe, followedVid, getRecipe, random, trend, updateRecipe } from '../controllers/Recipe.js';
import { verifyTken } from '../verifyToken.js';

const router = express.Router();

router.post("/",verifyTken, addRecipe);
router.put("/:id", verifyTken, updateRecipe);
router.delete("/post/:id", verifyTken, deleteRecipe);
router.get("/find/:id", getRecipe);
router.get("/random", random);
router.get("/followedVid", followedVid);
router.get("/trend", verifyTken, trend);


export default router;