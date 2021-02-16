import AWS from "aws-sdk";

// create new endpoint, it should have format of https://[your_location].digitaloceanspaces.com
const spacesEndpoint = new AWS.Endpoint("ams3.digitaloceanspaces.com");
export const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
});
