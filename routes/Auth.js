import express from 'express'
import { signIn, signup } from '../controllers/Auth.js';

const router = express.Router();
 
//CREATE A USER
router.post("/signup", signup)
//SIGNUP A USER
router.post("/signin", signIn)
//GOOGLE AUTH
router.post("/google",)
  


export default router;