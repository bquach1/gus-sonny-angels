import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Collections from "./screens/collections";
import MyAngels from "./screens/myAngels";
import Profile from "./screens/profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/list" element={<MyAngels />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
