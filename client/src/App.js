import React, { useState, useEffect } from "react";
import Region from "./pages/Region";

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
        <div>
            <CurrencyContext.Provider value={{ currency: currency, setCurrency: setCurrency }}>
                <Region />
            </CurrencyContext.Provider>
            
        {/* {typeof backendData.users === "undefined" ? (
            <p>Loading...</p>
        ) : (
            backendData.users.map((user, i) => (
            <p key={i} className="text-3xl font-bold underline">
                {user}
            </p>
            ))
        )} */}
        </div>
    );
}

export default App;
