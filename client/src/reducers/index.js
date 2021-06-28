import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form' // reducer
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'

export default combineReducers({
    auth: authReducer,
    form: reduxFormReducer, // as in the redux-form docs
    surveys: surveysReducer
})