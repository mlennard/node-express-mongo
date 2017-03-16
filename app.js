// This is the main file 
var express = require("express"), 
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

// Connection to MongoDB
var db;

if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

//Mongoose (ORM)
var Book = require('./models/bookModel');

//Express initialization
var app = express();

var port = process.env.PORT || 3000;

//Middleware indicating json will be exchanged
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// The routes definitions
var bookRouter = require("./Routes/bookRoutes")(Book);

// Express declaring routes to treat requests
app.use('/api/books', bookRouter);

// Default route to treat request on the '/' 
app.get('/', function(req, res){
    res.send("Welcome to my API");
});

app.listen(port, function(){
    console.log("Gulp is running my app on PORT: " + port);
});

module.exports = app;