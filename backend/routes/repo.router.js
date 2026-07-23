import express from 'express';
import { createRepository, deleteRepositoryById, fetchRepositoriesOfCurrentUser, fetchRepositoryById, fetchRepositoryByName, getAllRepositories, toggleVisibilityById, updateRepositoryById } from '../controllers/repoController.js';
export const repoRouter = express.Router();

repoRouter.post('/repo/create', createRepository);
repoRouter.get('/repo/all', getAllRepositories);
repoRouter.get('/repo/:id', fetchRepositoryById);
repoRouter.get('/repo/:name', fetchRepositoryByName);
repoRouter.put('/repo/update/:id', updateRepositoryById);
repoRouter.delete('/repo/delete/:id', deleteRepositoryById);
repoRouter.get('/repo/:userID', fetchRepositoriesOfCurrentUser);
repoRouter.patch('/repo/toggle/:id', toggleVisibilityById);

