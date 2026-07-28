import express from 'express';
import { createIssue, deleteIssueById, getAllIssues, getIssueById, updateIssueById } from '../controllers/issueController.js';
export const issueRouter = express.Router();

issueRouter.post("/issue/create/:id", createIssue);
issueRouter.get("/issue/all/:id", getAllIssues);
issueRouter.get("/issue/:id", getIssueById);
issueRouter.put("/issue/update/:id", updateIssueById);
issueRouter.delete("/issue/delete/:id", deleteIssueById);
