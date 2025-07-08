import {Router} from "express";
import {authorize} from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubcription} from "../controller/subscription.controller.js";


const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title : "Get all subscription"}));
subscriptionRouter.get('/:id', (req, res) => res.send({title : "Get Subscription details"}));
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', (req, res) => res.send({title : "Updater the Subscription"}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title : "Delete Subscription"}));
subscriptionRouter.get('/user/:id', authorize, getUserSubcription);
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title : "Cancel subscription for user"}));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title : "Get upcoming renewals for the subscription"}));

export default subscriptionRouter;