import request from "supertest";

describe("/api/login", () => {
    it("Tries to login with existing credentials", async (done) => {
        const email = "test@test.com";
        const password = "Pass1234";

        const response = await request("http://localhost:3000")
            .post("/api/auth/login")
            .send({ email, password })
            .expect(201);
        expect(response.body.user.email).toEqual("test@test.com");

        done();
    });

    it("Tries to login with wrong email", async (done) => {
        const email = "tamagoci@test.com";
        const password = "Pass1234";

        const response = await request("http://localhost:3000")
            .post("/api/auth/login")
            .send({ email, password })
            .expect(400);

        expect(response.body.type).toEqual("error");

        done();
    });

    it("Tries to login with wrong password", async (done) => {
        const email = "test@test.com";
        const password = "Pass1237";

        const response = await request("http://localhost:3000")
            .post("/api/auth/login")
            .send({ email, password })
            .expect(400);
        expect(response.body.type).toEqual("error");

        done();
    });
    it("Tries to login without credentials", async (done) => {
        const response = await request("http://localhost:3000")
            .post("/api/auth/login")
            .expect(400);
        expect(response.body.type).toEqual("error");

        done();
    });
});
