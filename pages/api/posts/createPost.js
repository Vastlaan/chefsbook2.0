import multer from "multer";
import { s3 } from "../../../s3";
import multerS3 from "multer-s3";
import Connection from "../../../database";
import {
    validateText,
    validateTitle,
    validateMimeTypeMulter,
} from "../../../validations";
import checkCookie from "../../../utils/checkCookie";
import runMiddleware from "../../../utils/runMiddleware";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    if (decoded.error) {
        return res.status(403).json({
            error: "Not authorized.",
        });
    }

    // set fileName to undefined
    let fileName;
    try {
        // middleware function to execute
        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: process.env.BUCKET_NAME,
                acl: "public-read",
                key: function (_req, file, cb) {
                    // create a file name, which we later use to append to url and save in database
                    fileName = `${decoded.email}/${Date.now()}-${
                        file.originalname
                    }`;
                    cb(
                        null,
                        `${decoded.email}/${Date.now()}-${file.originalname}`
                    );
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
                ? `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.BUCKET_NAME}/${fileName}`
                : "", // if no file just assign empty string
        };

        // create connection with database
        const db = new Connection().getDatabase();

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
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
