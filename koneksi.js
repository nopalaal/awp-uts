const { Sequelize } = require('sequelize');


const db = new Sequelize('mudjarap', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  port: 3310,
});


// db.authenticate()
//   .then(() => console.log('Dbnya connect'))
//   .catch(err => console.error('ga konek konek', err));

  module.exports = db;