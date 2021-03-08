import Connection from "../../../database";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);

    // create connection with database
    const db = new Connection().getDatabase();
    try {
        const { list, day, month, year } = req.body;

        await db("preparations")
            .insert({
                user_id: decoded.id,
                year,
                month,
                day,
                list,
            })
            .returning("*");
        const updatedPreparations = await db("preparations")
            .select("*")
            .where({ user_id: decoded.id })
            .orderByRaw("year::int ASC")
            .orderByRaw("month::int ASC")
            .orderByRaw("day::int ASC");

        res.status(200).json({ preparations: updatedPreparations });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
