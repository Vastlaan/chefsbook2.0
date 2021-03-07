import knex from "knex";

const db = knex({
    client: "pg",
    connection: process.env.DB_CONNECTION_STRING,
});

export default (...args) => {
    return (fn) => async (req, res) => {
        if (req.db) {
            req.db.destroy();
        }
        req.db = db;
        await fn(req, res);
        await req.db.destroy();
        return;
    };
};
