const host = process.env.DB_HOST || "localhost";
const database = process.env.DB_NAME || "quotes_api";
const username = process.env.DB_USERNAME || "postgres";
const password = process.env.DB_PASSWORD || "postgres";

module.exports = {
    "development" : {
        "dialect": "postgres",
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "port": 5432,
        "ssl": false
    },
};

