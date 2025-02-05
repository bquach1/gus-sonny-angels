import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Collections from "./screens/collections";
import MyAngels from "./screens/myAngels";
import Profile from "./screens/profile";
import Login from "./screens/login";
import Register from "./screens/register";
import Navbar from "./components/navbar";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <Navbar profileImage={profileImage} />
      <Routes>
        <Route path="/" element={<Collections email={email} />} />
        <Route path="/list" element={<MyAngels />} />
        <Route
          path="/profile"
          element={
            <Profile
              authToken={authToken}
              firstName={firstName}
              lastName={lastName}
              profileImage={profileImage}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              handleAuthTokenChange={setAuthToken}
              handleFirstNameChange={setFirstName}
              handleLastNameChange={setLastName}
              handleProfileImageChange={setProfileImage}
              handleEmailChange={setEmail}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
