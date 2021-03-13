import { oauth2Client } from "../../utils/googleClient";

export default function GoogleSignInPage() {
    return <div>...fetching Google Account</div>;
}

export function getServerSideProps() {
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

    return {
        redirect: {
            permanent: false,
            destination: `${url}`,
        },
    };
}
