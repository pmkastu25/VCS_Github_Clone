import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import {Server} from "socket.io";

import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

import {initRepo} from './controllers/init.js';
import {addRepo} from './controllers/add.js';
import {commitRepo} from './controllers/commit.js';
import {pushRepo} from './controllers/push.js';
import {pullRepo} from './controllers/pull.js';
import {revertRepo} from './controllers/revert.js';

yargs(hideBin(process.argv)).command("start", "Starts a new server", {}, startServer).command("init", "Initialize a new repository", {}, initRepo).command("add <file>", "Add a new file to the Repository", (yargs)=>{
    yargs.positional("file", {
        describe:"Add file to the staging area",
        type: "string"
    })
}, (argv) => {
    addRepo(argv.file);
}).command("commit <message>", "Commit changes to the repository", (yargs)=>{
    yargs.positional("message", {
        describe:"Commit message",
        type: "string"
    })
}, (argv) => {
    commitRepo(argv.message);
}).command("push", "Push changes to S3", {}, pushRepo).command("pull", "Pull changes from S3", {}, pullRepo).command("revert <commitID>", "Revert back to the previous commit", (yargs)=>{
    yargs.positional("commitID", {
        describe:"Commit ID to revert to",
        type: "string"
    })
}, (argv) => {
    revertRepo(argv.commitID);
}).demandCommand(1, "atleast one command is required").help().argv;

function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI = process.env.MONGODB_URI;

    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

    //to establish a live constant connection between the client and server
    app.use(cors({origin: "*"}));

    app.get("/", (req, res)=>{
        res.send("Welcome!");
    });

    const httpServer = http.createServer(app);
    
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const user = "test";

    io.on("connection", (socket)=>{
        socket.on("joinRoom", (userID)=>{
        console.log("=====");
        console.log(user);
        console.log("=====");
        socket.join(userID);
        });
    });

    const db = mongoose.connection;

    db.once("open", () => {
        console.log("CRUD operations performed on the database");
        //CRUD operations
    });

    httpServer.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    });
}