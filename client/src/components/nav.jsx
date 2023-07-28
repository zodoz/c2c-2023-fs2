import React from "react";
import acct from "../images/acct.png";
import logo from "../images/logo.png";
import cartlogo from "../images/cartlogo.png";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const {length, searchTerm, setSearchTerm} = props;
  return (
    <>
      <div className="nav">
        <div className="nav-items">
          <img className="icons" id= 'logo'src={logo} alt=""></img>
          <input
            type="text"
            value={searchTerm}
            onChange={e => {
              console.log("changing to "+e.target.value)
              setSearchTerm(e.target.value)
            }}
            className="search-box"
            placeholder="search"
          ></input>
          <button className="search-btn">search</button>

          <img className="icons" src={acct} alt=""></img>

          <button onClick={props.cartPath} id="cart-btn">
            {" "}
            {props.length}
            <img src={cartlogo} alt=""></img>
          </button>
        </div>
        <div id="links">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/shopping">
            Shopping
          </Link>
          <Link className="navlink" to="/about">
            About Us
          </Link>
          <Link className="navlink" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;

