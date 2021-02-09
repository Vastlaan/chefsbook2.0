export default async function checkIfAuthorized() {
    const token = window.localStorage.getItem("chefsbookJWTToken");
    if (!token) {
        return { error: "Not authorized" };
    }

    try {
        const res = await fetch("/api/currentUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (data.error) {
            return { error: "Not Authorized" };
        } else if (data.user) {
            return {
                type: "setUser",
                payload: data.user,
            };
        } else {
            return { error: "Something went wrong" };
        }
    } catch (e) {
        return { error: e };
    }
}
