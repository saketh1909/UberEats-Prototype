import {GET_RESTAURANTS} from '../constants/action-types.js';
const initialState={};

export default function getRestaurants(state=initialState,action){
    switch(action.type){
        case GET_RESTAURANTS:
            return {...state,restaurantData:action.payload}

        default:
            return state;
    }
}