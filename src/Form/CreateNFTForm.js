import {React, useState} from "react";
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';

const CreateNFTForm = () => {
  const [formData, setFormData] = useState({name: "",symbol: "",totalSupply: 0, lockedAmount: 0, nftUri: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${formData.name}, Symbol: ${formData.symbol}, Total Supply: ${formData.totalSupply}, Locked Supply: ${formData.lockedAmount}, NFT URi: ${formData.nftUri}`);
  };
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