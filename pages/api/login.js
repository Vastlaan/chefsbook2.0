import { db } from "../../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const { email, password } = req.body;

    try {
        const userArray = await db("users").where({ email });

        const user = userArray[0];

        const hash = user.password;

        if (!hash) {
            return res.status(400).json({ error: "Ups, Unable to log in" });
        }

        const isValid = await bcrypt.compare(password, hash);

        if (!isValid) {
            return res.status(400).json({ error: "Ach, Unable to log in" });
        }

        const payload = {
            id: user.id,
            email: user.email,
            createdAt: user.created_at,
        };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 * 30,
        });

        res.status(200).json({ token, user: payload });
    } catch (e) {
        return res.status(400).json({ error: "Hmm, Unable to log in" });
    }
}
