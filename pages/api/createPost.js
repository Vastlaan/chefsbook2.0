import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import jwt from "jsonwebtoken";
import { db } from "../../database";
import { parse } from "cookie";

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
    const cookie = req.headers.cookie;

    if (!cookie) {
        res.status(403).json({ error: "Not Authorized" });
    }

    const token = parse(cookie)[process.env.TOKEN_NAME];

    if (!token) {
        res.status(403).json({ error: "Not Authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.email) {
        res.status(403).json({ error: "Not Authorized" });
    }

    let fileName;
    try {
        const spacesEndpoint = new AWS.Endpoint(
            "https://ams3.digitaloceanspaces.com"
        );
        const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            accessKeyId: process.env.AWS_ACCESS_KEY,
        });

        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: "michalantczak",
                acl: "public-read",
                key: function (req, file, cb) {
                    fileName = `${decoded.email}/${file.originalname}`;
                    cb(null, `${decoded.email}/${file.originalname}`);
                },
            }),
        }).array("file", 1);

        await runMiddleware(req, res, upload);

        const { title, text } = req.body;

        const saveToDatabase = {
            id: decoded.id,
            title,
            text,
            photourl: fileName || "",
        };

        await db("posts")
            .insert({
                user_id: decoded.id,
                title: saveToDatabase.title,
                text: saveToDatabase.text,
                photo_url: saveToDatabase.photourl,
                likes: 0,
            })
            .returning("*");

        res.status(200).json({ ...saveToDatabase });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
