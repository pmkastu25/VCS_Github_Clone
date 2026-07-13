import {promises as fs} from "fs";
import path from "path";

export async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".mygit");
    const commitPath = path.join(repoPath, "commits");

    try{
        await fs.mkdir(repoPath, {recursive: true});
        await fs.mkdir(commitPath, {recursive:true});
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({bucket: process.env.S3_BUCKET})
        )
        console.log("Repository initialized successfully.");
    } catch(err){
        console.error("Error initializing Repository:", err);
    }
}
