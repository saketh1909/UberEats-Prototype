const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Restaurant = require('../models/restaurantDetailsSchema');
const Customer = require('../models/customerDetailsSchema');
const Dish = require('../models/dishesSchema');
const Order=require('../models/ordersSchema');
module.exports.restaurantSignup=async(req,res)=>{
    const {password,email,name,location}=req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let newRestaurant=new Restaurant({
            RestaurantID:uuid(),
            Email:email,
            Password:hash,
            Name:name,
            Location:location
        });
        newRestaurant.save((err,results)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Insertion Succesfull");
            }
        })
    });
}

module.exports.restaurantLogin=async(req,res)=>{
    const {email,password} = req.body;
    Restaurant.findOne({Email:email},async (error,results)=>{
        if(error){
            res.statusCode=500;
            res.send(error);
        }else{
            if(results==null){
                res.statusCode=404;
               res.send("Invalid Credentials");
               return;
            }
            let match= await bcrypt.compare(password, results.Password);
            if(!match){
                res.statusCode=400;
                res.send("Invalid Credentials");
            }else{
                res.statusCode=200;
                results.Password=undefined;
                res.send(results);
            }
        }
    })
}

module.exports.restaurantProfile=async(req,res)=>{
    var restaurantID=req.query.restaurantID;
    Restaurant.findOne({RestaurantID:restaurantID},(error,results)=>{
        if(error){
            res.statusCode=500;
            res.send(error);
        }else{
            res.statusCode=200;
            results.Password=undefined;
            res.send(results);  
        }
    });
}
module.exports.updateRestaurantProfile=async(req,res)=>{
    var filter={RestaurantID:req.body.restaurantID};
    var update={};
    for (const [key, value] of Object.entries(req.body)) {
        if(key=="restaurantID") continue;
        update[key]=value;
    }
    Restaurant.findOneAndUpdate(filter,update,async(error,results)=>{
        if(error){
            res.statusCode=500;
            res.send("Update Unsuccessful");
        }else{
            res.statusCode=200;
            res.send("Update Successful");
        }
    })
}

module.exports.getCustomerProfile=async (req,res)=>{
    var customerID=req.query.customerID;
    Customer.findOne({CustomerID:customerID},(error,results)=>{
        if(error){
            res.statusCode=404;
            res.send("Profile not found");
        }else{
            res.statusCode=200;
            results.Password=undefined;
            res.send(results);
        }
    });
    
}

module.exports.addDish=async(req,res)=>{
    var dishDetails=req.body;
    let dish=new Dish({
        DishID:uuid(),
        RestaurantID:dishDetails.restaurantID,
        DishName:dishDetails.DishName,
        MainIngredients:dishDetails.MainIngredients,
        DishImageURL:dishDetails.DishImageURL,
        DishPrice:dishDetails.DishPrice,
        Description:dishDetails.Description,
        DishCategory:dishDetails.DishCategory,
        DishType:dishDetails.DishType
    })
    dish.save((error,results)=>{
        if(error){
            res.send(error);
        }else{
            res.send("Insertion Succesfull");
        }
    });
}

module.exports.updateDish=async(req,res)=>{
    var update={};
    for (const [key, value] of Object.entries(req.body)) {
        if(key=="DishID") continue;
        update[key]=value;
    }
    Dish.findOneAndUpdate({DishID:req.body.DishID},update,(error,results)=>{
        if(error){
            res.statusCode=500;
            res.send("Update Unsuccessful");
        }else{
            res.statusCode=200;
            res.send("Update Successful");
        }
    })
}
module.exports.getOrderMenu=async(req,res)=>{
    let {OrderID}=req.query;
    Order.findOne({OrderID:OrderID},{_id:false,Menu:true},(error,results)=>{
        if(error){
            res.statusCode=500;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results.Menu);
        }
    })
}
module.exports.getRestaurantOrders=async(req,res)=>{
    var restaurantID=req.query.RestaurantID;
    Order.find({RestaurantID:restaurantID},async (error,results)=>{
        if(error){
            res.statusCode=500;
            res.send(error);
        }else{
            let data=[];
            for(let order of results){
                let obj={};
                await Customer.findOne({CustomerID:order.CustomerID},(error,results)=>{
                    if(error){
                        res.statusCode=500;
                        res.send(error);
                    }else{
                        results.Password=undefined;
                        obj={
                            ...order._doc,
                            ...results._doc
                        }
                        //console.log("Check this",obj);
                        data.push(obj);
                    }
                });
            }
            res.send(data);
        }
    });
}
module.exports.updateDeliveryStatus=async(req,res)=>{
    let update= {};
    var details=req.body;
    if(details.OrderPickUpStatus!==undefined){
        update["OrderPickUpStatus"]=details.OrderPickUpStatus;
        if(details.OrderPickUpStatus=="Picked up"){
            update["OrderStatus"]='Delivered';
        }else{
            update["OrderStatus"]='New Order';
        }
    }else{
        update['OrderDeliveryStatus']=details.OrderDeliveryStatus;
        if(details.OrderDeliveryStatus==="Delivered"){
            update["OrderStatus"]='Delivered';
        }else{
            update["OrderStatus"]='New Order';
        }
    }
    Order.findOneAndUpdate({OrderID:details.OrderID},update,(error,results)=>{
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send("Update Successful");
        }
    });
}
// module.exports.updateOrderStatus=async(req,res)=>{


// }
module.exports.getRestaurantMenu =async(req,res)=>{
    var restaurantID=req.query.RestaurantID;
    Dish.find({RestaurantID:restaurantID},(error,results)=>{
        if(error){
            res.statusCode=500;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    });
}