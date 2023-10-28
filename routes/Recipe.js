import express from 'express'
import { addRecipe, deleteRecipe, followedVid, getBySearch, getByTag, getRecipe, random, trend, updateRecipe } from '../controllers/Recipe.js';
import { verifyTken } from '../verifyToken.js';

const router = express.Router();

router.post("/",verifyTken, addRecipe);
router.put("/:id", verifyTken, updateRecipe);
router.delete("/post/:id", verifyTken, deleteRecipe);
router.get("/find/:id", getRecipe);
router.get("/random", random);
router.get("/followedVid",verifyTken, followedVid);
router.get("/trend", verifyTken, trend);
router.get("/tags", getByTag);
router.get("/search", getBySearch);


export default router;