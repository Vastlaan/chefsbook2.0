import bcrypt from "bcrypt";
import User from "../../models/User";
import { db } from "../../database";
import { validateEmail, validatePassword } from "../../validations";

export default async function handler(req, res) {
    const { email, password } = JSON.parse(req.body);

    const isEmailValid = validateEmail(email);
    if (isEmailValid.type === "error") {
        res.status(400).json({ error: isEmailValid.message });
    }

    const isPasswordValid = validatePassword(password);
    if (isPasswordValid.type === "error") {
        res.status(400).json({ error: isPasswordValid.message });
    }

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
