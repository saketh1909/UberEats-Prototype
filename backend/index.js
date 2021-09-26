const { application } = require('express');
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
const customerController = require('./controller/CustomerController');
const restaurantController= require('./controller/restaurantController');
app.post('/customerLogin',customerController.customerLogin);

app.post('/customerSignup',customerController.customerSignup);

app.post('/restaurantLogin',restaurantController.restaurantLogin);

app.post('/restaurantSignup',restaurantController.restaurantSignup);

app.get('/restaurantProfile',restaurantController.restaurantProfile);

app.post('/updateRestaurantProfile',restaurantController.updateRestaurantProfile);

app.post('/addDish',restaurantController.addDish);



var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});