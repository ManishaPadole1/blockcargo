var express = require("express");
var app = express();
var path=require("path");
var port = 8080;
var api =require('./router/api');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"dist")));
app.use('/',express.static(path.join(__dirname,"dist")));
app.use('/api',api);

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
