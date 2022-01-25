const express = require("express");
const app = express();
const fs = require("fs");
const logger = require("morgan");
const { log } = require("console");
const Home = require("./routes/home");
const About = require("./routes/about");
const Products = require("./routes/products");
const path = require("path");

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/bootstrap", express.static(path.join(__dirname, "/node_modules/bootstrap")));
app.use("/jquery", express.static(path.join(__dirname, "/node_modules/jquery")));
app.use(logger("dev"));
/**
 * 1- the project should has:
 *  a- views (folder)
 *      1- partials (folder)
 *          a- cssLinks.ejs
 *          b- jsLinks.ejs
 *          c- navbar.ejs
 *          d- footer.ejs
 *      2- content (folder)
 *          e- home.ejs
 *          f- about.ejs
 *          g- products.ejs
 *          h- product.ejs
 *      3- mainTemplate.ejs
 *  b- routes (folder)
 *      1- home.js
 *      2- products.js
 *      3- about.js
 *  c- public (folder)
 *      1- css (folder)
 *          a- style.css
 *      2- js (folder)
 *          a- script.js
 *      3- images (folder)
 *  d- data (folder)
 *      products.json
 *
 * 2- create Server using express
 * 3- set accessble public folder and include bootstrap
 * 4- set the view engine ejs
 *
 * 6- make the following routes
 *      a- "/" home
 *      b- "/about" about
 *      c- "/products" products
 */
app.use("/", Home);
app.use("/about", About);
app.use("/products", Products);

app.get("/", (req, res) => {});

app.get("/about", (req, res) => {});

app.get("/products", (req, res) => {
  fs.readFile("./data/products.json", (error, data) => {
    if (error) {
      res.render("index", {
        title: "error",
        dark: req.query.dark === "true" ? true : false,
        content: "Internal Server Error",
        data: null,
      });
    } else {
      res.render("product", {
        title: "error",
        data: JSON.parse(data.toString()),
      });
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`the server is running on port ${app.get("port")}`);
});
