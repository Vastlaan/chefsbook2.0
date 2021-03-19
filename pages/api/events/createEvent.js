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

    // create connection with database
    const db = new Connection().getDatabase();
    try {
        const { year, month, day, hour, minute, description } = req.body;

        const result = await db("events")
            .insert({
                user_id: decoded.id,
                year,
                month,
                day,
                hour,
                minute,
                description,
            })
            .returning("*");

        res.status(200).json({ event: result[0] });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
