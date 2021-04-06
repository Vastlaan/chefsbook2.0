import request from "supertest";
import { signup } from "../../../../test/setup";

describe("/api/events/", () => {
    let eventId;

    it("Tests if event is created properly with valid credentials", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "2021",
                month: "4",
                day: "30",
                hour: "10",
                minute: "15",
                description: "dummy description",
            })
            .expect(200);

        expect(response.body.event.id).toBeDefined();
        eventId = response.body.event.id;
        done();
    });

    it("Tests if the newly created event is properly deleted", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .get(`/api/events/deleteEvent?id=${eventId}`)
            .set("cookie", cookie)
            .expect(200);

        expect(Array.isArray(response.body.events)).toBe(true);
        done();
    });

    it("Tests if event is not created with missing filed", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({})
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });

    it("Tests if event is not created with wrong year", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "202",
                month: "4",
                day: "30",
                hour: "10",
                minute: "15",
                description: "dummy description",
            })
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });

    it("Tests if event is not created with wrong month", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "2021",
                month: "14",
                day: "30",
                hour: "10",
                minute: "15",
                description: "dummy description",
            })
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });

    it("Tests if event is not created with wrong day", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "2021",
                month: "4",
                day: "32",
                hour: "10",
                minute: "15",
                description: "dummy description",
            })
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });

    it("Tests if event is not created with wrong hour", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "2021",
                month: "4",
                day: "30",
                hour: "34",
                minute: "15",
                description: "dummy description",
            })
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });
    it("Tests if event is not created with wrong minute", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "2021",
                month: "4",
                day: "30",
                hour: "10",
                minute: "115",
                description: "dummy description",
            })
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });
    it("Tests if event is not created with missing description", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/events/createEvent")
            .set("cookie", cookie)
            .send({
                year: "2021",
                month: "4",
                day: "30",
                hour: "10",
                minute: "15",
                description: "",
            })
            .expect(400);

        expect(response.body.error).toEqual(
            "Invalid request. Missing or unpropriate fields"
        );

        done();
    });
});
