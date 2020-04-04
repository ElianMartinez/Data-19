require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
var viewsRutes = require('./rutes/views.js')
const ejs = require('ejs');
const morgan = require('morgan');
const db = require('./controllers/db');
const record = require('./models/record');
//setters and use
app.use(morgan("tiny"))
app.set("port",3001 || process.env.PORT);
app.set("view engine","ejs")
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set("/views",path.join(__dirname, 'views'))
app.use(express.urlencoded())

//imported routes
app.use('/',viewsRutes)

//server listen
app.listen(app.get("port"),function() {
  console.log("server on port "+app.get("port"));
})
