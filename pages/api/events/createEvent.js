import { db } from "../../../database";
import { validateText } from "../../../validations";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    if (!decoded.id) {
        return res.status({ error: "Not authorized" });
    }

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
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
