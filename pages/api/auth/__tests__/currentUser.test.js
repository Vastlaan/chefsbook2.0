import request from "supertest";
import { signup } from "../../../../test/setup";

describe("/api/currentUser", () => {
    it("Check if the current user is returned with the appropriate email", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .get("/api/auth/currentUser")
            .set("set-cookie", cookie)
            .send()
            .expect(200);
        expect(response.body.user.email).toEqual("test@test.com");

        done();
    });

    it("Check if the error is returned if there is no cookie provided", async (done) => {
        const response = await request("http://localhost:3000")
            .get("/api/auth/currentUser")
            .send()
            .expect(400);
        expect(response.body.error).toEqual(
            "You need to log in to access the application"
        );
        done();
    });

    it("Check if the error is returned if provided cookie is not valid", async (done) => {
        const response = await request("http://localhost:3000")
            .get("/api/auth/currentUser")
            .set("set-cookie", "randomcookiewhich77isnot00valid")
            .send()
            .expect(400);
        expect(response.body.error).toEqual(
            "You need to log in to access the application"
        );
        done();
    });
});
