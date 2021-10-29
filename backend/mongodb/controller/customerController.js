const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
var kafka = require('../../kafka/client.js');
const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.customerSignup=async(req,res)=>{
    req.body.path="customerSignup";
    kafka.make_request('customer_login',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
        
    });
}
module.exports.customerLogin=async(req,res)=>{
    req.body.path="customerLogin";
    kafka.make_request('customer_login',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            if(res.statusCode===200)
                results.data.Password=undefined;
            res.send(results.data);

            }
        
    });
    }
module.exports.updateCustomerProfile=async(req,res)=>{
    req.body.path="updateCustomerProfile";
    kafka.make_request('customer_login',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
        
    });
}
module.exports.addToFavourites=async(req,res)=>{
    req.body.path="addToFavourites";
    kafka.make_request('customer_login',req.body, function(err,results){
        //console.log('in result');
       // console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
        
    });
}
module.exports.getFavouriteRestaurants=async(req,res)=>{
    request={};
    request.path="getFavouriteRestaurants";
    request.customerID=req.query.customerID;
    kafka.make_request('customer_login',request, function(err,results){
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
        
    });
}
module.exports.addAddress=async(req,res)=>{
    req.body.path="addAddress";
    kafka.make_request('customer_login',req.body, function(err,results){
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);
            }
        
    });
    
}
module.exports.getAddress=async(req,res)=>{
    req.query.path="getAddress";
    kafka.make_request('customer_login',req.query, function(err,results){
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
        
    });
}
module.exports.getCustomerOrders=async(req,res)=>{
    var CustomerID=req.query.CustomerID;
    let data={};
    Order.find({CustomerID:CustomerID},async (error,results)=>{
        if(error){
            res.send(error);
        }else{
            let orders=[];
            for(let order of results){
                await Restaurant.findOne({RestaurantID:order.RestaurantID},(error,results)=>{
                    if(error || results==null){
                        res.statusCode=500;
                        res.send(error);
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
            res.statusCode=200;
            res.send(data);
        }
    })
}
module.exports.placeCustomerOrder=async(req,res)=>{
    let details=req.body;
    let orderID=uuid();
    for(let item of details.menu){
        item["OrderID"]=orderID;
        item["OrderTotal"]=details.OrderTotal;
        item["OrderDishPrice"]=item.DishPrice;
        item["Address"]=details.Address;
        item["OrderDescription"]=details.Description;
        item["OrderStatus"]=details.OrderStatus;
    }
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
    order.save((error,results)=>{
        if(error){
            res.send(error);
        }else{
            res.send("Order Created");
        }
    })
}
