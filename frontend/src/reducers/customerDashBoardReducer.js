import {GET_RESTAURANTS,GET_RESTAURANTS_ON_SEARCH} from '../constants/action-types.js';
const initialState={};

export default function getRestaurants(state=initialState,action){
    switch(action.type){
        case GET_RESTAURANTS:
            return {...state,restaurantData:action.payload}
        case GET_RESTAURANTS_ON_SEARCH:
            return {...state,restaurantData:action.payload}
        default:
            return state;
    }
}