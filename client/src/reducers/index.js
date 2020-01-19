import { combineReducers } from "redux";
//TODO : find out more about combineReducers
import authReducer from './authReducer'
export default combineReducers({
    auth : authReducer
})