import {React, useState} from "react";
import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import blockchain from "../utils/Blockchain";

const CreateNFTForm = () => {
  const [formData, setFormData] = useState({name: "",symbol: "",totalSupply: 0, lockedAmount: 0, nftUri: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const createNewNFT = async ({
    uri,
    totalSupply,
    lockedAmount,
    tokenName,
    tokenSymbol
}) => {
    const result = await blockchain.nftContract.methods.createNFT(
        uri,
        totalSupply,
        lockedAmount,
        tokenName,
        tokenSymbol
    ).send({
        from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        value: blockchain.web3.utils.toWei(0.05, 'ether')
    });

    console.log(result)
}
  
  const handleSubmit = (event) => {
    alert(`Name: ${formData.name}, Symbol: ${formData.symbol}, Total Supply: ${formData.totalSupply}, Locked Supply: ${formData.lockedAmount}, NFT URi: ${formData.nftUri}`);
    createNewNFT({
      uri: formData.name,
      totalSupply: formData.totalSupply,
      lockedAmount: formData.lockedAmount,
      tokenName: formData.name,
      tokenSymbol: formData.symbol
    })
  };

  blockchain.nftContract.events.NFTMinted()
  .on('data', event => console.log(event));

  return (
    <form onSubmit={handleSubmit} >
        <MDBInput id='name' name='name' wrapperClass='mb-4' label='NFT Name' onChange={handleChange} />
        <MDBInput id='symbol' name='symbol' wrapperClass='mb-4' label='NFT Symbol' onChange={handleChange} />
        <MDBInput label='Total token supply' id='totalSupply' name='totalSupply' type='number' wrapperClass='mb-4' onChange={handleChange} />
        <MDBInput label='Locked amount' id='lockedAmount' name='lockedAmount' type='number' wrapperClass='mb-4' onChange={handleChange} />
        <MDBInput label='NFT URI' id='nftUri' name='nftUri' wrapperClass='mb-4' onChange={handleChange} />

        <MDBBtn type='submit' className='mb-4' block>
            Sign in
        </MDBBtn>
   </form>
  );
};

export default CreateNFTForm;