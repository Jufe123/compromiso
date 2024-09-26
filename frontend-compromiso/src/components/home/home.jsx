// home.jsx
import React from 'react';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import Home_init from '../home-init/Contend-Home.jsx';

const Home = () => {
    return (
        <>
            <NavMenuPublic />
            <div style={{ marginTop: "80px" }}>
                <Home_init />
            </div>
        </>
    );
};

export default Home;
