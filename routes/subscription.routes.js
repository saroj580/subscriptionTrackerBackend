import {Router} from "express";


const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title : "Get all subscription"}));
subscriptionRouter.get('/:id', (req, res) => res.send({title : "Get Subscription details"}));
subscriptionRouter.post('/', (req, res) => res.send({title : "Crate subscription"}));
subscriptionRouter.put('/:id', (req, res) => res.send({title : "Updater the Subscription"}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title : "Delete Subscription"}));
subscriptionRouter.get('/user/:id', (req, res) => res.send({title : "Get all subscription for specific users"}));
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title : "Cancel subscription for user"}));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title : "Get upcoming renewals for the subscription"}));

export default subscriptionRouter;