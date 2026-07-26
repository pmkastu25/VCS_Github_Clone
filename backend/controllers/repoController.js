import mongoose from 'mongoose';
import Repository from '../models/repoModel.js'
import Issue from '../models/issueModel.js'
import User from '../models/userModel.js'

export const createRepository = async(req, res) => {
    const {owner, name, content, issues, description, visibility} = req.body;

    try{
        if(!name){
            res.status(400).send("Repository name is required");
        }

        if(!mongoose.Types.ObjectId.isValid(owner)){
            res.status(400).send("Invalid UserID");
        }

        const newRepository = new Repository({
            name,
            description,
            content,
            visibility,
            owner,
            issues
        })

        const result = await newRepository.save(); //similarly to insertOne in mongodb

        res.status(200).json({
            message:"Repository created succesfully",
            userID: result._id
        })
    } catch(err){
        console.log("Error during creating a repository");
        res.status(500).send("Server Error!");
    }
}

export const getAllRepositories = (req, res) => {
    res.send("All Repositories");
}

export const fetchRepositoryById = (req, res) => {
    res.send("Fetching a Repo by Id");
}

export const fetchRepositoryByName = (req, res) => {
    res.send("Fetching a Repo by Name");
}

export const fetchRepositoriesOfCurrentUser = (req, res) => {
    res.send("Created a Repository");
}

export const updateRepositoryById = (req, res) => {
    res.send("Updated a Repo By Id");
}

export const deleteRepositoryById = (req, res) => {
    res.send("Created a Repository");
}

export const toggleVisibilityById = (req, res) => {
    res.send("Toggled Visibility!!");
}
