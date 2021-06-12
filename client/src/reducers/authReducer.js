// eslint-disable-next-line import/no-anonymous-default-export
import {FETCH_USER} from '../actions/types'
export default function authReducer(state = null, action) {
    console.log(action)
    switch (action.type) {
        case FETCH_USER:
          return action.payload || false; // action.payload => {...} or "" value
        default:
            return state;
    }
}