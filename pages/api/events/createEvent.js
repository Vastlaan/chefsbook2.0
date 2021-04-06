import Connection from "../../../database";
import { validateAllFields } from "../../../validations";
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

    const areAllFieldsValid = validateAllFields(req.body);

    if (!areAllFieldsValid) {
        return res.status(400).json({
            error: "Invalid request. Missing or unpropriate fields",
        });
    }

    const { year, month, day, hour, minute, description } = req.body;

    try {
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
