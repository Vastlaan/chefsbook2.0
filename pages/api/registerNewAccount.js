import bcrypt from "bcrypt";
import User from "../../models/user";

export default function handler(req, res) {
    const { email, password } = JSON.parse(req.body);
    console.log(email, password);

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            return res.status(200).json({ name: "John Doe" });
        } else {
            const user = new User(email, hash);
            console.log(user.registerMe());
            return res.status(200).json({ name: "John Doe" });
        }
    });
}
