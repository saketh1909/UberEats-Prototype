const Restaurant = require('../models/restaurantDetailsSchema');
const Dish = require('../models/dishesSchema');
const {uuid} = require("uuidv4");

module.exports.getRestaurants=async(req,res)=>{
    Restaurant.find({},{_id:false,Password:false},(error,results)=>{
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    })
}

module.exports.getRestaurantBasedOnSearch=async(req,res)=>{
    var {search,type}=req.query;
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
            res.statusCode=404;
            res.send("No Records Found");
        }else{
            //console.log(results);
            if(results!==null && results.length>0){
                res.statusCode=200;
                res.send(results);
            }else{
                Dish.find({DishName:search},{_id:false,RestaurantID:true}).distinct('RestaurantID',(error,result)=>{
                    if(error || result==null || result.length==0){
                        res.statusCode=404;
                        res.send("No Records Found");
                    }else{
                        res.statusCode=200;
                        res.send(result);
                    }
                })
            }
        }
    });
}