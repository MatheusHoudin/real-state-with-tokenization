import {React, useState, useContext, useEffect} from "react";
import CreateNFTForm from "../Form/CreateNFTForm";
import blockchain from "../utils/Blockchain";
import { RealStateContext } from "../App";

const MyNftsPage = () => {

  const [nftBalance, setNftBalance] = useState(0);
  const [walletNfts, setWalletNfts] = useState([]);
  const { connectedWallet, setConnectedWallet } = useContext(RealStateContext);

  const updateBalance = async () => {
    const balance = await blockchain.nftContract.methods.balanceOf(connectedWallet).call()

    setNftBalance(balance)
  };

  const fetchUserNfts = async () => {
    blockchain.alchemy.nft.getNftsForOwner(connectedWallet, {
      contractAddresses: ['0x49b74EaFB05Df38354F81EcB3854035c2cB2A4BF']
    })
    .then(async (nfts) => {
      const nftsResult = nfts.ownedNfts.map(async (element) => {
        return {
          tokenId: element.tokenId,
          metadataError: element.metadataError,
          metadata: element.rawMetadata 
        };
      });
      nfts
      setWalletNfts(nftsResult)
    })
  }

  useEffect(()=>{
		updateBalance();
    fetchUserNfts();
	}, [])

  return (
    <div>
        <CreateNFTForm updateBalance={updateBalance}/>
        <strong>{"NFT Balance: " + nftBalance}</strong>
    </div>
  );
};

export default MyNftsPage;