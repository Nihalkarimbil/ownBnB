import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import New from "../Pages/category/New";
import Trending from "../Pages/category/Trending";
import Beach from "../Pages/category/Beach";
import Mountain from "../Pages/category/Mountain";
import Snowfall from "../Pages/category/Snowfall";
import Pools from "../Pages/category/Pools";
import Boating from "../Pages/category/Boating";
import Home from "../Pages/host/Home";
import Navbar from "../components/Layout/Navbar";
import HostNavbar from "../components/Layout/HostNavbar";
import Hostlisting from "../Pages/host/Hostlisting";

function Router() {
  const location = useLocation();
  const isHostRoute = location.pathname.startsWith("/host") 

  return (
    <div>
      {isHostRoute ? <HostNavbar /> : <Navbar />}
      
      <Routes>
        <Route path="/" element={<New />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Beach" element={<Beach />} />
        <Route path="/Mountains" element={<Mountain />} />
        <Route path="/Snowfall" element={<Snowfall />} />
        <Route path="/Pools" element={<Pools />} />
        <Route path="/Boating" element={<Boating />} />
        <Route path="/host-home" element={<Home />} />
        <Route path="/host-listing" element={<Hostlisting/>}/>
      </Routes>
    </div>
  );
}

export default Router;
