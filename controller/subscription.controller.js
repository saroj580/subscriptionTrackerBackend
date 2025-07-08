import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user : req.user._id,

        })

        res.status(201).send({success:true, data:subscription})
    }catch(err){
        next(err);
    }
}

export const getUserSubcription = async (req, res) => {
    try {
        //check if the user is same as the one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not the owner of this account")
            error.status(401)
            throw error;
        }

        //if he is the owner and try to see his ownership 
        const subscriptions = await Subscription.find({ user: req.params.id })
        
        res.status(200).json({
            success: true,
            data : subscriptions
        })
    } catch (error) {
        next(error);
    }
}