//  DB Connetion
const { Sequelize } = require('sequelize');

// Connetion with sequelize to do tests
const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// DB connetion with more parameters
/* const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
}); */

db.sync()

module.exports = db;