const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

console.log('Environment:', env);
console.log('DB config:', config);

const db = new Sequelize(config.database, config.username, config.password, config);
// Optional: expose a quick test function if app.js expects it in the future
async function testConnection() {
  try {
    await db.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

module.exports = db;
module.exports.testConnection = testConnection;