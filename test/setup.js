import request from "supertest";

export async function signup() {
    const email = "test@test.com";
    const password = "Pass1234";

    const response = await request("http://localhost:3000")
        .post("/api/auth/login")
        .send({ email, password })
        .expect(201);
    const cookie = response.get("Set-Cookie");
    return cookie;
}
