import Connection from "../../../database";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    if (decoded.error) {
        return res.status(403).json({
            error: "Not authorized.",
        });
    }

    const { fullName, email, schedule, id, week } = req.body;

    if (!fullName || !schedule) {
        return res.status({
            error:
                "Missing fields. Please check the schedule and name and try again.",
        });
    }

    try {
        // create connection with database
        const db = new Connection().getDatabase();
        await db("members")
            .where({
                id: id,
            })
            .update({
                full_name: fullName,
                email: email,
            });

        const weekExists = await db("schedules")
            .select("week_number")
            .where({ week_number: week, member_id: id });

        if (weekExists.length > 0) {
            await db("schedules")
                .where({
                    member_id: id,
                    week_number: week,
                })
                .update({
                    schedule: schedule,
                });
        } else {
            await db("schedules").insert({
                member_id: id,
                week_number: week,
                schedule: schedule,
            });
        }

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
        db.destroy();
        console.error(e);
        return res.status(400).json({ error: "Something went wrong" });
    }
}
