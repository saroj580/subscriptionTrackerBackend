import jwt from "jsonwebtoken";

import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

//someone is making a request get user details --> authorize midleware --> verify --> if valid --> next --> get user details

export const authorize = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({
            message: "Unauthorized",
        })

        //if we got the token we have to authorized
        const decoded = jwt.verify(token, JWT_SECRET);
        //after decoding check if the user still exists then
        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message: "Unauthorized"});

        req.user = user;
        next();
    }catch(err) {
        res.status(400).json({
            message : "Unauthorized",
            error: err.message
        })
    }
}