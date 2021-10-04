const { application } = require('express');
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors')

app.use(cors())
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

app.get('/getRestaurantMenu',restaurantController.getRestaurantMenu);

app.post('/addDish',restaurantController.addDish);

app.put('/updateDish',restaurantController.updateDish);

app.get('/getRestaurantOrders',restaurantController.getRestaurantOrders);

app.post('/updateDeliveryStatus',restaurantController.updateDeliveryStatus);

app.get('/getOrderMenu',restaurantController.getOrderMenu);

app.put('/updateOrderStatus',restaurantController.updateOrderStatus);

app.get('/getCustomerProfile',restaurantController.getCustomerProfile);

app.get('/getCustomerOrders',customerController.getCustomerOrders);

app.post('/placeCustomerOrder',customerController.placeCustomerOrder);

app.post('/updateCustomerProfile',customerController.updateCustomerProfile);

app.post('/addToFavourites',customerController.addToFavourites);

app.get('/getFavouriteRestaurants',customerController.getFavouriteRestaurants);

app.get('/getRestaurantOnSearch',restaurantSearchController.getRestaurantBasedOnLocation);

app.get('/getRestaurants',restaurantSearchController.getRestaurants);

app.post('/addAddress',customerController.addAddress);

app.get('/getAddress',customerController.getAddress);




var server = app.listen(3001, function () {
    console.log("Server listening on port 3001");
});