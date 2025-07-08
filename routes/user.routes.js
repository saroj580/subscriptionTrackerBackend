import {Router} from "express";

const userRouter = Router();

//GET /users -> get all usres
//GET /users/bhgf1201 -> get specific userd, declared with the id

userRouter.get('/', (req, res) => res.send({title: "Fetch all useres"}));
userRouter.get('/:id', (req, res) => res.send({title: "get users by id"}));
userRouter.post('/', (req, res) => res.send({title: "create a users"}));
userRouter.put('/:id', (req, res) => res.send({title: "Update users via id"}));
userRouter.delete('/:id', (req, res) => res.send({title: "Delete users via id"}));

export default userRouter;
