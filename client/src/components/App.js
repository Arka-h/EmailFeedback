/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Dashboard from './Dashboard'
import Landing from './Landing'
import { fetchUser } from '../actions'
import Header from './Header'
import SurveyNew from './surveys/SurveyNew'

const App = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUser()) 
    }, [])
    return (
        <>
            <BrowserRouter>
                {/* By default matches the characters prefix wise and then displays, put exact */}
                <div className="container">
                    <Header />
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/surveys' component={Dashboard} />
                    <Route exact path='/surveys/new' component={SurveyNew} />
                </div>
            </BrowserRouter>
        </>
    )
}
export default App