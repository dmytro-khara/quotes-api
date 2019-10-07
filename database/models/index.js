const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const db = {};

const config = require('../config/config.js')[process.env.NODE_ENV];
config.host = process.env.DB_HOST || config.host;
config.database = process.env.DB_NAME || config.database;
config.username = process.env.DB_USERNAME || config.username;
config.password = process.env.DB_PASSWORD || config.password;

const sequelize = config.use_env_variable
    ? new Sequelize(
        process.env[config.use_env_variable],
        config
    )
    : new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0
            && file !== basename
            && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = sequelize.import(
            path.join(__dirname, file)
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
