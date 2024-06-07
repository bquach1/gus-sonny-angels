import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Collections from "./screens/collections";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Collections />} />
      </Routes>
    </div>
  );
}

export default App;
