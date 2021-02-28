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

    createTableEvents() {
        return this.db.schema
            .createTable("events", (table) => {
                table.increments("id");
                table
                    .integer("user_id")
                    .unsigned()
                    .references("users.id")
                    .onDelete("CASCADE");
                table.text("description");
                table.string("minute");
                table.string("hour");
                table.string("day");
                table.string("month");
                table.string("year");
                table.timestamp("created_at").defaultTo(this.db.fn.now());
            })
            .then((data) => data)
            .catch((e) => console.log(e));
    }

    createTableMembers() {
        return this.db.schema.createTable("members", (table) => {
            table.increments("id");
            table
                .integer("user_id")
                .unsigned()
                .references("users.id")
                .onDelete("CASCADE");
            table.string("full_name");
            table.string("email");
            table.timestamp("created_at").defaultTo(this.db.fn.now());
        });
    }

    createTableSchedules() {
        return this.db.schema.createTable("schedules", (table) => {
            table.increments("id");
            table
                .integer("member_id")
                .unsigned()
                .references("members.id")
                .onDelete("CASCADE");
            table.string("week_number").defaultTo("0");
            table.text("schedule");
            table.timestamp("created_at");
        });
    }
}

export const db = new Connection().getDatabase();
