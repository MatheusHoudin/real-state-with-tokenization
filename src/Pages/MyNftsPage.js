import {React, useState, useEffect} from "react";
import CreateNFTForm from "../Form/CreateNFTForm";
import blockchain from "../utils/Blockchain";

const MyNftsPage = () => {

  const [nftBalance, setNftBalance] = useState(0);

  const updateBalance = async () => {
    const balance = await blockchain.nftContract.methods.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266").call()
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