import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Collections from "./screens/collections";
import MyAngels from "./screens/myAngels";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/list" element={<MyAngels />} />
      </Routes>
    </div>
  );
}

export default App;
