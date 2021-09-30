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