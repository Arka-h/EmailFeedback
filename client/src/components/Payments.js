import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { handleToken } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

const Payments = () => {
    const dispatch = useDispatch()
    return <StripeCheckout
        name="EmailFeedback"
        description="$1 for 5 email credit"
        amount={100}
        token={token => dispatch(handleToken(token))} // Thunk allows us to use wrapper function, to send arguments to the dispatch function
        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <Link> <FontAwesomeIcon icon={faMoneyBillWave} size="lg" /> </Link>
    </StripeCheckout>
}
export default Payments