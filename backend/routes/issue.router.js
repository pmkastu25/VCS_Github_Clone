import express from 'express';
import { createIssue, deleteIssueById, getAllIssues, getIssueById, updateIssueById } from '../controllers/issueController.js';
export const issueRouter = express.Router();

issueRouter.post("/issue/create", createIssue);
issueRouter.get("/issue/all", getAllIssues);
issueRouter.get("/issue/:id", getIssueById);
issueRouter.put("/issue/update/:id", updateIssueById);
issueRouter.delete("/issue/delete/:id", deleteIssueById);
