import Database from "../../database";

export default async (req, res) => {
    const db = new Database();
    //const resultOfCreatingUsersTable = await  db.createTableUsers();
    // const resultOfCreatingPostsTable = await  db.createTablePosts();
    // const resultOfCreatingRecipesTable = await  db.createTableRecipes();
    // const resultOfCreatingEventsTable = await db.createTableEvents();
    // const resultOfCreatingMembersTable = await db.createTableMembers();
    const resultOfCreatingSchedulesTable = await db.createTableSchedules();

    //const users = await db.select("*").from("users");

    res.status(200).json({ resultOfCreatingSchedulesTable });
};
