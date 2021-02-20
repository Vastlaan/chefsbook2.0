import request from "supertest";
import { signup } from "../../../../test/setup";
import currentUser from "../currentUser";

describe("/api/currentUser", () => {
    it("Check if the current user is returned with the appropriate email", async () => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .get("/api/auth/currentUser")
            .set("set-cookie", cookie)
            .send()
            .expect(200);
        expect(response.body.user.email).toEqual("test@test.com");
    });
});
