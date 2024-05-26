const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host:process.env.DB_HOST,
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Monitor=require('./monitorData')(sequelize,Sequelize.DataTypes)

module.exports = db;