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

    createTableUsers() {
        return this.db.schema
            .createTable("users", (table) => {
                table.increments("id");
                table.string("email");
                table.string("password");
                table.string("google_id");
                table.string("name");
                table.string("surname");
                table.string("account_photo_url");
                table.string("background_photo_url");
                table.timestamp("created_at").defaultTo(this.db.fn.now());
                table.boolean("enabled").defaultTo(true);
            })
            .then((result) => result)
            .catch((e) => e);
    }
    createTablePosts() {
        return this.db.schema
            .createTable("posts", (table) => {
                table.increments("id");
                table
                    .integer("user_id")
                    .unsigned()
                    .references("users.id")
                    .onDelete("CASCADE");
                table.string("title");
                table.text("text");
                table.string("photo_url");
                table.integer("likes");
                table.timestamp("created_at").defaultTo(this.db.fn.now());
            })
            .then((result) => result)
            .catch((e) => e);
    }
    createTableRecipes() {
        return this.db.schema
            .createTable("recipes", (table) => {
                table.increments("id");
                table
                    .integer("user_id")
                    .unsigned()
                    .references("users.id")
                    .onDelete("CASCADE");
                table.string("name");
                table.text("description");
                table.string("photo_url");
                table.text("ingredients");
                table.string("time");
                table.integer("likes");
                table.timestamp("created_at").defaultTo(this.db.fn.now());
            })
            .then((result) => result)
            .catch((e) => e);
    }
}

export const db = new Connection().getDatabase();
