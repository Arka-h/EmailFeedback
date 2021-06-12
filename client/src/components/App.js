/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import * as actions from '../actions'
import Header from './Header'
const Landing = () => <h1>Landing</h1>
const Dashboard = () => <h1>Dashboard</h1>
const New = () => <h1>New</h1>

const App = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchUser) 
    }, [])
    // console.log(user)
    return (
        <>
            <BrowserRouter>
                {/* By default matches the characters prefix wise and then displays, put exact */}
                <div className="container">
                    <Header />
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/surveys' component={Dashboard} />
                    <Route exact path='/surveys/new' component={New} />
                </div>
            </BrowserRouter>
        </>
    )
}

export default App