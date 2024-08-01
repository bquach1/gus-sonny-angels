import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../components/navbar';

const Profile = () => {
    const items = useSelector((state) => state.items.items);
    const favorites = useSelector((state) => state.favorites.favorites);

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column", margin: "0 auto", alignItems: "center", backgroundColor: "#ADD8E6", width: "50%", marginTop: "15%", padding: 50, borderRadius: 10, border: "2px solid black" }}>
                <span style={{ fontSize: 30, fontWeight: 600, }}>Personal Stats</span>
                <span>Total Collected Sonny Angels: {items.length}</span>
                <span>Favorite Sonny Angels: {favorites.map((favorite, index) => <span key={`${favorite - index}`}>{favorite.caption}{index !== favorites.length - 1 && ","} </span>)}</span>
            </div>
        </div>
    );
};

export default Profile;