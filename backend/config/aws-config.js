import {AWS} from 'aws-sdk';

AWS.config.update({region:"ap-south-1"});

const s3 = new AWS.S3();
const s3Bucket = process.env.AWS_BUCKET_NAME;

module.exports = { s3, s3Bucket };