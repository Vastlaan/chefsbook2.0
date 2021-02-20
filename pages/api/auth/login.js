import { db } from "../../../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";

export default async function handler(req, res) {
    const { email, password } = req.body;

    try {
        // get the user as array
        const userArray = await db("users").where({ email });
        // retrive the user
        const user = userArray[0];
        // get users hash
        const hash = user.password;
        // if doesn't exist send error response
        if (!hash) {
            return res.status(400).json({ error: "Ups, Unable to log in" });
        }
        // check if password is valid
        const isValid = await bcrypt.compare(password, hash);
        // if not valid send error response
        if (!isValid) {
            return res.status(400).json({ error: "Ach, Unable to log in" });
        }
        // setup payload for JWT token
        const payload = {
            id: user.id,
            email: user.email,
            created_at: user.created_at.toString().split(" 00")[0],
            account_photo_url: user.account_photo_url,
            background_photo_url: user.background_photo_url,
        };
        // create JWT token
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 * 30,
        });
        // define max age for cookie
        const MAX_AGE = 60 * 60 * 24 * 30;
        // create a cookie
        const cookie = serialize(process.env.TOKEN_NAME, token, {
            maxAge: MAX_AGE,
            expires: new Date(Date.now() + MAX_AGE),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });
        // setup cookie in response header
        res.setHeader("Set-Cookie", cookie);

        // get posts
        const posts = await db("posts")
            .select("*")
            .where({ user_id: user.id })
            .orderBy("created_at", "desc");

        // get user recipes
        const recipes = await db("recipes")
            .select("*")
            .where({ user_id: user.id })
            .orderBy("created_at", "desc");

        res.status(201).json({
            user: { ...payload, ...{ posts: posts }, ...{ recipes: recipes } },
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ error: "Hmm, Unable to log in" });
    }
}
