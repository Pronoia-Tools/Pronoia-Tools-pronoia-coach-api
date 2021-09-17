const express = require("express");

const index = express.Router();

// Import routes

const register = require("./register");
const login = require("./login");
// Create routing

index.use("/register", register);
index.use("/login", login);

module.exports = index;
