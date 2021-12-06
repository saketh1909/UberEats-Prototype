const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");
var Restaurant = require('../models/restaurantDetailsSchema');

module.exports.restaurantSignup=async(name,email,password,location)=>{
    bcrypt.hash(password, saltRounds, async function(err, hash) {
    let newRestaurant = new Restaurant({
        RestaurantID:uuid(),
        Email:email,
        Password:hash,
        Name:name,
        Location:location
    })
    try{
        newRestaurant.save((error,results)=> {
            if(error){
                return {status : 500};
            }else{
                results.status=200;
                return {status : 200};
            }
        });
       
        
    }
    catch(e){
        console.log(e);
        return {status : 500};
    }

});

}


module.exports.restaurantLogin = async(email,password) => {
    try{
        let restaurant = await Restaurant.findOne({Email:email});
        if(!restaurant){
            return { status : 404}
        }

        let match= await bcrypt.compare(password, restaurant.Password);
        if(!match){
            return {status : 500}
       }
       restaurant.status=200;
       return restaurant;
    }
    catch(err){
        return { status: 404 };
    }
}