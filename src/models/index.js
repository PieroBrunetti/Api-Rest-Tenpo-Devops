const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: (process.env.DEBUG_SEQUELIZE == "true") ? true: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.operation = require("../models/operation.model.js")(sequelize, Sequelize);

db.user.hasMany(db.operation, {});

db.operation.belongsTo(db.user, {});

module.exports = db;