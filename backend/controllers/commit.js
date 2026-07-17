import {promises as fs} from "fs";
import path from "path";
import {v4} from "uuid";

export async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".mygit");
    const stagingPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try{
        const commitID = v4();
        const commitDir = path.join(commitPath, commitID);

        await fs.mkdir(commitDir, {recursive: true});
        const files = await fs.readdir(stagingPath);

        for(const file of files){
            await fs.copyFile(path.join(stagingPath, file), path.join(commitDir, file));
        }

        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({message, date: new Date().toISOString()})
        );

        console.log(`Commit ${commitID} created with message: ${message}`);

    } catch(err){
        console.error("Error committing files:", err);
    }
}