import { db } from "../../../database";
import { s3 } from "../../../s3";
import checkCookie from "../../../utils/checkCookie";

export default async function handler(req, res) {
    // authorize request
    const decoded = checkCookie(req, res);
    // delete post
    await db("posts").where({ id: req.query.id, user_id: decoded.id }).del();

    // delete photo if exists
    if (req.query.path) {
        const array = req.query.path.split(".com/");
        const key = `${array[1]}/${array[2]}`;
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };

        s3.deleteObject(params, function (error, data) {
            if (error) {
                res.status({ error: "Something went wrong" });
            }
            console.log("Successfully deleted file", data);
        });
    }

    // grab updated posts
    const updatedPosts = await db("posts")
        .select("*")
        .where({ user_id: decoded.id })
        .returning("*")
        .orderBy("created_at", "desc");
    // send updated posts
    res.status(200).json({ posts: updatedPosts });
}
