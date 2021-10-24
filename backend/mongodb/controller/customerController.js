const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.customerSignup=async(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let newCustomer=new Customer({
            CustomerID:uuid(),
            Email:req.body.email,
            Password:hash,
            Name:req.body.name
        });
        newCustomer.save((err,results)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Insert Succesfull");
            }
        })
    });
}
module.exports.customerLogin=async(req,res)=>{
    const {email,password}=req.body;
    Customer.findOne({Email:email},async (error,results)=>{
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occured");
        }
        if(results==null){
            res.statusCode=200;
           res.send("Invalid Credentials");
           return;
        }
       let match= await bcrypt.compare(password, results.Password);
       if(!match){
        res.statusCode=400;
        res.send("Invalid Credentials");
       }else{
        res.statusCode=200;
           res.send(results);
       }
    })
}
module.exports.updateCustomerProfile=async(req,res)=>{
    var filter={CustomerID:req.body.customerID};
    var update={};
    for (const [key, value] of Object.entries(req.body)) {
        if(key=="customerID") continue;
        update[key]=value;
    }
    console.log(filter,update);
    Customer.findOneAndUpdate(filter,update,async(error,results)=>{
        if(error){
            res.statusCode=500;
            res.send("Update Unsuccessful");
        }else{
            res.statusCode=200;
            res.send("Update Successful");
        }

    })
}
module.exports.addToFavourites=async(req,res)=>{
    var details=req.body;
    let favRestaurant=new favRestaurants({
        ID:uuid(),
        CustomerID:details.customerID,
        RestaurantID:details.restaurantID
    });
    favRestaurant.save((error,results)=>{
        if(error){
            res.send(error);
        }else{
            res.send("Insert Succesfull");
        }
    });
}
module.exports.getFavouriteRestaurants=async(req,res)=>{
    let filter={
        CustomerID:req.query.customerID
    }
    favRestaurants.find(filter,{RestaurantID:true,_id:false},async (error,results)=>{
        if(error){
            res.statusCode=400;
            res.send(error);
        }else{
            let Restaurants=[];
            for(let obj of results){
               await Restaurant.findOne({RestaurantID:obj.RestaurantID},{Password:false,_id:false},async(error,results)=>{
                    if(error){
                        res.statusCode=400;
                        res.send("Fetch Error");
                    }else{
                        Restaurants.push(results);
                    }
                })
            }
            res.statusCode=200;
            res.send(Restaurants);
        }
    });
}
module.exports.addAddress=async(req,res)=>{
    const {address,customerID} = req.body;
    let newAddress=new Address({
        AddressID:uuid(),
        CustomerID:customerID,
        Address:address
    })
    newAddress.save((error,results)=>{
        if(error){
            res.send(error);
        }else{
            res.send("Insertion Succesfull");
        }
    })
}
module.exports.getAddress=async(req,res)=>{
    var customerID=req.query.customerID;
    Address.find({CustomerID:customerID},{_id:false},async(error,results)=>{
        if(error){
            res.send(error);
        }else{
            res.send(results);
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
