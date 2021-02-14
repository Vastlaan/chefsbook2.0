import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import jwt from "jsonwebtoken";
import { db } from "../../../database";
import {
    validateText,
    validateTitle,
    validateMimeTypeMulter,
} from "../../../validations";
import checkCookie from "../../../utils/checkCookie";

export const config = {
    api: {
        bodyParser: false,
    },
};

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);

    // set fileName to undefined
    let fileName;
    try {
        // create new endpoint, it should have format of https://[your_location].digitaloceanspaces.com
        const spacesEndpoint = new AWS.Endpoint(
            "https://ams3.digitaloceanspaces.com"
        );
        const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            accessKeyId: process.env.AWS_ACCESS_KEY,
        });
        // middleware function to execute
        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: "michalantczak",
                acl: "public-read",
                key: function (_req, file, cb) {
                    // create a file name, which we later use to append to url and save in database
                    fileName = `${decoded.email}/${file.originalname}`;
                    cb(null, `${decoded.email}/${file.originalname}`);
                },
            }),
            fileFilter: function (_req, file, cb) {
                validateMimeTypeMulter(file, cb);
            },
        }).array("file", 1);

        // run middleware
        await runMiddleware(req, res, upload);

        // after request is being processed through middleware it appends the rest of the data, which are not a file, to the req.body
        const { title, text } = req.body;

        // create an object which holds data to store in database
        const saveToDatabase = {
            id: decoded.id,
            title,
            text,
            photourl: fileName
                ? `https://michalantczak.ams3.digitaloceanspaces.com/${fileName}`
                : "", // if no file just assign empty string
        };

        // I use knex library to save data to postgresql. The knex connection is created in separate file and exported. Here I take advantage of already created knex connection. Your schema is probably different so keep it in mind.
        const result = await db("posts")
            .insert({
                user_id: decoded.id,
                title: saveToDatabase.title,
                text: saveToDatabase.text,
                photo_url: saveToDatabase.photourl,
                likes: 0,
            })
            .returning("*");

        res.status(200).json({ post: result[0] });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
