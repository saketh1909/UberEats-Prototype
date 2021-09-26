
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
module.exports.customerSignup=async(req,res)=>{
    //console.log("request body",req.body);
    const {password,email,name,dateOfBirth}=req.body;
    let sql="INSERT INTO `CustomerDetails` (CustomerID,Password,Email,Name,DateOfBirth) VALUES ('"+uuidv4()+"','"+password+"','"+email+"','"+name+"','"+dateOfBirth+"')";
    //console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.send(error);
        }else{
            console.log("Success");
            res.send("Insertion Successful");
        }
    })
}