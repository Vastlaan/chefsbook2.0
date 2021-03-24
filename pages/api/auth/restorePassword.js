import Connection from "../../../database";
import bcrypt from "bcrypt";
import generator from "generate-password";

export default async function handler(req, res) {
    const { email } = req.body;

    const db = new Connection().getDatabase();

    try {
        const userIdArray = await db("users").select("id").where({ email });

        if (userIdArray.length === 0) {
            db.destroy();
            return res.status(400).json({
                type: "error",
                field: "email",
                message: "This e-mail address is not registered",
            });
        }
        const userId = userIdArray[0].id;

        if (!userId) {
            db.destroy();
            return res.status(400).json({
                type: "error",
                field: "email",
                message: "This e-mail address is not registered",
            });
        }

        const password = generator.generate({
            length: 10,
            numbers: true,
        });

        const mail = {
            title: "Chefsbook password restore",
            recipients: email,
            body: `Hi there!
Hereby your new password: ${password} .
From this moment you can login with this password.
We recommend to change it anyway in the settings after logging in.`,
        };

        const response = await fetch(
            `${process.env.HOST}/api/mail/sendRestoredPassword`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mail),
            }
        );

        const data = await response.json();

        if (data.error) {
            db.destroy();
            return res.status(400).json({
                type: "error",
                field: "email",
                message: "Could not send an email",
            });
        }

        // hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        // update password in database
        await db("users").where({ id: userId }).update({ password: hash });

        res.status(200).json({ success: "Success" });

        db.destroy();
    } catch (e) {
        console.error(e);
        res.status(400).json({
            type: "error",
            field: "email",
            message: "Something went wrong",
        });

        db.destroy();
    }
}
