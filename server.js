// Sets up the Express App
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}))

// parse application/json
app.use(bodyParser.json())

require("./app/routing//apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
})
