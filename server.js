//import routes
let routes = require("./controllers/appController");
const express = require('express')

let PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set Handlebars
let exphbs = require("express-handlebars");
//set Handlebars default layout to main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});