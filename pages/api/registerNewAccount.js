import bcrypt from "bcrypt";
import User from "../../models/User";
import { db } from "../../models/Connection";

export default async function handler(req, res) {
    const { email, password } = JSON.parse(req.body);

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User(email, hash);

        const createdUser = await db("users")
            .insert({
                ...user.getUser(),
            })
            .returning("*");

        return res.status(200).json({ user: createdUser });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ error: err });
    }
}
