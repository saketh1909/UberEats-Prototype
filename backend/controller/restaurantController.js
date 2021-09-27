var connection=require('../connection.js');
const uuidv4 = require("uuid/v4")
module.exports.restaurantLogin=async(req,res)=>{
    const {name,email,password}=req.body;
    await connection.query('SELECT * from RestaurantDetails',(error,results)=>{
        if(error){
            console.log("error "+error);
        }else{
            console.log("Success");
            let authFlag=false;
            for(let user of results){
                if(user.Email==email && user.Password==password){
                    authFlag=true;
                    break;
                }
            }
            let errors={
                ErrorMessage:"Invalid Credentails"
            };
            if(!authFlag){
                res.status(200).json({ errors });
            }else{
                res.send("Login Success");
            }
            }
    })

}
module.exports.restaurantSignup=async(req,res)=>{
    const {password,email,name,location}=req.body;
    let sql="INSERT INTO `RestaurantDetails` (RestaurantID,Password,Email,Name,Location) VALUES ('"+uuidv4()+"','"+password+"','"+email+"','"+name+"','"+location+"')";
    //console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.send(error);
        }else{
            res.send("Insertion Successful");
        }
    })
}

module.exports.restaurantProfile=async(req,res)=>{
    var restaurantID=req.query.restaurantID;
    await connection.query("SELECT * from RestaurantDetails WHERE RestaurantID="+restaurantID,async function(error,results){
        if(error){
            res.send(error);
        }else{
            res.send(results);
        }
    })
}
module.exports.updateRestaurantProfile=async(req,res)=>{
    var details=req.body;
    var sql='UPDATE RestaurantDetails SET ';
    for (const [key, value] of Object.entries(details)) {
        if(key=="restaurantID") continue;
        sql+=key + "='" + value + "' ,";
      }
      sql=sql.slice(0,-1);
      sql+="WHERE RestaurantID="+details.restaurantID;
      //console.log(sql);
      await connection.query(sql,async function(error,results){
        if(error){
            res.send(error);
        }else{
            res.send(results);
        }
      })
}

module.exports.addDish=async(req,res)=>{
    var dishDetails=req.body;
    let sql=`INSERT INTO Dishes (DishID,RestaurantID,DishName,MainIngredients,DishImageURL,DishPrice,Description,DishCategory) 
        VALUES ('${uuidv4()}','${dishDetails.restaurantID}','${dishDetails.DishName}','${dishDetails.MainIngredients}','${dishDetails.DishImageURL}',
        ${dishDetails.DishPrice},'${dishDetails.Description}','${dishDetails.DishCategory}')`;
        //console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}

module.exports.getOrders=async(req,res)=>{
    var restaurantID=req.query.restaurantID;
    var sql=`SELECT * from Orders WHERE RestaurantID='${restaurantID}'`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}

module.exports.updateOrderStatus=async(req,res)=>{
    var orderDetails=req.body;
    if(orderDetails.orderMode=='pickUp'){
        var sql=`UPDATE Orders SET OrderPickUpStatus='${orderDetails.status}'   where OrderID='${orderDetails.orderID}'`;
        await connection.query(sql,async function(error,results){
            if(error){
                res.statusCode=404;
                res.send(error);
            }else{
                
                res.statusCode=200;
                res.send("Update Successful");
            }
        });
    }else{
        var sql=`UPDATE Orders SET OrderDeliveryStatus='${orderDetails.status}'   where OrderID='${orderDetails.orderID}'`;
        await connection.query(sql,async function(error,results){
            if(error){
                res.statusCode=404;
                res.send(error);
            }else{
                
                res.statusCode=200;
                res.send("Update Successful");
            }
        });
    }
}
module.exports.getCustomerProfile=async (req,res)=>{
    var customerID=req.query.customerID;
    var sql=`SELECT * from CustomerDetails WHERE CustomerID='${customerID}'`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}