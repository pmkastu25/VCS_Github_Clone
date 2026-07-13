import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

import {initRepo} from './controllers/init.js';
import {addRepo} from './controllers/add.js';
import {commitRepo} from './controllers/commit.js';
import {pushRepo} from './controllers/push.js';
import {pullRepo} from './controllers/pull.js';
import {revertRepo} from './controllers/revert.js';

yargs(hideBin(process.argv)).command("init", "Initialize a new repository", {}, initRepo).command("add <file>", "Add a new file to the Repository", (yargs)=>{
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
}, commitRepo).command("push", "Push changes to S3", {}, pushRepo).command("pull", "Pull changes from S3", {}, pullRepo).command("revert <commitID>", "Revert back to the previous commit", (yargs)=>{
    yargs.positional("commitID", {
        describe:"Commit ID to revert to",
        type: "string"
    })
}, revertRepo).demandCommand(1, "atleast one command is required").help().argv;