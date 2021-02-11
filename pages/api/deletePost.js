import { db } from "../../database";
import checkCookie from "../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    // delete post
    await db("posts").where({ id: req.query.id, user_id: decoded.id }).del();
    // grab updated posts
    const updatedPosts = await db("posts")
        .select("*")
        .where({ user_id: decoded.id })
        .returning("*");
    // send updated posts
    res.status(200).json({ posts: updatedPosts });
}
