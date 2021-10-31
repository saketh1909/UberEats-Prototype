
const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
const Dish = require('../models/dishesSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");
const customerLogin =async (msg, callback)=>{
    res = {};
    console.log("Parameters",msg);
    const {email,password}=msg;
    Customer.findOne({Email:email},async (error,results)=>{
        //console.log("error",error);
        //console.log("results",results);
        if (error) {
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }
        if(results==null){
           //callback(error, "Invalid Credentials");
            res.status = 404;
            res.data = "Invalid Credentials";
            callback(null, res);
           return;
        }
       let match= await bcrypt.compare(password, results.Password);
       if(!match){
        res.status = 404;
        res.data = "Invalid Credentials";
        callback(null, res);
       }else{
        res.status = 200;
        res.data=results;
        callback(null, res);
       }
    })
}
const customerSignup = async (msg,callback)=>{
    res = {};
    bcrypt.hash(msg.password, saltRounds, function(err, hash) {
        let newCustomer=new Customer({
            CustomerID:uuid(),
            Email:msg.email,
            Password:hash,
            Name:msg.name
        });
        newCustomer.save((err,results)=>{
            if(err){
                res.status = 500;
                res.data = "Error Occured";
                callback(null, res);
            }else{
                res.status = 200;
                res.data = "Insertion Succesful";
                callback(null,res);
            }
        })
    });
}
const updateCustomerProfile = async (msg,callback)=>{
    res= {};
    var filter={CustomerID:msg.customerID};
    var update={};
    for (const [key, value] of Object.entries(msg)) {
        if(key=="customerID") continue;
        update[key]=value;
    }
    console.log(filter,update);
    Customer.findOneAndUpdate(filter,update,async(error,results)=>{
        if(error){
            res.status=500;
            res.data="Update Unsuccessful";
            callback(null,res);
        }else{
            res.status=200;
            res.data="Update Successful";
            callback(null,res);
        }

    })
}
const addToFavourites = async (msg,callback) => {
    res= {};
    var details=msg;
    let favRestaurant=new favRestaurants({
        ID:uuid(),
        CustomerID:details.customerID,
        RestaurantID:details.restaurantID
    });
    favRestaurant.save((error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = "Insertion Succesful";
            callback(null,res);
        }
    });
}
const getFavouriteRestaurants = async(msg,callback) => {
    res = {};
    console.log("Backend");
    filter ={
        CustomerID:msg.customerID
    }
    console.log(filter);
    favRestaurants.find(filter,{RestaurantID:true,_id:false},async (error,results)=>{
        if(error){
            res.status=500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            let Restaurants=[];
            console.log("results",results);
            for(let obj of results){
               await Restaurant.findOne({RestaurantID:obj.RestaurantID},{Password:false,_id:false},async(error,results)=>{
                    if(error){
                        res.status=500;
                        res.data = "Error Occured";
                        callback(null, res);
                    }else{
                        Restaurants.push(results);
                    }
                })
            }
            res.status=200;
            res.data=Restaurants;
            callback(null,res);
        }
    });

}

const addAddress = async(msg,callback) => {
    res={};
    const {address,customerID} = msg;
    let newAddress=new Address({
        AddressID:uuid(),
        CustomerID:customerID,
        Address:address
    })
    newAddress.save((error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = "Insertion Succesful";
            callback(null,res);
        }
    })
}

const getAddress = async (msg,callback) => {
    res={};
    var customerID=msg.customerID;
    Address.find({CustomerID:customerID},{_id:false},async(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = results;
            callback(null,res);
        }
    });
}

const getCustomerOrders = async(msg,callback) => {
    res= {};
    var CustomerID=msg.CustomerID;
    let data={};
    Order.find({CustomerID:CustomerID},async (error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            let orders=[];
            for(let order of results){
                await Restaurant.findOne({RestaurantID:order.RestaurantID},(error,results)=>{
                    if(error || results==null){
                        res.status = 500;
                        res.data = "Error Occured";
                        callback(null, res);
                    }else{
                        let obj={};
                        obj["Name"]=results.Name;
                        obj["Location"]=results.Location;
                        let check={
                            ...order._doc,
                            ...obj
                        }
                        orders.push(check);
                    }
                });
            }
            //console.log(orders);
            data["Orders"]=orders;
            let ordersMenu=[];
            for(let order of orders){
                ordersMenu=[...ordersMenu,...order.Menu];
            }
            data["OrdersMenu"]=ordersMenu;
            res.status = 200;
            res.data = data;
            callback(null,res);
        }
    })
}

const placeCustomerOrder = async (msg,callback) => {
    let details=msg;
    let orderID=uuid();
    for(let item of details.menu){
        item["OrderID"]=orderID;
        item["OrderTotal"]=details.OrderTotal;
        item["OrderDishPrice"]=item.DishPrice;
        item["Address"]=details.Address;
        item["OrderDescription"]=details.Description;
        item["OrderStatus"]=details.OrderStatus;
    }
    console.log(msg);
    let order=new Order({
        OrderID:orderID,
        RestaurantID:details.RestaurantID,
        CustomerID:details.CustomerID,
        OrderStatus:details.OrderStatus,
        OrderDescription:details.Description,
        NoOfItems:details.NoOfItems,
        OrderTotal:details.OrderTotal,
        OrderTime:details.OrderTime,
        OrderPickUp:details.OrderPickUp,
        OrderDelivery:details.OrderDelivery,
        OrderPickUpStatus:details.OrderPickUpStatus,
        OrderDeliveryStatus:details.OrderDeliveryStatus,
        Address:details.Address,
        Menu:details.menu
    });
    console.log("Order",msg);
    order.save((error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = "Order Created";
            callback(null,res);
        }
    })
}

const getRestaurants = async (msg,callback) => {
    let res = {};
    Restaurant.find({},{_id:false,Password:false},(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = results;
            callback(null,res);
        }
    })
}

const getRestaurantBasedOnSearch = async (msg,callback) => {
    let res= {};
    var {search,type}=msg;
    let filter={};
    if(type==="Veg"){
        filter["Veg"]=1;
    }else if(type==="Non veg"){
        filter["Nonveg"]=1;
    }else if(type==="Vegan"){
        filter["Vegan"]=1;
    }
    else if(type==="Pickup"){
        filter={
            ModeOfDelivery:{
                $in:[0,2]
            }
        }
    }else if(type==="Delivery"){
        filter["ModeOfDelivery"]={
                $in:[1,2]
        }
    }else{
        filter={
            Location:search
        }
    }
    Restaurant.find(filter,{Password:false,_id:false},(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "No Records Found";
            callback(null, res);
        }else{
            //console.log(results);
            if(results!==null && results.length>0){
                res.status=200;
                res.data=results;
                callback(null, res);
            }else{
                Dish.find({DishName:search},{_id:false,RestaurantID:true}).distinct('RestaurantID',(error,result)=>{
                    if(error || result==null || result.length==0){
                        res.status = 500;
                        res.data = "No Records Found";
                        callback(null, res);
                    }else{
                        res.status=200;
                        res.data=results;
                        callback(null, res);
                    }
                })
            }
        }
    });
}

handle_request = (msg, callback) => {
    if(msg.path==="customerLogin"){
        delete msg.path;
        customerLogin(msg,callback);
    }
    else if(msg.path==="customerSignup"){
        delete msg.path;
        customerSignup(msg,callback);
    }
    else if(msg.path==="updateCustomerProfile"){
        delete msg.path;
        updateCustomerProfile(msg,callback);
    }
    else if(msg.path==="addToFavourites"){
        delete msg.path;
        addToFavourites(msg,callback);
    }
    else if(msg.path==="getFavouriteRestaurants"){
        delete msg.path; 
        getFavouriteRestaurants(msg,callback);
    }
    else if(msg.path==="addAddress"){
        delete msg.path;
        addAddress(msg,callback);
    }
    else if(msg.path==="getAddress"){
        delete msg.path;
        getAddress(msg,callback);
    }
    else if(msg.path==="getCustomerOrders"){
        delete msg.path;
        getCustomerOrders(msg,callback);
    }
    else if(msg.path==="placeCustomerOrder"){
        delete msg.path;
        placeCustomerOrder(msg,callback);
    }
    else if(msg.path==="getRestaurants"){
        delete msg.path;
        getRestaurants(msg,callback);
    }
    else if(msg.path==="getRestaurantBasedOnSearch"){
        delete msg.path;
        getRestaurantBasedOnSearch(msg,callback);
    }
}
exports.handle_request = handle_request;