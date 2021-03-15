import Connection from "../../database";

export default async (req, res) => {
    const db = new Connection();
    // const resultOfCreatingUsersTable = await db.createTableUsers();
    // const resultOfCreatingPostsTable = await db.createTablePosts();
    // const resultOfCreatingRecipesTable = await db.createTableRecipes();
    // const resultOfCreatingEventsTable = await db.createTableEvents();
    // const resultOfCreatingMembersTable = await db.createTableMembers();
    // const resultOfCreatingSchedulesTable = await db.createTableSchedules();
    // const resultOfCreatingPreparationsTable = await db.createTablePreparations();

    res.status(200).json({ message: "Success" });
    db.getDatabase().destroy();
};
