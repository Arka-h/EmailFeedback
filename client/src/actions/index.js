import axios from 'axios'
import { FETCH_USER,FETCH_SURVEYS } from './types'

export const fetchUser = () => async (dispatch, prevState) => { // thunk function (allow async), 
    const user = await axios.get('/api/currentUser') //not returning a promise but a callback
    dispatch({ type: FETCH_USER, payload: user.data })
}

export const handleToken = token => async (dispatch, prevState) => { // thunk function
    console.log('token', token)
    const user = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: user.data })
}

export const submitSurvey = (values, history) => async dispatch => { // actions triggered in component
    values.recipients = values.recipients.split(',').map(s => s.trim())
    values.response = values.response.split(',').map((s) => s.trim())

    const res = await axios.post('/api/createSurvey', values)
    
    history.push('/surveys')
    dispatch({ type: FETCH_USER, payload: res.data }) // updates in UI to make after action
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys')

    dispatch({type: FETCH_SURVEYS, payload: res.data})
}