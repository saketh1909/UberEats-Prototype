const customer = require('../models/customerDetailsSchema');
const Order=require('../models/ordersSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");
module.exports.customerLogin = async (email,password) => {
    try{
        let user = await customer.findOne({Email:email});
        if(!user){
            return { status : 404}
        }

        let match= await bcrypt.compare(password, user.Password);
        if(!match){
            return {status : 500}
       }
       user.status=200;
       return user;
    }
    catch(err){
        return { status: 404 };
    }
        

}

module.exports.customerSignup = async (name,email,password) => {
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        let newCustomer = new customer({
            CustomerID:uuid(),
            Email:email,
            Password:hash,
            Name:name
        })
        try{
            newCustomer.save((error,results)=> {
                if(error){
                    return {status : 500};
                }else{
                    results.status=200;
                    return {status:200};
                }
            });
           
            
        }
        catch(e){
            console.log(e);
            return {status : 500};
        }

    });
}

module.exports.updateCustomerProfile = async (updateDetails) => {
    var filter={CustomerID:msg.customerID};
    var update={};
    for (const [key, value] of Object.entries(msg)) {
        if(key=="customerID") continue;
        update[key]=value;
    }
    Customer.findOneAndUpdate(filter,update,async(error,results)=>{
        if(error){
            return {status : 500}
        }else{
            return {status : 200}
        }

    })
}

module.exports.getCustomerOrders = async (customerID) => {
    try{
        let orders = await Order.find({CustomerID:customerID});
        return orders;
    }
    catch(e){
        return {status : 500};
    }
    

}

