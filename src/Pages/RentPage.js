import {React, useContext, useState, useEffect} from "react";
import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import blockchain from "../utils/Blockchain";
import "../App";
import { RealStateContext } from "../App";

const RentPage = () => {

  const [formData, setFormData] = useState({nftId: 0, rentValue: 0, clientAddress: ""});
  const { connectedWallet, setConnectedWallet } = useContext(RealStateContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleProtertyClient = async (event) => {
    event.preventDefault()
    console.log(formData)
    await setPropertyClient
    ({
      nftId: formData.nftId,
      clientAddress: formData.clientAddress,
      rentValue: formData.rentValue
    });
  };

  const setPropertyClient = async ({
    nftId,
    clientAddress,
    rentValue,
}) => {
  const result = await blockchain.nftContract.methods.setPropertyClient(
    clientAddress,
    nftId,
    rentValue
  ).send({
      from: "0xDc058A4156abda6937CC65DC7a8179120EF74dF6",
  }).catch(err => {
    console.log(err);
  });
  console.log(result);
}

const handlePayRent = async (event) => {
  event.preventDefault()
  const owner = await blockchain.nftContract.methods.propertyClient(0).call()
  console.log(owner)
  await payRent
  ({
    nftId: formData.nftId,
    rentValue: owner.rentValue
  });
};

const payRent = async ({
  nftId,
  rentValue,
}) => {
  const result = await blockchain.nftContract.methods.payRent(
    nftId,
  ).send({
      from: connectedWallet,
      value: rentValue
  }).catch(err => {
    console.log(err);
  });
  console.log(result);
}

const handleWithdraw = async (event) => {
  event.preventDefault()
  await withDrawDividends();
};

const withDrawDividends = async () => {
  const token = await blockchain.nftContract.methods.tokenCoin(0).call();
  const coinContract = new blockchain.web3.eth.Contract(blockchain.realStateCoinAbi, token)
  const result = await coinContract.methods.withdrawDividends().send({
      from: connectedWallet
  }).catch(err => {
    console.log(err);
  });
  console.log(result);
}

  return (
    <div>
      <div>
        <form onSubmit={handleProtertyClient} >
          <MDBInput id='clientAddress' name='clientAddress' wrapperClass='mb-4' label='Client Address' onChange={handleChange} />
          <MDBInput id='nftId' name='nftId' wrapperClass='mb-4' type='number' label='NFT ID' onChange={handleChange} />
          <MDBInput id='rentValue' name='rentValue' wrapperClass='mb-4' type='number' label='Rent Value' onChange={handleChange} />

          <MDBBtn type='submit' className='mb-4' block>
              Set Property Client
              
          </MDBBtn>
        </form>
        <p>
          --------------------------------------------------------
        </p>
        <form onSubmit={handlePayRent} >
          <MDBInput id='nftId' name='nftId' wrapperClass='mb-4' type='number' label='NFT ID' onChange={handleChange} />

          <MDBBtn type='submit' className='mb-4' block>
              Pay Rent
          </MDBBtn>
        </form>
        <p>
          --------------------------------------------------------
        </p>
        <form onSubmit={handleWithdraw} >
          <MDBBtn type='submit' className='mb-4' block>
              Withdraw Dividends
          </MDBBtn>
        </form>
      </div>
    </div>
  );
};

export default RentPage;