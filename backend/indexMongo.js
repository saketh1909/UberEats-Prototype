var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const customerController=require('./mongodb/controller/customerController');
const restaurantController=require('./mongodb/controller/restaurantController');
const restaurantSearchController = require('./mongodb/controller/restaurantSearchController');
const { checkAuth } = require("./Utils/passport");
const { auth } = require("./Utils/passport");
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const { mongoDB } = require('./mongoConfig');
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        auth();
        console.log(`MongoDB Connected`);
    }
});

//Route to handle Post Request Call
//Customer Apis
app.post('/customerLogin',customerController.customerLogin);
app.post('/customerSignup',customerController.customerSignup);
app.post('/updateCustomerProfile',checkAuth,customerController.updateCustomerProfile);
app.post('/addToFavourites',checkAuth,customerController.addToFavourites);
app.get('/getFavouriteRestaurants',checkAuth,customerController.getFavouriteRestaurants);
app.post('/addAddress',checkAuth,customerController.addAddress);
app.get('/getAddress',checkAuth,customerController.getAddress);
app.post('/placeCustomerOrder',checkAuth,customerController.placeCustomerOrder);
app.get('/getCustomerOrders',checkAuth,customerController.getCustomerOrders);
app.put('/cancelCustomerOrder',checkAuth,customerController.cancelCustomerOrder);

//Restaurant Search Apis
app.get('/getRestaurants',checkAuth,restaurantSearchController.getRestaurants);
app.get('/getRestaurantOnSearch',checkAuth,restaurantSearchController.getRestaurantBasedOnSearch);
//Restaurant Apis
app.post('/restaurantSignup',restaurantController.restaurantSignup);
app.post('/restaurantLogin',restaurantController.restaurantLogin);
app.get('/restaurantProfile',checkAuth,restaurantController.restaurantProfile);
app.post('/updateRestaurantProfile',checkAuth,restaurantController.updateRestaurantProfile);
app.get('/getCustomerProfile',checkAuth,restaurantController.getCustomerProfile);
app.post('/addDish',checkAuth,restaurantController.addDish);
app.put('/updateDish',checkAuth,restaurantController.updateDish);
app.get('/getRestaurantMenu',checkAuth,restaurantController.getRestaurantMenu);
app.get('/getOrderMenu',checkAuth,restaurantController.getOrderMenu);
app.get('/getRestaurantOrders',checkAuth,restaurantController.getRestaurantOrders);
app.post('/updateDeliveryStatus',checkAuth,restaurantController.updateDeliveryStatus);
//start your server on port 3001
app.listen(3001, () => console.log("Server Listening on port 3001"));
module.exports=app;