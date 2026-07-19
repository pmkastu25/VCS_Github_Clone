import fs from "fs";
import path from "path";
import {promisify} from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

export async function revertRepo(commitID) {
    const repoPath = path.join(process.cwd(), ".mygit");
    const commitsPath = path.join(repoPath, "commits");

    try{
        const commitDir = path.join(commitsPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.join(repoPath, "..");

        for(const file of files){
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));
        }

        console.log(`Commit ${commitID} reverted successfully.`);
    } catch(err){
        console.log("Error reverting repo:", err);
    }
}
