var express = require('express');
var index = express.Router();

// Import routes

var test = require('./test');

// Create routing

index.use('/test', test)

module.exports = index;
