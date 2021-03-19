import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default function checkCookie(req, res) {
    const cookie = req.headers.cookie;

    if (!cookie) {
        return { error: "Not Authorized" };
    }

    const token = parse(cookie)[process.env.TOKEN_NAME];

    if (!token) {
        return { error: "Not Authorized" };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.email) {
        return { error: "Not Authorized" };
    }
    return decoded;
}
