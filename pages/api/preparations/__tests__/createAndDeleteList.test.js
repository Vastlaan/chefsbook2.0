import { signup } from "../../../../test/setup";
import request from "supertest";

describe("/api/preparations/", () => {
    let id;

    it("Tests if preparation list is properly created, with valid fields", async (done) => {
        const cookie = await signup();
        const response = await request("http://localhost:3000")
            .post("/api/preparations/createList")
            .set("cookie", cookie)
            .send({
                list: JSON.stringify(["cut tomatos", "cut onions"]),
                year: 2021,
                month: 4,
                day: 11,
            })
            .expect(200);

        expect(Array.isArray(response.body.preparations)).toEqual(true);

        const lastIndex = response.body.preparations.length - 1;
        id = response.body.preparations[lastIndex].id;
        done();
    });

    it("Tests if newly created preparation list is properly deleted", async (done) => {
        const cookie = await signup();
        const response = await request("http://localhost:3000")
            .get(`/api/preparations/deleteList?id=${id}`)
            .set("cookie", cookie)
            .expect(200);

        expect(Array.isArray(response.body.preparations)).toEqual(true);

        done();
    });

    it("Tests if creating preparation list failed, with empty list", async (done) => {
        const cookie = await signup();
        const response = await request("http://localhost:3000")
            .post("/api/preparations/createList")
            .set("cookie", cookie)
            .send({
                list: JSON.stringify([]),
                year: 2021,
                month: 4,
                day: 11,
            })
            .expect(400);

        expect(response.body.error).toEqual("Fields not valid");

        done();
    });

    it("Tests if creating preparation list failed, with invalid year", async (done) => {
        const cookie = await signup();
        const response = await request("http://localhost:3000")
            .post("/api/preparations/createList")
            .set("cookie", cookie)
            .send({
                list: JSON.stringify(["cut tomatos", "cut onions"]),
                year: 20,
                month: 4,
                day: 11,
            })
            .expect(400);

        expect(response.body.error).toEqual("Fields not valid");

        done();
    });

    it("Tests if creating preparation list failed, with invalid month", async (done) => {
        const cookie = await signup();
        const response = await request("http://localhost:3000")
            .post("/api/preparations/createList")
            .set("cookie", cookie)
            .send({
                list: JSON.stringify(["cut tomatos", "cut onions"]),
                year: 2021,
                month: 0,
                day: 11,
            })
            .expect(400);

        expect(response.body.error).toEqual("Fields not valid");

        done();
    });

    it("Tests if creating preparation list failed, with invalid day", async (done) => {
        const cookie = await signup();
        const response = await request("http://localhost:3000")
            .post("/api/preparations/createList")
            .set("cookie", cookie)
            .send({
                list: JSON.stringify(["cut tomatos", "cut onions"]),
                year: 2021,
                month: 4,
                day: 1111,
            })
            .expect(400);

        expect(response.body.error).toEqual("Fields not valid");

        done();
    });
});
