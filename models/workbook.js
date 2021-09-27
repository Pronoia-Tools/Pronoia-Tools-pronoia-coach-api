const { DataTypes } = require('sequelize');
const db = require('../config/db')

const Workbook = db.define('Workbook', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  edition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  language: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  }
});


module.exports = Workbook;