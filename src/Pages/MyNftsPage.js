import {React, useState, useContext, useEffect} from "react";
import CreateNFTForm from "../Form/CreateNFTForm";
import blockchain from "../utils/Blockchain";
import { RealStateContext } from "../App";

const MyNftsPage = () => {

  const [nftBalance, setNftBalance] = useState(0);
  const { connectedWallet, setConnectedWallet } = useContext(RealStateContext);

  const updateBalance = async () => {
    const balance = await blockchain.nftContract.methods.balanceOf(connectedWallet).call()
    setNftBalance(balance)
  };

  useEffect(()=>{
		updateBalance();
	}, [])

  return (
    <div>
        <CreateNFTForm updateBalance={updateBalance}/>
        <strong>{"NFT Balance: " + nftBalance}</strong>
    </div>
  );
};

export default MyNftsPage;