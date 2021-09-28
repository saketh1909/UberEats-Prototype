const { application } = require('express');
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');

//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
const customerController = require('./controller/CustomerController');
const restaurantController= require('./controller/restaurantController');
const restaurantSearchController=require('./controller/RestaurantSearchController');
app.post('/customerLogin',customerController.customerLogin);

app.post('/customerSignup',customerController.customerSignup);

app.post('/restaurantLogin',restaurantController.restaurantLogin);

app.post('/restaurantSignup',restaurantController.restaurantSignup);

app.get('/restaurantProfile',restaurantController.restaurantProfile);

app.post('/updateRestaurantProfile',restaurantController.updateRestaurantProfile);

app.post('/addDish',restaurantController.addDish);

app.get('/getOrders',restaurantController.getOrders);

app.put('/updateOrderStatus',restaurantController.updateOrderStatus);

app.get('/getCustomerProfile',restaurantController.getCustomerProfile);

app.post('/updateCustomerProfile',customerController.updateCustomerProfile);

app.post('/addToFavourites',customerController.addToFavourites);

app.get('/getFavouriteRestaurants',customerController.getFavouriteRestaurants);

app.get('/getRestaurantOnSearch',restaurantSearchController.getRestaurantBasedOnLocation);

app.get('/getRestaurants',restaurantSearchController.getRestaurants);

app.post('/addAddress',customerController.addAddress);

app.get('/getAddress',customerController.getAddress);

app.get('/getOrderDetails',restaurantSearchController.getOrderDetails);



var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});