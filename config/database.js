const db = require('../models');

const connectToDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await db.sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connectToDatabase;