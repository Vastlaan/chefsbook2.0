import Connection from "../../../database";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);

    // create connection with database
    const db = new Connection().getDatabase();

    const { id } = req.query;

    try {
        await db("preparations")
            .where({
                id,
                user_id: decoded.id,
            })
            .del();
        // grab updated preparations
        const updatedPreparations = await db("preparations")
            .select("*")
            .where({ user_id: decoded.id })
            .orderByRaw("year::int ASC")
            .orderByRaw("month::int ASC")
            .orderByRaw("day::int ASC");

        // send updated preparations

        res.status(200).json({ preparations: updatedPreparations });
        db.destroy();
    } catch (e) {
        db && db.destroy();
        console.error(e);
        res.status(400).json({ error: "Something went wrong" });
    }
}
