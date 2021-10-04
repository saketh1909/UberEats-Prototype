
var connection=require('../connection.js');
const uuidv4 = require("uuid/v4")
module.exports.customerLogin= async(req,res)=>{
    const {email,password}=req.body;
    await connection.query(`SELECT * from CustomerDetails`, async function(error,results){

        if(error){
            console.log("error "+error);
        }else{
            console.log("Success");
            let authFlag=false;
            let details;
            //console.log(results);
            for(let user of results){
                if(user.Email==email && user.Password==password){
                    authFlag=true;
                    details=user;
                    break;
                }
            }
            let errors={
                ErrorMessage:"Invalid Credentails"
            };
            if(!authFlag){
                res.statusCode=500;
                res.send(errors);
            }else{
                res.send(details);
            }
            }
            
    })
}
module.exports.customerSignup=async(req,res)=>{
    //console.log("request body",req.body);
    const {password,email,name}=req.body;
    let sql="INSERT INTO `CustomerDetails` (CustomerID,Password,Email,Name) VALUES ('"+uuidv4()+"','"+password+"','"+email+"','"+name+"')";
    //console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=400;
            res.send(error);
        }else{
            console.log("Call Here");
            res.statusCode=200;
            console.log("Success");
            res.send("Customer SignUp Successful");
        }
    })
}
 module.exports.updateCustomerProfile=async(req,res)=>{
    var sql='UPDATE CustomerDetails SET ';
    for (const [key, value] of Object.entries(req.body)) {
        if(key=="customerID") continue;
        sql+=key + "='" + value + "' ,";
      }
      sql=sql.slice(0,-1);
      sql+="WHERE CustomerID='"+req.body.customerID+"'";
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

module.exports.addToFavourites=async(req,res)=>{
    var details=req.body;
    var sql=`INSERT INTO FavouriteRestaurants VALUES ('${uuidv4()}','${details.customerID}','${details.restaurantID}')`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send("Insertion Successful");
        }
    });
 }
 module.exports.getFavouriteRestaurants=async(req,res)=>{
     var sql=`Select * from RestaurantDetails where RestaurantID in (Select RestaurantID from FavouriteRestaurants where CustomerID="${req.query.customerID}");`
     //console.log(sql);
     await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    });
 }

 module.exports.addAddress=async(req,res)=>{
     var details=req.body;
    var sql=`INSERT INTO Address(AddressID,CustomerID,Address) VALUES('${uuidv4()}','${details.customerID}','${details.address}')`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send("Insertion Successful");
        }
    });
 };

 module.exports.getAddress=async(req,res)=>{
     var customerID=req.query.customerID;
     var sql=`SELECT Address from Address where CustomerID='${customerID}'`;
     console.log(sql);
     await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    });
 }

 module.exports.getCustomerOrders=async(req,res)=>{
     var CustomerID=req.query.CustomerID;
     let data={};
     var sql=`select t1.OrderID,CustomerID,t1.RestaurantID,Name,OrderStatus,Location,OrderDescription,NoOfItems,OrderTotal,OrderTime,OrderPickUp,OrderDelivery,OrderPickUpStatus,OrderDeliveryStatus,t1.Address from Orders t1 inner join RestaurantDetails t2 on t1.RestaurantID=t2.RestaurantID where CustomerID='${CustomerID}'`;
      //console.log(sql);
     var sql1=`select * from Orders t1 inner join OrderMenu t2 on t1.OrderID=t2.OrderID inner join Dishes t3 on t2.DishID=t3.DishID where CustomerID='${CustomerID}'`;
     await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send("Error in Retrieving Data");
        }else{
            data["Orders"]=results;
            await connection.query(sql1,async function(error,results){
                if(error){
                    res.statusCode=404;
                    res.send(error);
                }else{
                    data["OrdersMenu"]=results;
                    res.statusCode=200;
                    res.send(data);
                }
            });
        }
    });
 }

 module.exports.placeCustomerOrder=async(req,res)=>{
     let details=req.body;

 }