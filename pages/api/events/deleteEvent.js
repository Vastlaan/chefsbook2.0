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

    // create connection with database
    const db = new Connection().getDatabase();

    const { id } = req.query;

    try {
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

        res.status(200).json({ events: updatedEvents });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.error(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
