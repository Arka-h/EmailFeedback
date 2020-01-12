import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
export class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Logo</a>
          <ul className="right">
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
