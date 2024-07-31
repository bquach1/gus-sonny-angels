import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from 'react-redux';
import StarsIcon from '@mui/icons-material/Stars';

const MyAngels = () => {

  const items = useSelector((state) => state.items);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", margin: "0 auto", alignItems: "center" }}>
        <h2 style={{ padding: 10 }}>Current Sonny Angels</h2>
        <div>
          {items.items.map((figure, index) => (
            <div className="figure-card" key={index}>
              <StarsIcon
                style={{ position: "absolute", top: 10, right: 10, color: "#FFD700" }}
                onClick={() => console.log("click")}
              />
              <img src={figure.image} alt={`Sonny Angel figure ${index}`} />
              <p>{figure.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAngels;
