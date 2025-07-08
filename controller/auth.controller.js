import {mongoose} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

//What is req body --> The req.body is an object containing data coming from the client specifically when you have a (POST req).

export const signUp = async (req, res, next) => {
    //Implement signup logic here
    const session = await mongoose.startSession()
    session.startTransaction();
    try {
        const {name, email, password} = req.body;

        //check if the users already exixts
        const existingUser = await User.findOne({email});
        if(existingUser) {
            const error = new Error('User already Exists');
            error.statusCode = 409;
            throw error;
        }

        //if it doestn't exits, hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUsers = await User.create([{name, email, password:hashPassword}], {session});

        //generate the token so that they can sign in
        const token = jwt.sign({userId : newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: `User created successfully.`,
            data : {
                token,
                user : newUsers[0]
            }
        })
    }catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    //Implement signin logic here
    try {
          const {email, password} = req.body;

          const user = await User.findOne({email})

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        //if the user exist
        const isPasswordValid = await bcrypt.compare(password, user.password); //the first parameter(password) is the user input while signing in and the another parameter(user.password) is compared the user's input password

        //if the password is not valid
        if(!isPasswordValid) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        //if the password is valid
        const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: `User signed in successfully.`,
            data : {
                token,
                user
            }
        })
    }catch (error) {
        next(error);
    }
}

export const signOut = async (req, res) => {
    //Implement signout logic here
}