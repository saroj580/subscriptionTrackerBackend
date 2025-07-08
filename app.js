import express from 'express';
const app = express();
import {PORT} from './config/env.js';
import cookieParser from 'cookie-parser';


import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware)

app.get('/', (req, res)=> {
    res.status(200).json({message: "Hello World"})
})

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Subscription Tracker is running on http://localhost:${PORT}`);
});
