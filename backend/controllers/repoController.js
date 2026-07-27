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

export const getAllRepositories = async(req, res) => {
    try{
        const repositories = await Repository.find({}).populate("owner").populate("issues");
        if(!repositories || repositories.length == 0){
            res.status(404).json({error: "Repository not found"});
        }
        res.json(repositories);
    } catch(err){
        console.log("Error during fetching all the repositories",err.message);
        res.status(500).send("Server Error!");
    }
}

export const fetchRepositoryById = async(req, res) => {
    const {id} = req.params;
    try{
        const repository = await Repository.find({ _id: id}).populate("owner").populate("issues");

        if(!repository || repository.length == 0){
             res.status(404).json({error: "Repository not found"});
        }
        res.json(repository);
    } catch(err){
        console.log("Error during fetching a repository", err.message);
        res.status(500).send("Server Error!");
    }
}

export const fetchRepositoryByName = async(req, res) => {
    const {name} = req.params;
    try{
        const repository = await Repository.find({name}).populate("owner").populate("issues");
        if(!repository || repository.length == 0){
            res.status(404).json({error: "Repository not found"});
        }
        res.json(repository);
    }catch(err){
        console.log("Error during fetching the repository by name");
        res.status(500).send("Server Error!");
    }
}

export const fetchRepositoriesOfCurrentUser = async(req, res) => {
    const userID = req.user;

    try{
        const repositories = await Repository.findById(userID);
        if(!repositories || repositories.length == 0){
             res.status(404).json({error: "Repository not found"});
        }

        res.json({message:"Repositories found",repositories});
    }catch(err){
        console.log("Error during fetching the repositories of User", err.message);
        res.status(500).send("Server Error!");
    }
}

export const updateRepositoryById = async(req, res) => {
    const {id} = req.params;
    const {content, description} = req.body;

    try{
        const repository = await Repository.findById(id);
        if(!repository || repository.length == 0){
            res.status(404).json({error: "Repository not found"});
        }

        repository.content.push(content);
        repository.description = description;

        const updatedRepository = await repository.save();

        res.json({message:"Repository updated Successfully", repository: updatedRepository});
    }catch(err){
        console.log("Error during updating the repository", err.message);
        res.status(500).send("Server Error!");
    }
}

export const deleteRepositoryById = async(req, res) => {
    const {id} = req.params;

    try{
        const repository = await Repository.findByIdAndDelete(id);
         if(!repository || repository.length == 0){
            res.status(404).json({error: "Repository not found"});
        }

        res.json({message:"Repository deleted successfully"});
    }catch(err){
        console.log("Error during deleting the repository", err.message);
        res.status(500).send("Server Error!");
    }
}

export const toggleVisibilityById = async(req, res) => {
    const {id} = req.params;

    try{
        const repository = await Repository.findById(id);
        if(!repository || repository.length == 0){
             res.status(404).json({error: "Repository not found"});
        }

        repository.visibility = !repository.visibility;
        const updatedRepository = await repository.save();
         res.json({message:"Repository visibility toggled Successfully", repository: updatedRepository});
    }catch(err){
        console.log("Error during toggling the visibility of the repository", err.message);
        res.status(500).send("Server Error!");
    }
}
