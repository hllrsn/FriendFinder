// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Creates Express Server
var app = express();

// Sets initial Listener port
var PORT = process.env.PORT || 8080;

// Sets up Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
