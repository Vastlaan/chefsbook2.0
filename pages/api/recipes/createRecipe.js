import multer from "multer";
import { s3 } from "../../../s3";
import multerS3 from "multer-s3";
import Connection from "../../../database";
import {
    validateMimeTypeMulter,
    validateTime,
    validateTitle,
    validateIngredients,
    validateText,
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
        const { name, description, time, ingredients } = req.body;

        const isTitleValid = validateTitle(name);
        if (isTitleValid.type === "error") {
            return res.status(400).json({ error: "Data not valid" });
        }
        const isTimeValid = validateTime(time);
        if (isTimeValid.type === "error") {
            return res.status(400).json({ error: "Data not valid" });
        }
        const isIngredientsValid = validateIngredients(JSON.parse(ingredients));
        if (isIngredientsValid.type === "error") {
            return res.status(400).json({ error: "Data not valid" });
        }
        const isTextValid = validateText(description);
        if (isTextValid.type === "error") {
            return res.status(400).json({ error: "Data not valid" });
        }

        const saveToDatabase = {
            user_id: decoded.id,
            name,
            description,
            time,
            ingredients: ingredients,
            photo_url: fileName
                ? `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.BUCKET_NAME}/${fileName}`
                : "", // if no file just assign empty string
            likes: 0,
        };

        // create connection with database
        const db = new Connection().getDatabase();

        await db("recipes")
            .insert({
                user_id: saveToDatabase.user_id,
                name: saveToDatabase.name,
                description: saveToDatabase.description,
                time: saveToDatabase.time,
                ingredients: saveToDatabase.ingredients,
                photo_url: saveToDatabase.photo_url,
                likes: saveToDatabase.likes,
            })
            .returning("*");
        const updatedRecipes = await db("recipes")
            .select("*")
            .where({ user_id: decoded.id })
            .returning("*")
            .orderBy("created_at", "desc");

        res.status(200).json({ recipes: updatedRecipes });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
