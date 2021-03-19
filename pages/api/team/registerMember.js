import Connection from "../../../database";
import { validateText } from "../../../validations";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    if (decoded.error) {
        return res.status(403).json({
            error: "Not authorized.",
        });
    }

    const { fullName, email, schedule } = req.body;
    if (!fullName || !schedule) {
        return res.status({
            error:
                "Missing fields. Please check the schedule and name and try again.",
        });
    }

    try {
        // create connection with database
        const db = new Connection().getDatabase();

        const newMember = await db("members")
            .insert({
                user_id: decoded.id,
                full_name: fullName,
                email: email,
            })
            .returning("*");
        const newSchedule = await db("schedules")
            .insert({
                member_id: newMember[0].id,
                week_number: schedule.week_number,
                schedule: schedule.schedule,
            })
            .returning("*");
        //grab again updated members
        let members = await db("members")
            .select("*")
            .where({ user_id: decoded.id })
            .orderBy("created_at", "asc");

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

        res.status(200).json({
            members: members,
        });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.error(e);
        return res.status({ error: "Something went wrong" });
    }
}
