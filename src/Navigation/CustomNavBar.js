import React from "react";
import {  Link } from "react-router-dom";

const CustomNavbar = ({walletAddress}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        RST
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="http://localhost:5000/">
              Discover
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:5000/mynfts">
              My NFTs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:5000/rent">
              My Rent
            </a>
          </li>
        </ul>
        <span class="navbar-text ml-auto">
          Wallet: {walletAddress.substring(0,6) + "..."}
        </span>
      </div>
    </nav>
  );
};

export default CustomNavbar;