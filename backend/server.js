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
}, addRepo).command("commit", "Commit changes to the repository", {}, commitRepo).command("push", "Push changes to the repository", {}, pushRepo).command("pull", "Pull changes to the repository", {}, pullRepo).command("revert", "Revert back to the previous commit", {}, revertRepo).demandCommand(1, "atleast one command is required").help().argv;