import { db } from "../../../database";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);

    const { id } = req.query;

    await db("events")
        .where({
            id,
            user_id: decoded.id,
        })
        .del();
    // grab updated events
    const updatedEvents = await db("events")
        .select("*")
        .where({ user_id: decoded.id })
        .orderBy("year", "asc")
        .orderBy("month", "asc")
        .orderBy("day", "asc");

    // send updated events
    console.log(updatedEvents);
    res.status(200).json({ events: updatedEvents });
}
