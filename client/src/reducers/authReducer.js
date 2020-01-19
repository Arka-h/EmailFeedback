import { FETCH_USER } from "../actions/types";

export default (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
// state : null , status : unknown
// state : Object , status : exists
// state : false , status : doesn't exist
// false == "" ==
