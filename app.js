const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser);






module.exports = app;
