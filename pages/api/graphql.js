import { db } from "../../models/Connection";

export default async (req, res) => {
    const users = await db.select("*").from("users");

    res.status(200).json(users);
};
