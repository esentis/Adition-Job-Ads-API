var express = require('express');
var ads = require('./controllers/adController.js');
var bodyParser = require('body-parser');
require('./db_connection.js');

const app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use('/ads', jsonParser, ads);

app.listen(3000, function () {
    console.log("Express server listening on port ", 3000);
});


module.exports = app;