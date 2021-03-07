export default async function checkIfAuthorized(ctx) {
    // check if there is cookie

    const { cookie } = ctx.req.headers;

    if (!cookie) {
        return { error: "Not Authorized" };
    }

    try {
        const res = await fetch(`${process.env.HOST}/api/auth/currentUser`, {
            headers: {
                "Set-Cookie": cookie,
            },
        });

        const data = await res.json();

        if (data.error) {
            return { error: "Not Authorized" };
        } else if (data.user) {
            return data.user;
        } else {
            return { error: "Something went wrong" };
        }
    } catch (e) {
        console.error(e);
        return { error: e.toString() };
    }
}
