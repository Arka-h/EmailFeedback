import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";
export class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        className="right"
        amount={100} /* cents */
        token={token =>
          this.props.handleToken(token)
        } /* callback function (poorly named)*/
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        name="EmailFeedback"
        description="$1 for one survey"
      >
        <a title="Add Credits">
          <i className="material-icons">add_circle</i>
        </a>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payment);
