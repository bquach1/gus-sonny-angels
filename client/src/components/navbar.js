import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileImage = styled.img`
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`

const Navbar = ({ profileImage }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        fontSize: 40,
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        backgroundColor: "#FFD580",
        borderBottom: "1px solid black",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {profileImage ? (
        <ProfileImage
          style={{
            position: "absolute",
            left: 50,
            fontSize: 50,
            width: 50,
            height: 50,
            borderRadius: "100%",
          }}
          src={profileImage}
          alt="Profile icon"
          onClick={() => navigate("/profile")}
        />
      ) : (
        <AccountCircleIcon
          style={{ position: "absolute", left: 50, fontSize: 50 }}
          onClick={() => navigate("/profile")}
        />
      )}
      <div>Gus' Sonny Angel Collectors' Log</div>
      <MenuIcon
        style={{ position: "absolute", right: 50, fontSize: 50 }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/");
          }}
        >
          Collection Log
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/list");
          }}
        >
          My Angels
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
