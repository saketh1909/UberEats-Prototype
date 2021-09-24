
var connection=require('../connection.js');
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
    const {password,email,name}=req.body;
    let sql="INSERT INTO `CustomerDetails` (Password,Email,Name) VALUES ('"+password+"','"+email+"','"+name+"')";
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