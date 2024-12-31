const express = require("express");
const authControllers = require("../controllers/authControllers");
const route = express.Router();

route.post("/signup", authControllers.signup);
route.post("/login", authControllers.login);

module.exports = route;