import Axios from 'axios';
import config from '../urlConfig';
export const login = (data) => async dispatch =>{
    await Axios.post(`${config.BackendURL}/customerLogin`,data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
        //console.log(res);
            dispatch({
                type:'CUSTOMER_LOGIN',
                payload:res.data
            })
            dispatch({
                type:'CUSTOMER_LOGIN_ERROR',
                payload:undefined
            })
        
    })
    .catch(err=>{
        //console.log("Error");
        dispatch({
            type:'CUSTOMER_LOGIN_ERROR',
            payload:"Invalid Credentials"
        })
        dispatch({
            type:'CUSTOMER_LOGIN',
            payload:undefined
        })
    })
}
export const signup = (data) => async dispatch =>{
    //console.log("Action");
    await Axios.post(`${config.BackendURL}/customerSignup`,data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
       // console.log(res);
            dispatch({
                type:'CUSTOMER_SIGNUP',
                payload:"Customer Signup Successful"
            })
    })
    .catch(err=>{
        dispatch({
            type:'CUSTOMER_SIGNUP',
            payload:"Customer Signup Error"
        })
    })
}

export const logout = ()=> dispatch =>{
    dispatch({
        type:'CUSTOMER_LOGOUT'
    })
}