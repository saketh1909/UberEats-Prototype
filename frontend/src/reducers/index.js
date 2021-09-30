import { combineReducers } from 'redux';
import customerLoginReducer from './customerLoginReducer';
import restaurantLoginReducer from './restaurantLoginReducer';
import customerDashBoardReducer from './customerDashBoardReducer';
export default combineReducers({
customerLoginReducer,
restaurantLoginReducer,
customerDashBoardReducer
});