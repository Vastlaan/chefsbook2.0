import request from "supertest";
import { signup } from "../../../../test/setup";

describe("/api/recipes", () => {
    let id;

    it("Tests if recipe is properly created (without photo)", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/recipes/createRecipe")
            .set("cookie", cookie)
            .field("name", "Coca-cola")
            .field("description", "Some awesome text")
            .field("ingredients", JSON.stringify(["tomatos", "orange"]))
            .field("time", "5 min.")
            .expect(200);

        expect(Array.isArray(response.body.recipes)).toBe(true);

        id = response.body.recipes[0].id;

        done();
    });

    it("Tests if recipe is properly deleted", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .get(`/api/recipes/deleteRecipe?id=${id}`)
            .set("cookie", cookie)
            .expect(200);

        expect(Array.isArray(response.body.recipes)).toBe(true);

        done();
    });

    it("Tests if recipe is not created with invalid name", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/recipes/createRecipe")
            .set("cookie", cookie)
            .field("name", "")
            .field("description", "Some awesome text")
            .field("ingredients", JSON.stringify(["tomatos", "orange"]))
            .field("time", "5 min.")
            .expect(400);

        expect(response.body.error).toEqual("Data not valid");

        done();
    });

    it("Tests if recipe is not created with invalid description", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/recipes/createRecipe")
            .set("cookie", cookie)
            .field("name", "Coca-cola")
            .field("description", "")
            .field("ingredients", JSON.stringify(["tomatos", "orange"]))
            .field("time", "5 min.")
            .expect(400);

        expect(response.body.error).toEqual("Data not valid");

        done();
    });

    it("Tests if recipe is not created with invalid ingredients", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/recipes/createRecipe")
            .set("cookie", cookie)
            .field("name", "Coca-cola")
            .field("description", "Some awesome text")
            .field("ingredients", JSON.stringify([]))
            .field("time", "5 min.")
            .expect(400);

        expect(response.body.error).toEqual("Data not valid");

        done();
    });
    it("Tests if recipe is not created with invalid time", async (done) => {
        const cookie = await signup();

        const response = await request("http://localhost:3000")
            .post("/api/recipes/createRecipe")
            .set("cookie", cookie)
            .field("name", "Coca-cola")
            .field("description", "Some awesome text")
            .field("ingredients", JSON.stringify(["tomatos", "orange"]))
            .field("time", "")
            .expect(400);

        expect(response.body.error).toEqual("Data not valid");

        done();
    });
});
