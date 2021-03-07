import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import User from "../../../models/User";
import Connection from "../../../database";
import { validateEmail, validatePassword } from "../../../validations";

export default async function handler(req, res) {
    // create connection with database
    const db = new Connection().getDatabase();

    const { email, password } = JSON.parse(req.body);
    // validate email
    const isEmailValid = validateEmail(email);
    if (isEmailValid.type === "error") {
        return res.status(400).json({ error: isEmailValid.message });
    }
    // validate password
    const isPasswordValid = validatePassword(password);
    if (isPasswordValid.type === "error") {
        return res.status(400).json({ error: isPasswordValid.message });
    }

    try {
        // check if email already exist
        const userExist = await db("users")
            .select("email")
            .where({ email })
            .returning("*");

        if (userExist[0] && userExist[0].email) {
            return res
                .status(409)
                .json({ error: "User with that email is already registered" });
        }
        // hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User(email, hash);
        // create user
        const createdUser = await db("users")
            .insert({
                ...user.getUser(),
            })
            .returning("*");
        // create payload for JWT token
        const payload = {
            id: createdUser.id,
            email: createdUser.email,
            createdAt: createdUser.created_at,
        };
        // create token
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

        // return created user
        res.status(200).json({ user: payload });

        db.destroy();
    } catch (err) {
        db.destroy();
        console.log(err);
        return res.status(200).json({ error: "Ups, something went wrong." });
    }
}
