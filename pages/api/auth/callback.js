import { oauth2Client } from "../../../utils/googleClient";
import jwt from "jsonwebtoken";
import Connection from "../../../database";
import { serialize } from "cookie";

export default async function handler(req, res) {
    try {
        const code = req.query.code;

        const { tokens } = await oauth2Client.getToken(code);

        const { id_token } = tokens;

        const credentials = jwt.decode(id_token);

        const { email, given_name, family_name, picture } = credentials;

        const db = new Connection().getDatabase();

        // check if email already exist
        const userExist = await db("users")
            .select("email")
            .where({ email })
            .returning("*");

        let payload;

        if (!userExist[0]) {
            // create user
            const createdUserArray = await db("users")
                .insert({
                    email,
                    name: given_name || "",
                    surname: family_name || "",
                    account_photo_url: picture,
                })
                .returning("*");

            const createdUser = createdUserArray[0];
            // create payload for JWT token
            payload = {
                id: createdUser.id,
                email: createdUser.email,
                createdAt: createdUser.created_at,
            };
        }
        if (!payload) {
            const existingUserArray = await db("users")
                .select("*")
                .where({ email: email })
                .returning("*");
            const existingUser = existingUserArray[0];
            payload = {
                id: existingUser.id,
                email: existingUser.email,
                createdAt: existingUser.created_at,
            };
        }

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
            sameSite: "none",
        });
        console.log("callback2: ", cookie);

        res.setHeader("Set-Cookie", cookie);
        return res.redirect(302, `${process.env.HOST}/`);
        // // setup cookie in response header
        // res.setHeader("Set-Cookie", cookie);

        // // write redirection to /
        // res.writeHead(302, { Location: "/" });
        // res.send();
    } catch (e) {
        console.log(e);
        db && db.destroy();
        res.writeHead(302, { Location: "/?error=true" });
        res.send();
    }
}
