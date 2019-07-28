const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { facebook } = require('./services/login');
const { getPersonalGiftList, saveImages } = require('./services/personalgift');
const fs = require('fs');
const path = require('path');

fs.readFile('util/init_server.txt', 'utf8', function(err, contents) {
    console.log(contents);
});
//const { dbTest } = require('./db.js');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// For static files this configuration is required
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

/*app.get("/",function(res,resp){
  dbTest("João");
  resp.send("Hello my friends");
})*/

app.post("/facebook",facebook);
app.get("/getPersonalGiftList",getPersonalGiftList);

app.get("*",function(res,resp){
  resp.status(404);
  resp.send("This page does not exist.")
  console.log("Wrong page!");
  saveImages();
})

const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.info('Closing server');
  server.close(() => {
   console.log('Http server closed.');
  });
});
