import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Region from "./pages/Region";
import Home from "./pages/Home";
import Signout from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import GameDetails from "./pages/GameDetails";

export const CurrencyContext = React.createContext(null);

function App() {
    // const [backendData, setBackendData] = useState([{}]);

    // useEffect(() => {
    //     fetch("api")
    //     .then((response) => response.json())
    //     .then((data) => setBackendData(data));
    // }, []);
    const [currency, setCurrency] = useState(null);

    return (
        // <div>
        //     <CurrencyContext.Provider value={{ currency: currency, setCurrency: setCurrency }}>
        //         <Region />
        //     </CurrencyContext.Provider>
            
        // {/* {typeof backendData.users === "undefined" ? (
        //     <p>Loading...</p>
        // ) : (
        //     backendData.users.map((user, i) => (
        //     <p key={i} className="text-3xl font-bold underline">
        //         {user}
        //     </p>
        //     ))
        // )} */}
        // </div>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<Signout />} />
                <Route path="/games/:gameId" element={<GameDetails />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
