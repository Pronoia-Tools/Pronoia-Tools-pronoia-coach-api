const express = require('express');

const index = express.Router();

// Import routes

const register = require('./register');

// Create routing

index.use('/register', register)

module.exports = index;
