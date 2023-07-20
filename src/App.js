import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import CustomNavBar from "./Navigation/CustomNavBar";
import DiscoverPage from "./Pages/DiscoverPage";
import MyNftsPage from "./Pages/MyNftsPage";
import RentPage from "./Pages/RentPage";
import blockchain from "./utils/Blockchain";

const App = () =>{
    
    const [getContractOwner, setContractOwner] = useState("");

    useEffect(() => {
        const fetchOwner = async () => {
            await fetchContractOwner();
        }

        fetchOwner().catch(console.error);
    }, []);

    const fetchContractOwner = async () => {
        const owner = await blockchain.nftContract.methods.owner().call();
        setContractOwner(owner);
    }

    return (
        <div>
            <CustomNavBar walletAddress = {getContractOwner}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={
                        <DiscoverPage />
                    } />
                    <Route path='/mynfts' element={
                        <MyNftsPage />
                    } />
                    <Route path='/rent' element={
                        <RentPage />
                    } />
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App