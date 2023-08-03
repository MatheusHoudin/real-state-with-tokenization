import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import CustomNavBar from "./Navigation/CustomNavBar";
import DiscoverPage from "./Pages/DiscoverPage";
import MyNftsPage from "./Pages/MyNftsPage";
import RentPage from "./Pages/RentPage";
import blockchain from "./utils/Blockchain";

export const RealStateContext = React.createContext(null);

const App = () =>{
    
    const [getConnectedWallet, setConnectedWallet] = useState(localStorage["connectedWallet"]);

    return (
        <div>
            <RealStateContext.Provider value={{ getConnectedWallet, setConnectedWallet }}>
                <CustomNavBar/>
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
            </RealStateContext.Provider>
            
        </div>

    )
}

export default App