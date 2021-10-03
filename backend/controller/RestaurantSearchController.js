var connection=require('../connection.js');
const uuidv4 = require("uuid/v4");
module.exports.getRestaurantBasedOnLocation=async(req,res)=>{
    var location=req.query.location;
    console.log(location);
    var sql=`SELECT * from RestaurantDetails where Location='${location}'`;
    var sql1=`SELECT * from RestaurantDetails where Location!='${location}'`;
    await connection.query(sql,async(error,results)=>{
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            //console.log(results);
            var restaurantData=results;
            await connection.query(sql1,async(error,results)=>{
                if(error){
                    res.statusCode=404;
                    res.send(error);
                }else{
                    //console.log(results);
                    restaurantData=[...restaurantData,...results];    
                    //console.log(restaurantData);     
                    res.send(restaurantData);   
                }
            })
        }
    })
}

module.exports.getRestaurants=async(req,res)=>{
    await connection.query(`SELECT * from RestaurantDetails`,async(error,results)=>{
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    })
}
