import request from "supertest";

describe("Create and delete an Account", () => {
    it("Test if account creation rejected by user exists exception", async (done) => {
        const response = await request("http://localhost:3000")
            .post("/api/auth/registerNewAccount")
            .send({ email: "test@test.com", password: "Pass1234" })
            .expect(409);

        expect(response.body.type).toEqual("error");

        done();
    });

    it("Test if account creation rejected due to not valid password", async (done) => {
        const response = await request("http://localhost:3000")
            .post("/api/auth/registerNewAccount")
            .send({ email: "test1@test.com", password: "notvalid" })
            .expect(400);

        expect(response.body.type).toEqual("error");

        done();
    });

    it("Test if account creation rejected due to not valid email", async (done) => {
        const response = await request("http://localhost:3000")
            .post("/api/auth/registerNewAccount")
            .send({ email: "test1testcom", password: "Pass1234" })
            .expect(400);

        expect(response.body.type).toEqual("error");

        done();
    });

    it("Test if account created with proper credetials and then properly deleted", async (done) => {
        const email = "test1@test.com";
        const password = "Pass1234";

        const response = await request("http://localhost:3000")
            .post("/api/auth/registerNewAccount")
            .send({ email, password })
            .expect(200);

        expect(response.body.user.email).toEqual(email);
        // expect(response.user.id).toBeTruthy();

        const cookie = response.headers["set-cookie"][0];

        const responseDelete = await request("http://localhost:3000")
            .post("/api/auth/deleteAccount")
            .set("Cookie", cookie)
            .send()
            .expect(200);

        expect(responseDelete.body.success).toEqual(
            "Successfuly deleted account"
        );

        done();
    });
});
