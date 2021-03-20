import bcrypt from "bcrypt";
import Connection from "../../../database";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    const decoded = checkCookie(req, res);

    if (decoded.error) {
        return res.status(400).json({ error: "Not authorized" });
    }

    const { password, passwordNew, passwordNewRepeat } = req.body;

    console.log(password, passwordNew, passwordNewRepeat);

    const db = new Connection().getDatabase();

    try {
        // compare passwords

        // get the user as array
        const userArray = await db("users").where({ id: decoded.id });
        // retrive the user
        const user = userArray[0];
        if (!user) {
            db.destroy();
            return res.status(400).json({ error: "Wrong credentials" });
        }
        // get users hash
        const hashOld = user.password;
        // if doesn't exist send error response
        if (!hashOld) {
            db.destroy();
            return res.status(400).json({ error: "Wrong credentials" });
        }
        // check if password is valid
        const isValid = await bcrypt.compare(password, hashOld);
        // if not valid send error response
        if (!isValid) {
            db.destroy();
            return res.status(400).json({
                error: "Provided password doesn't match the old password",
            });
        }

        // hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(passwordNew, saltRounds);

        await db("users").where({ id: decoded.id }).update({ password: hash });

        db.destroy();

        res.status(200).json({
            success: "Password has been successfully updated",
        });
    } catch (e) {
        console.error(e);

        db && db.destroy();

        return res.status(400).json({
            error: "Something went wrong",
        });
    }
}
