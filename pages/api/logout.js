import { serialize } from "cookie";

export default async function handler(req, res) {
    const cookie = serialize(process.env.TOKEN_NAME, "", {
        maxAge: -1,
        path: "/",
    });

    res.setHeader("Set-Cookie", cookie);
    res.writeHead(302, { Location: `${process.env.HOST}` });
    console.log("has been redirected");
    res.send();
}
