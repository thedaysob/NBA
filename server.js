const express = require('express')
const app = new express()
const path = require('path')
const cors = require('cors')
const fs = require('fs')
app.use(cors())

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 8888

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/static", express.static(path.resolve(__dirname, 'nbaAPI')));

app.get('/', async function(req, res) {
    await res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});