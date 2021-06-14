import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async (dispatch, prevState) => { // thunk function (allow async), 
    const user = await axios.get('/api/currentUser') //not returning a promise but a callback
    dispatch({ type: FETCH_USER, payload: user.data })
}

export const handleToken = token => async (dispatch, prevState) => { // thunk function
    console.log('token',token)
    const user = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: user.data})
}