import {promises as fs} from 'fs';
import path from 'path';
import {s3, s3Bucket} from '../config/aws-config.js';

export async function pullRepo() {
    const repoPath = path.join(process.cwd(), '.mygit');
    const commitsPath = path.join(repoPath, "commits");

    try {
        const data = await s3.listObjectsV2({ Bucket: s3Bucket, Prefix: 'commits/' }).promise();
        const objects = data.Contents;

        for(const object of objects) {
            const key = object.Key;
            const fileName = path.dirname(key).split('/').pop();

            const commitsDir = path.join(commitsPath, fileName);

            await fs.mkdir(commitsDir, { recursive: true });

            const params = {
                Bucket: s3Bucket,
                Key: key
            }

            const fileContent = await s3.getObject(params).promise();
            await fs.writeFile(path.join(repoPath, key), fileContent.Body);
            console.log(`Pulled ${fileName} from S3 and saved to ${commitsDir}`);
        }
    } catch(err){
        console.error('Error pulling repo:', err);
    }
}