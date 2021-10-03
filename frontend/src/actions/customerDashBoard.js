import Axios from 'axios';
export const getRestaurants= () => async dispatch =>{
    await Axios.get('http://localhost:3001/getRestaurants')
    .then(async (res)=>{
        console.log("Action",res);
        dispatch({
            type:"GET_RESTAURANTS",
            payload:res.data
        });
    })
    .catch(err=>{
        console.log("Action",err);
        dispatch({
            type:"GET_RESTAURANTS",
            payload:[]
        });
    });
}
export const searchRestaurants = (location) => async dispatch =>{
    console.log(location);
    await Axios.get(`http://localhost:3001/getRestaurantOnSearch?location=${location}`)
    .then(async (res)=>{
        console.log("Data from backend",res.data);
        dispatch({
            type:"GET_RESTAURANTS_ON_SEARCH",
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:"GET_RESTAURANTS_ON_SEARCH",
            payload:[]
        });
    })
}

export const updateCustomerProfile=(details) => async dispatch =>{
    dispatch({
        type:"UPDATE_CUSTOMER_PROFILE",
        payload:details
    })
}
export const viewRestaurantPage= (details)=>async dispatch=>{
    console.log("Action",details);
    dispatch({
        type:"VIEW_RESTAURANT_PAGE",
        payload:details
    })
}
export const updateCartItems=(data)=>async dispatch=>{
    dispatch({
        type:"UPDATE_CART_ITEMS",
        payload:data
    })
}
export const updateFavouriteRestaurants=(data)=>async dispatch=>{
    dispatch({
        type:"UPDATE_FAV_RESTAURANTS",
        payload:data
    })
}