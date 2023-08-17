import React, { useContext } from "react";
import {  Link } from "react-router-dom";
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import { RealStateContext } from '../App'

const CustomNavbar = () => {

  const { connectedWallet, setConnectedWallet } = useContext(RealStateContext)

  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
    if (accounts) {
      const account = accounts[0];
      setConnectedWallet(account)
      localStorage.setItem("connectedWallet", account);
    }  
  }

  function getConnectButtonOrWalletAddress() {
    if (connectedWallet) {
      return (
        <b class="navbar-text ml-auto">
          Wallet: {connectedWallet}
        </b>
      )
    } else {
      return (
        <MDBBtn onClick={getAccount}>Connect Wallet</MDBBtn>
      )
    }
  }

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
              Buy Tokens
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
        {getConnectButtonOrWalletAddress()}
        
      </div>
    </nav>
  );
};

export default CustomNavbar;