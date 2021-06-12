/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux'
export default function Header(props) {
    const auth = useSelector(({ auth }) => auth)
    console.log("auth", auth)
    return (
        <nav>
            <div className="nav-wrapper" >
                <a href="#" className="brand-logo">EmailFeedback</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {auth ? <>
                        <li><a href="/">Goto Landing</a></li>
                        <li><a href="/surveys">Goto Dashboard</a></li>
                        <li><a href="/surveys/new">Add New</a></li>
                        <li><a href="/api/logout">LogOut</a></li>
                    </>
                        : auth === false ?
                            < li > <a href="/auth/google">Login with Google</a></li> : null}

                </ul>
            </div>
        </nav >

    )
}
