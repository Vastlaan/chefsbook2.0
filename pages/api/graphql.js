import Database from "../../database";

export default async (req, res) => {
    const db = new Database();
    //const resultOfCreatingUsersTable = db.createTableUsers();
    const resultOfCreatingPostsTable = db.createTablePosts();
    const resultOfCreatingRecipesTable = db.createTableRecipes();

    //const users = await db.select("*").from("users");

    res.status(200).json(resultOfCreatingRecipesTable);
};
