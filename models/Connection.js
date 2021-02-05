import knex from "knex";

export default class Connection {
    constructor() {
        this.db = knex({
            client: "pg",
            connection: process.env.DB_CONNECTION_STRING,
        });
    }

    getDatabase() {
        return this.db;
    }
}

export const db = new Connection().getDatabase();
