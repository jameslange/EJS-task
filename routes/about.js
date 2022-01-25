const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("mainTemplate", {
    title: "about Page",
    content: "about",
  });
});

module.exports = route;
