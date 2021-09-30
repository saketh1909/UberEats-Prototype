import Axios from 'axios';
export const restaurantLogin =  (data) => async dispatch =>{
    await Axios.post('http://localhost:3001/restaurantLogin',data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
        //console.log(res);
            dispatch({
                type:'RESTAURANT_LOGIN',
                payload:res.data
            })
            dispatch({
                type:'RESTAURANT_LOGIN_ERROR',
                payload:undefined
            })
        
    })
    .catch(err=>{
        //console.log("Error");
        dispatch({
            type:'RESTAURANT_LOGIN_ERROR',
            payload:"Invalid Credentials"
        })
        dispatch({
            type:'RESTAURANT_LOGIN',
            payload:undefined
        })
    })
}
export const restaurantLogout = ()=> dispatch =>{
    dispatch({
        type:'RESTAURANT_LOGOUT'
    })
}
export const restaurantSignup = (data) => async dispatch =>{
    //console.log("Action");
    await Axios.post('http://localhost:3001/restaurantSignup',data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
        //console.log(res);
            dispatch({
                type:'RESTAURANT_SIGNUP',
                payload:"Signup Sucessful"
            })
    })
    .catch(err=>{
        dispatch({
            type:'RESTAURANT_SIGNUP',
            payload:"Signup Error"
        })
    })
}