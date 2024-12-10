import React from "react";
import { Routes, Route } from "react-router-dom";
import New from "../Pages/category/New"
import Trending from "../Pages/category/Trending"
import Beach from "../Pages/category/Beach";
import Mountain from "../Pages/category/Mountain";
import Snowfall from "../Pages/category/Snowfall";
import Pools from "../Pages/category/Pools";
import Boating from "../Pages/category/Boating";

function Router() {
  return (
    <div className="container">
      
      <Routes>
        <Route path="/" element={<New/>}/>
        <Route path="/Trending" element={<Trending/>}/>
        <Route path="/Beach" element={<Beach/>}/>
        <Route path="/Mountains" element={<Mountain/>}/>
        <Route path="/Snowfall" element={<Snowfall/>}/>
        <Route path="/Pools" element={<Pools/>}/>
        <Route path="/Boating" element={<Boating/>}/>
      </Routes>
    </div>
  );
}

export default Router;
