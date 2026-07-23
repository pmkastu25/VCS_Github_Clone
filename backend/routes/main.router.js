import express from 'express';
import { userRouter } from '../routes/user.router.js'
export const mainRouter = express.Router();

mainRouter.use(userRouter);

mainRouter.get("/", (req, res)=>{
        res.send("Welcome!");
    });
