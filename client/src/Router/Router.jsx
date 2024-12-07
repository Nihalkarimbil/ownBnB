import React from "react";
import { Routes, Route } from "react-router-dom";
import New from "../Pages/types/New";
import Trending from "../Pages/types/Trending";

function Router() {
  return (
    <div className="container">
      
      <Routes>
        <Route path="/" element={<New/>}/>
        <Route path="/Trending" element={<Trending/>}/>
      </Routes>
    </div>
  );
}

export default Router;
