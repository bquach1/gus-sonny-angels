import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from 'react-redux';
import StarsIcon from '@mui/icons-material/Stars';
import { addFavorite } from '../actions';

const MyAngels = () => {

  const items = useSelector((state) => state.items);
  const wishlist = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const handleAddFavorite = (newCaption, newImage) => {
    const newFavorite = { caption: newCaption, image: newImage };
    dispatch(addFavorite(newFavorite));
  }

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
                onClick={() => handleAddFavorite(figure.caption, figure.image)}
              />
              <img src={figure.image} alt={`Sonny Angel figure ${index}`} />
              <p>{figure.caption}</p>
            </div>
          ))}
        </div>
        <h2 style={{ padding: 10 }}>Sonny Angel Wishlist</h2>
        <div>
          {wishlist.wishlist.map((figure, index) => (
            <div className="figure-card" key={index}>
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
