import { oauth2Client } from "../../../utils/googleClient";

export default async function handler(req, res) {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ];
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "offline",
        scope: scopes,
    });
    console.log("googleSingIn", url);

    res.writeHead(302, { Location: `${url}` });
    res.send();
}
