import Connection from "../../../database";
import checkCookie from "../../../utils/checkCookie";
import { serialize } from "cookie";

export default async function handler(req, res) {
    const decoded = checkCookie(req, res);

    if (decoded.error) {
        return res.status(400).json({ error: "Not authorized" });
    }

    const db = new Connection().getDatabase();

    try {
        const { id } = decoded;

        await db("users").where({ id }).delete();

        // destroy cookie
        const cookie = serialize(process.env.TOKEN_NAME, "", {
            maxAge: -1,
            path: "/",
        });

        res.setHeader("Set-Cookie", cookie);

        res.status(200).json({ success: "Successfuly deleted account" });
        db.destroy();
    } catch (e) {
        console.error(e);
        db && db.destroy();
        res.status(400).json({ error: "Something went wrong" });
    }
}
