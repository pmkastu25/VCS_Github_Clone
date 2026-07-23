import express from 'express';
import { userRouter } from '../routes/user.router.js'
import { repoRouter } from '../routes/repo.router.js';

export const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);

mainRouter.get("/", (req, res)=>{
        res.send("Welcome!");
});
