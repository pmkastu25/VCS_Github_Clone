import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from  'bcryptjs';
import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;

async function connectClient(){
    if(!client){
        client = new MongoClient(uri);
    }

    await client.connect();
}

export const getAllUsers = (req, res) => {
    res.send("Getting all users");
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

export const getUserProfile = (req, res) => {
    res.send("Getting a user profile");
}

export const updateUserProfile = (req, res) => {
    res.send("Updating a user profile");
}

export const deleteUserProfile = (req, res) => {
    res.send("Deleting a particular User Profile");
}
