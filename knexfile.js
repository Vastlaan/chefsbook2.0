module.exports = {
    development: {
        client: "pg",
        connection: process.env.DB_CONNECTION_STRING,
    },
    production: {
        client: "pg",
        connection: process.env.DB_CONNECTION_STRING,
    },
};
