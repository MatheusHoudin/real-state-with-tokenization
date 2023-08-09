import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import CustomNavBar from "./Navigation/CustomNavBar";
import DiscoverPage from "./Pages/DiscoverPage";
import MyNftsPage from "./Pages/MyNftsPage";
import RentPage from "./Pages/RentPage";

export const RealStateContext = React.createContext(null);

const App = () =>{
    
    const [connectedWallet, setConnectedWallet] = useState(localStorage["connectedWallet"]);

    return (
        <div>
            <RealStateContext.Provider value={{ connectedWallet, setConnectedWallet }}>
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