const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const database = require('./src/models/database');
database.connect();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
  
module.exports = app;