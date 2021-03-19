import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import User from "../../../models/user";
import Connection from "../../../database";
import { validateEmail, validatePassword } from "../../../validations";

export default async function handler(req, res) {
    // create connection with database
    const db = new Connection().getDatabase();

    const { email, password } = JSON.parse(req.body);
    // validate email
    const isEmailValid = validateEmail(email);
    if (isEmailValid.type === "error") {
        db.destroy();
        return res.status(400).json(isEmailValid);
    }
    // validate password
    const isPasswordValid = validatePassword(password);
    if (isPasswordValid.type === "error") {
        db.destroy();
        return res.status(400).json(isPasswordValid);
    }

    try {
        // check if email already exist
        const userExist = await db("users")
            .select("email")
            .where({ email })
            .returning("*");

        if (userExist[0] && userExist[0].email) {
            db.destroy();
            return res.status(409).json({
                type: "error",
                field: "email",
                message: "User with that email is already registered",
            });
        }
        // hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User(email, hash);
        // create user
        const createdUserArray = await db("users")
            .insert({
                ...user.getUser(),
            })
            .returning("*");
        const createdUser = createdUserArray[0];
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
        return res.status(200).json({
            type: "error",
            field: "general",
            message: "Something went wrong",
        });
    }
}
