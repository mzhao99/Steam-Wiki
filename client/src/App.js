import React, { useState, useEffect } from "react";

function App() {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("api")
        .then((response) => response.json())
        .then((data) => setBackendData(data));
    }, []);
    return (
        <div>
        {typeof backendData.users === "undefined" ? (
            <p>Loading...</p>
        ) : (
            backendData.users.map((user, i) => (
            <p key={i} className="text-3xl font-bold underline">
                {user}
            </p>
            ))
        )}
        </div>
    );
}

export default App;
