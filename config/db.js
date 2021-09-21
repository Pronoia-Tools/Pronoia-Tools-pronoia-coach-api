//  DB Connetion
const { Sequelize } = require('sequelize');
const config = require('./config');

// Connetion with sequelize to do tests
const db = new Sequelize(config.db_settings);

// DB connetion with more parameters
/* const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
}); */

db.sync()

module.exports = db;