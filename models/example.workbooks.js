const { DataTypes } = require('sequelize');
const db = require('../Database/db_connetion')

const Book = db.define('Book', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Book;