import jwt from "jsonwebtoken";
import Connection from "../../../database";
import { parse } from "cookie";

function sendError(res, e) {
    return res.status(400).json({
        error: "You need to log in to access the application",
    });
}

export default async function handler(req, res) {
    const db = new Connection().getDatabase();

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

        const { id, email, createdAt } = decoded;

        // get other user data
        const otherUserData = await db("users")
            .select(
                "name",
                "surname",
                "account_photo_url",
                "background_photo_url"
            )
            .where({ id: id });
        if (!otherUserData) {
            return sendError(res);
        }
        const {
            name,
            surname,
            account_photo_url,
            background_photo_url,
        } = otherUserData[0];
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
        // get user events
        const events = await db("events")
            .select("*")
            .where({ user_id: id })
            .orderBy("year", "asc")
            .orderBy("month", "asc")
            .orderBy("day", "asc");
        // get members created by user
        let members = await db("members")
            .select("*")
            .where({ user_id: id })
            .orderBy("created_at", "asc");

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

        // get preparations list
        const preparations = await db("preparations")
            .select("*")
            .where({ user_id: id })
            .orderByRaw("year::int ASC")
            .orderByRaw("month::int ASC")
            .orderByRaw("day::int ASC");

        // close db connection
        await // send all user created data to the frontend
        res.status(200).json({
            user: {
                id,
                name,
                surname,
                email,
                created_at: createdAt,
                account_photo_url,
                background_photo_url,
                posts,
                recipes,
                events,
                members,
                preparations,
            },
        });
        db.destroy();
    } catch (error) {
        db && db.destroy();
        console.error(error);
        return sendError(res, error);
    }
}
