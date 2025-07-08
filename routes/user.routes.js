import {Router} from "express";
import {getUserById, getUsers} from "../controller/user.controller.js";

const userRouter = Router();

//GET /users -> get all usres
//GET /users/bhgf1201 -> get specific userd, declared with the id

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', (req, res) => res.send({title: "create a users"}));
userRouter.put('/:id', (req, res) => res.send({title: "Update users via id"}));
userRouter.delete('/:id', (req, res) => res.send({title: "Delete users via id"}));

export default userRouter;
