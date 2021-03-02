import { db } from "../../../database";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);

    try {
        // delete post
        await db("members")
            .where({ id: req.query.id, user_id: decoded.id })
            .del();

        // grab updated posts
        let members = await db("members")
            .select("*")
            .where({ user_id: decoded.id });

        // create helper function to append schedules to members
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
        // send updated members
        res.status(200).json({ members: members });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
