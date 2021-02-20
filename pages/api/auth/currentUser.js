import jwt from "jsonwebtoken";
import { db } from "../../../database";
import { parse } from "cookie";

function sendError(res, e) {
    return res.status(400).json({
        error: "You need to log in to access the application",
    });
}

export default async function handler(req, res) {
    if (!req.headers["set-cookie"]) {
        return sendError(res);
    }
    // check if there is a token in a cookie

    const parsedCookies = parse(req.headers["set-cookie"][0]);

    const token = parsedCookies[process.env.TOKEN_NAME];

    if (!token) {
        return sendError(res);
    }

    try {
        // check if token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return sendError(res);
        }

        const {
            id,
            email,
            created_at,
            account_photo_url,
            background_photo_url,
        } = decoded;
        // get user posts
        const posts = await db("posts")
            .select("*")
            .where({ user_id: id })
            .orderBy("created_at", "desc");
        // get user recipes
        const recipes = await db("recipes")
            .select("*")
            .where({ user_id: id })
            .orderBy("created_at", "desc");

        // send all user created data to the frontend
        res.status(200).json({
            user: {
                id,
                email,
                created_at,
                account_photo_url,
                background_photo_url,
                posts,
                recipes,
            },
        });
    } catch (error) {
        return sendError(res, error);
    }
}
