var connection=require('../connection.js');
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
    let sql="INSERT INTO `RestaurantDetails` (Password,Email,Name,Location) VALUES ('"+password+"','"+email+"','"+name+"','"+location+"')";
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