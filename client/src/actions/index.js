import axios from "axios";
import { FETCH_USER } from "./types";
//traditional method without thunk,

// const fetchUser = () => {
//   //this is an action creator
//   const request = axios.get("/api/current_user");
//   return {
//     type: FETCH_USER,
//     payload: request
//   };
// };

//async prevention
// thunk forwards dispatch function
export const fetchUser = () => async dispatch => {
  const res = await axios.get("api/current_user"); //see the res o/p ==> res.data
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const handleToken = (token)=>async dispatch =>{
  const res = await axios.post('api/stripe',token)
  dispatch({ type: FETCH_USER, payload: res.data });
}