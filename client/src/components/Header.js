/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Payments from './Payments'

export default function Header(props) {

    const auth = useSelector(({ auth }) => auth)
    console.log("auth", auth)
    return (
        <nav>
            <div className="nav-wrapper" > {/* <Link> vs <a>, React router vs different HTML page */}
                <Link to={auth ? "/surveys" : "/"} className="brand-logo">EmailFeedback</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {auth ? <>
                        <li><Link to="/">Landing</Link></li>
                        <li><Link to="/surveys">Dashboard</Link></li>
                        <li><Link to="/surveys/new">New</Link></li> {/* Handled by ReactRouter */}
                        <li>Credits: {auth.credits} &nbsp;</li>
                        <li><Payments auth={auth} /></li>
                        <li><a href="/api/logout">
                            LogOut <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                        </a></li> {/* Handled by HTML */}
                    </>
                        : auth === false ?
                            < li > <a href="/auth/google">Login with Google</a></li> : null}

                </ul>
            </div>
        </nav >

    )
}
