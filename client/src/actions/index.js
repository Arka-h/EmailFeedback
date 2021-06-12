import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = async dispatch => { // thunk function
    const user = await axios.get('/api/currentUser')
    dispatch({ type: FETCH_USER, payload: user.data })
}