import {React, useContext, useState} from "react";
import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import blockchain from "../utils/Blockchain";
import "../App";
import { RealStateContext } from "../App";

const BuyTokensPage = () => {

  const [formData, setFormData] = useState({nftId: 0, quantity: 0});
  const { connectedWallet, setConnectedWallet } = useContext(RealStateContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    await buyCoins({
      nftId: formData.nftId,
      quantity: formData.quantity
    });
  };

  const buyCoins = async ({
    nftId,
    quantity,
}) => {
    const coinUnitPriceWei = 100000000000000
    const calculatedQuantity = (quantity * coinUnitPriceWei).toString()
    console.log(calculatedQuantity)
    const result = await blockchain.nftContract.methods.buyCoins(
        nftId,
        connectedWallet,
    ).send({
        from: connectedWallet,
        value: calculatedQuantity
    }).catch(err => {
      console.log(err);
    });

    console.log(result)
}

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <MDBInput id='nftId' name='nftId' wrapperClass='mb-4' type='number' label='NFT ID' onChange={handleChange} />
        <MDBInput id='quantity' name='quantity' wrapperClass='mb-4' type='number' label='Token Quantity' onChange={handleChange} />

        <MDBBtn type='submit' className='mb-4' block>
            Buy Tokens
        </MDBBtn>
      </form>
    </div>
  );
};

export default BuyTokensPage;