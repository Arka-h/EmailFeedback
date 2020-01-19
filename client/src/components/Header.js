import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import Payment from "./Payment";
export class Header extends Component {
  renderContent() {
    console.log(`Auth status : ${this.props.auth}`);
    //undefined
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key={0}>
            <Payment />
          </li>,
          <li key={1}>
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Logo</a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default Header;
