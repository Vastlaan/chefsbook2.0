import { db } from "../../../database";
import { validateText } from "../../../validations";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    if (!decoded.id) {
        return res.status({ error: "Not authorized" });
    }
    const { fullName, email, schedule } = req.body;
    if (!fullName || !schedule) {
        return res.status({
            error:
                "Missing fields. Please check the schedule and name and try again.",
        });
    }

    try {
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

        res.status(200).json({
            member: newMember[0],
            schedule: newSchedule[0],
        });
    } catch (e) {
        console.error(e);
        return res.status({ error: "Something went wrong" });
    }
}
