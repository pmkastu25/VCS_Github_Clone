import express from 'express';
import { deleteUserProfile, getAllUsers, getUserProfile, login, signUp, updateUserProfile } from '../controllers/userController.js'
export const userRouter = express.Router();

userRouter.get('/allUsers', getAllUsers);
userRouter.post('/signUp', signUp);
userRouter.post('/login', login);
userRouter.get('/userProfile/:id', getUserProfile);
userRouter.put('/updateUser/:id', updateUserProfile);
userRouter.delete('/deleteUser/:id', deleteUserProfile);

