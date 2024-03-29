import Connection from "../../../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { DateTime } from "luxon";

export default async function handler(req, res) {
    const db = new Connection().getDatabase();

    const { email, password } = req.body;

    try {
        // get the user as array
        const userArray = await db("users").where({ email });
        // retrive the user
        const user = userArray[0];
        if (!user) {
            db.destroy();
            return res.status(400).json({
                type: "error",
                field: "email",
                message: "Wrong credentials",
            });
        }
        // get users hash
        const hash = user.password;
        // if doesn't exist send error response
        if (!hash) {
            db.destroy();
            return res.status(400).json({
                type: "error",
                field: "password",
                message: "Wrong credentials",
            });
        }
        // check if password is valid
        const isValid = await bcrypt.compare(password, hash);
        // if not valid send error response
        if (!isValid) {
            db.destroy();
            return res.status(400).json({
                type: "error",
                field: "password",
                message: "Wrong credentials",
            });
        }
        // setup payload for JWT token
        const payload = {
            id: user.id,
            email: user.email,
            createdAt: user.created_at,
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
        // get other user data
        const otherUserData = await db("users")
            .select(
                "name",
                "surname",
                "account_photo_url",
                "background_photo_url"
            )
            .where({ id: user.id });

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
        // get user events
        const events = await db("events")
            .select("*")
            .where({ user_id: user.id })
            .orderBy("year", "asc")
            .orderBy("month", "asc")
            .orderBy("day", "asc");
        // get preparations list
        const preparations = await db("preparations")
            .select("*")
            .where({ user_id: user.id })
            .orderByRaw("year::int ASC")
            .orderByRaw("month::int ASC")
            .orderByRaw("day::int ASC");
        // get members created by user
        let members = await db("members")
            .select("*")
            .where({ user_id: user.id });

        // create helper function to append schedules to members - later move to utils
        async function appendSchedules(members) {
            return Promise.all(
                members.map(async (member) => {
                    const schedules = await db("schedules")
                        .select("*")
                        .where({ member_id: member.id });
                    member.schedules = schedules;
                    return member;
                })
            );
        }
        // append schedules to members
        members = await appendSchedules(members);

        res.status(201).json({
            user: {
                ...{ ...payload, created_at: payload.createdAt },
                ...otherUserData[0],
                ...{ posts: posts },
                ...{ recipes: recipes },
                ...{ events: events },
                ...{ members: members },
                ...{ preparations: preparations },
            },
        });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.error(e);
        return res.status(400).json({
            type: "error",
            field: "password",
            message: "Something went wrong",
        });
    }
}
