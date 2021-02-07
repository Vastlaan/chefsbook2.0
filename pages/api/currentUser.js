import jwt from "jsonwebtoken";

function sendError200(res, e) {
    return res.status(200).json({
        error: "You need to log in to access the application",
    });
}

export default async function handler(req, res) {
    // check if there is a token
    if (!req.headers.authorization) {
        return sendError200(res);
    }
    // grab the token
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return sendError200(res);
    }

    // check if token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return sendError200(res);
        }

        const { id, email, createdAt } = decoded;
        console.log(id, email.createdAt);

        res.status(200).json({
            user: { id, email, createdAt },
        });
    } catch (error) {
        return sendError200(res, error);
    }
}
