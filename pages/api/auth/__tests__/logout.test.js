import request from "supertest";
import { parse } from "cookie";
import { signup } from "../../../../test/setup";

describe("/api/auth/logout", () => {
    it("Porperly logout user", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .get("/api/auth/logout")
            .set("set-cookie", cookie)
            .expect(200);

        expect(response.status).toEqual(200);

        done();
    });
});
