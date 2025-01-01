const express = require("express");
const route = express.Router();
const newsController = require("../controllers/newsController");

route.get("/articles", newsController.allArticles);
route.get("/category/:category", newsController.getByCategory);
route.get("/latest", newsController.getLatest);
module.exports = route; 