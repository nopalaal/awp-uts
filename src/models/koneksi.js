const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});


// db.authenticate()
//   .then(() => console.log('Dbnya connect'))
//   .catch(err => console.error('ga konek konek', err));

module.exports = db;