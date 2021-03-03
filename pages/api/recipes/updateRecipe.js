import multer from "multer";
import { s3 } from "../../../s3";
import multerS3 from "multer-s3";
import { db } from "../../../database";
import { validateMimeTypeMulter } from "../../../validations";
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
        const {
            name,
            description,
            time,
            ingredients,
            photo_url,
            recipeId,
        } = req.body;

        const saveToDatabase = {
            id: recipeId,
            name,
            description,
            time,
            ingredients: ingredients,
            photo_url: fileName
                ? `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.BUCKET_NAME}/${fileName}`
                : photo_url, // if no file just assign empty string
        };

        await db("recipes").where({ id: saveToDatabase.id }).update({
            name: saveToDatabase.name,
            description: saveToDatabase.description,
            time: saveToDatabase.time,
            ingredients: saveToDatabase.ingredients,
            photo_url: saveToDatabase.photo_url,
        });
        const updatedRecipes = await db("recipes")
            .select("*")
            .where({ user_id: decoded.id })
            .orderBy("created_at", "desc");

        res.status(200).json({ recipes: updatedRecipes });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
