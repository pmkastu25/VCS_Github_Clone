import mongoose from 'mongoose';
import Repository from '../models/repoModel.js'
import Issue from '../models/issueModel.js'
import User from '../models/userModel.js'
import { ObjectId } from 'mongodb';

export const createIssue = async(req, res) => {
    const {title, description} = req.body;
    const {id} = req.params; //repository id

    try{
        const issue = new Issue({
            title, 
            description,
            repository:new ObjectId(id)
        })

        await issue.save();
        res.status(201).json(issue);
    } catch(err){
        console.log("Error during creating an issue", err);
        res.status(500).send("Server Error!");
    }
}

export const updateIssueById = async(req, res) => {
    const {title, description, status} = req.body;
    const {id} = req.params; //issue id
    try{
        const issue = await Issue.findById(id);

        if(!issue){
            res.status(404).send("Issue not found!!");
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json({message:"Issue Updated Successfully",issue});
    }catch(err){
        console.log("Error during updating an issue by id", err);
        res.status(500).send("Server Error!");
    }
}

export const deleteIssueById = async(req, res) => {
   const {id} = req.params; //issue id

   try{
        const issue = await Issue.findByIdAndDelete(id);

        if(!issue){
            res.status(404).send("Issue not found!!");
        }

        res.status(200).json({message:"Issue Deleted Succesfully"});
   }catch(err){
        console.log("Error during updating an issue by id", err);
        res.status(500).send("Server Error!");
   }
}

export const getAllIssues = async(req, res) => {
   const {id} = req.params; //repository id

   try{
        const issues = await Issue.find({repository:id});

         if(!issues || issues.length == 0){
            res.status(404).send("Issue not found!!");
        }

        res.json(issues);
   }catch(err){
        console.log("Error during fetching all issues by Repository id", err);
        res.status(500).send("Server Error!");
   }
}

export const getIssueById = async(req, res) => {
    const {id} = req.params; //issue id

   try{
        const issue = await Issue.find({_id: new ObjectId(id)});

         if(!issue || issue.length == 0){
            res.status(404).send("Issue not found!!");
        }

        res.json(issue);
   }catch(err){
        console.log("Error during fetching all issues by issue id", err);
        res.status(500).send("Server Error!");
   }
}