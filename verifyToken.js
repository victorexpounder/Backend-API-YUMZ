import jwt from 'jsonwebtoken'
import { createError } from "./error.js";
import { getEnv } from 'swiftenv';

const jwtCode = getEnv('JWT')

export const verifyTken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, jwtCode, (err, user)=>{
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    })
}