const graphql = require('graphql');
const Restaurant = require('../models/restaurantDetailsSchema');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType
} = graphql;
const customer = require('../mutations/customer');
const restaurant = require('../mutations/restaurant');
const CustomerDetails = new GraphQLObjectType({
    name:"customerDetails",
    fields: () => ({
        _id:{type : GraphQLString},
        ImageURL : {type : GraphQLString},
        DateOfBirth : {type : GraphQLString},
        City : {type : GraphQLString},
        State : {type : GraphQLString},
        Country : {type : GraphQLString},
        Nickname : {type : GraphQLString},
        PhoneNumber : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        Email : {type : GraphQLString},
        Password : {type : GraphQLString},
        Name : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const RestaurantDetails = new GraphQLObjectType({
    name : "restaurantDetails",
    fields : () => ({
        _id : {type : GraphQLString},
        ImageURL : {type : GraphQLString},
        Description : {type : GraphQLString},
        ContactInfo : {type : GraphQLInt},
        Address : {type : GraphQLString},
        ModeOfDelivery : {type : GraphQLInt},
        Veg : {type : GraphQLInt},
        Nonveg : {type : GraphQLInt},
        Vegan : {type : GraphQLInt},
        Timings : {type : GraphQLString},
        RestaurantID: {type : GraphQLString},
        Email : {type : GraphQLString},
        Password : {type : GraphQLString},
        Name : {type : GraphQLString},
        Location : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const Addresses = new GraphQLObjectType({
    name : "Addresses",
    fields : () => ({
        _id : {type : GraphQLString},
        AddressID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        Address : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const Dish = new GraphQLObjectType({
    name : "Dish",
    fields : () => ({
        _id : {type : GraphQLString},
        DishID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        DishName : {type : GraphQLString},
        MainIngredients : {type : GraphQLString},
        DishImageURL : {type : GraphQLString},
        DishPrice : {type : GraphQLString},
        Description : {type : GraphQLString},
        DishCategory : {type : GraphQLString},
        DishType : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const FavouriteRestaurants = new GraphQLObjectType({
    name : "FavouriteRestaurants",
    fields : () => ({
        _id : {type : GraphQLString},
        ID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        status : {type : GraphQLInt}
    })
})

const Orders = new GraphQLObjectType({
    name : "Orders",
    fields : () => ({
        _id : {type : GraphQLString},
        OrderID : {type : GraphQLString},
        RestaurantID : {type : GraphQLString},
        CustomerID : {type : GraphQLString},
        OrderStatus : {type : GraphQLString},
        OrderDescription : {type : GraphQLString},
        NoOfItems : {type : GraphQLInt},
        OrderTotal : {type : GraphQLInt},
        OrderPickUp : {type : GraphQLInt},
        OrderDelivery : {type : GraphQLInt},
        OrderTime : {type : GraphQLString},
        OrderPickUpStatus : {type : GraphQLString},
        OrderDeliveryStatus : {type : GraphQLString},
        Address : {type : GraphQLString},
        status : {type : GraphQLInt},
        Menu :  {type : GraphQLList(MenuList)}
    })
})

const MenuList = new GraphQLObjectType({
    name : "MenuList",
    fields: () => ({
        _id : {type : GraphQLString},
        DishImageURL : {type : GraphQLString},
        Description : {type : GraphQLString},
        DishID : {type : GraphQLString},
        RestaurantID: {type : GraphQLString},
        DishName: {type : GraphQLString},
        MainIngredients : {type : GraphQLString},
        DishPrice: {type : GraphQLFloat},
        DishCategory: {type : GraphQLString},
        DishType: {type : GraphQLString},
        Qty : {type : GraphQLInt},
        Name : {type : GraphQLString},
        OrderID: {type : GraphQLString},
        OrderTotal:{type : GraphQLFloat},
        OrderDishPrice:{type : GraphQLFloat},
        Address:{type : GraphQLString},
        OrderDescription:{type : GraphQLString},
        OrderStatus:{type : GraphQLString},

    })

})

const CustomerInputType = new GraphQLInputObjectType({
    name : "customerInput",
    fields: () => ({
        Name : {type : GraphQLString},
        DateOfBirth: {type : GraphQLString},
        City: {type : GraphQLString},
        State: {type : GraphQLString},
        Country : {type : GraphQLString},
        Nickname : {type : GraphQLString},
        Email : {type : GraphQLString},
        PhoneNumber: {type : GraphQLString},
        ImageURL:{type : GraphQLString}
    })
})
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id );
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                Restaurant.find({},(error,results)=> {
                    if(error){
                        //console.log(error);
                    }else{
                        //console.log(results);
                        //return results;
                    }
                });
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        },
        restaurants : {
            type : new GraphQLList(RestaurantDetails),
            async resolve(parent,args){
                let restaurants = await Restaurant.find({});
                return restaurants;
            }
        },
        customerOrders : {
            type : new GraphQLList(Orders),
            args : {
                customerID : { type : GraphQLString}
            },
            resolve(parent,args) {
                return customer.getCustomerOrders(args.customerID);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        customerLogin: {
            type : CustomerDetails,
            description: "Customer Login",
            args : {
                email : { type : GraphQLString},
                password : {type : GraphQLString}
            },
            resolve(parent,args) {
                return customer.customerLogin(args.email,args.password);
            }
        },
        customerSignup : {
            type : CustomerDetails,
            description : "Customer Signup",
            args:{
                name : { type : GraphQLString},
                email : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent,args){
                return customer.customerSignup(args.name,args.email,args.password);
            }
        },
        updateCustomerProfile:{
            type: CustomerDetails,
            description: "Update Customer Profile",
            args:{
                updateDetails: {type : CustomerInputType}
            },
            resolve(parent,args){
                return customer.updateCustomerProfile(args.updateDetails);
            }
        },
        restaurantLogin:{
            type : RestaurantDetails,
            description: "Restaurant Login",
            args:{
                email : { type : GraphQLString},
                password : {type : GraphQLString}
            },
            resolve(parent,args){
                return restaurant.restaurantLogin(args.email,args.password);
            }
        },
        restaurantSignup:{
            type : RestaurantDetails,
            description: "Restaurant Signup",
            args:{
                email : { type : GraphQLString},
                password : {type : GraphQLString},
                name : { type : GraphQLString},
                location : {type : GraphQLString} 
            },
            resolve(parent,args){
                 return restaurant.restaurantSignup(args.name,args.email,args.password,args.location);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;