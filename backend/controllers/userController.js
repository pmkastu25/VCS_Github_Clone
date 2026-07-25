import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from  'bcryptjs';
import {MongoClient, ReturnDocument} from 'mongodb';
import { ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;

async function connectClient(){
    if(!client){
        client = new MongoClient(uri);
    }

    await client.connect();
}

export const getAllUsers = async(req, res) => {
    try{
        await connectClient();
        const db = client.db("githubClone");
        const userCollection = db.collection("users");

        const users = await userCollection.find({}).toArray();
        res.status(200).json(users);
    } catch(err){
        console.log("Error while fetching all the users!");
        res.status(500).send("Server Error");
    }
}

export const signUp = async(req, res) => {
    const {username, password, email} = req.body;
    try{
        await connectClient();
        const db = client.db("githubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({username});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: []
        }

        const result = await userCollection.insertOne(newUser);

        const token = jwt.sign({id: result.resultId}, process.env.JWT_SECRET_KEY, {expiresIn:"1hr"});
        res.json({token});

    } catch(err){
        console.log("Error SigningUp", err.message);
        res.status(500).send("SignUp Error!!");
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    try{
        await connectClient();
        const db = client.db("githubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({email});
        if(!user){
            res.status(400).json({message: "Invalid Credentials!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "Invalid Credentials!"});
        }

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1hr"});
        res.json({token, userId: user._id});
    } catch(err){
        console.log("Error Logining in: ", err.message);
        res.status(500).send("Server Error");
    }
}

export const getUserProfile = async(req, res) => {
    try{
        const {id} = req.params;

        await connectClient();
        const db = client.db("githubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({_id: new ObjectId(id)});

        if(!user){
            res.status(404).send("User not found!");
        }

        res.status(200).send(user);
    } catch(err){
        console.log("Error fetching user profile!");
        res.status(500).send("Server Error while fetching user profile");
    }
}

export const updateUserProfile = async(req, res) => {
    const {id} = req.params;
    const {email, password} = req.body;

    try{
        let updateDetails = {email};
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateDetails.password = hashedPassword;
        }

        await connectClient();
        const db = client.db("githubClone");
        const userCollection = db.collection("users");

        const result = await userCollection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: updateDetails}, {returnDocument: "after"});
        if(!result){
            res.status(404).send("User not found");
        }

        res.status(200).send(result);
    }catch(err){
        console.log("Error during updating user profile");
        res.status(500).send("Server Error!");
    }
}

export const deleteUserProfile = async(req, res) => {
    const {id} = req.params;

    try{
        await connectClient()
        const db = client.db("githubClone");
        const userCollection = db.collection("users");

        const result = await userCollection.deleteOne({_id: new ObjectId(id)});

        if(result.deleteCount == 0){
            res.status(404).send("User not Found!");
        }

        res.json({message:"User Profile Deleted!"});
    } catch(err){
        console.log("Error during deleting a profile");
        res.status(500).send("Server Error during deleting a profile");
    }
}
