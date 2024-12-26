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
import Editlisting from "../Pages/host/Editlisting";
import Addlisting from "../Pages/host/Addlisting";
import Profile from "../Pages/user/Profile";
import Search from "../Pages/user/Search";
import Details from "../Pages/user/Details";
import Navbar2 from "../components/Layout/Navbar2";
import Wishlist from "../Pages/user/Wishlist";
import Payment from "../Pages/user/Payment";
import Paymentnavbar from "../components/Layout/paymentnavbar";
import BookSucces from "../Pages/user/BookSucces";
import Bookingdtls from "../Pages/user/Bookingdtls";
import Allbookings from "../Pages/user/Allbookings";
import Hostdtls from "../Pages/user/Hostdtls";

function Router() {
  const location = useLocation();

  let NavbarComponent;
  if (location.pathname.startsWith("/host")) {
    NavbarComponent = HostNavbar;
  } else if (location.pathname.startsWith("/details") || location.pathname.startsWith("/wishlist")|| location.pathname.startsWith("/user")|| location.pathname.startsWith("/viewhost")) {
    NavbarComponent = Navbar2;
  } else if (location.pathname.startsWith("/payment")){
    NavbarComponent=Paymentnavbar;
  } else {
    NavbarComponent = Navbar;
  }

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<New />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Beach" element={<Beach />} />
        <Route path="/Mountains" element={<Mountain />} />
        <Route path="/Snowfall" element={<Snowfall />} />
        <Route path="/Pools" element={<Pools />} />
        <Route path="/Boating" element={<Boating />} />
        <Route path="/host-home" element={<Home />} />
        <Route path="/host-listing" element={<Hostlisting />} />
        <Route path="/host-listedit/:id" element={<Editlisting />} />
        <Route path="/host-addlist" element={<Addlisting />} />
        <Route path="/serched" element={<Search />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="payment-success/:sessionid" element={<BookSucces/>}/>
        <Route path="/user-Booking/:id" element={<Bookingdtls/>} />
        <Route path="/user-allbooking" element={<Allbookings/>}/>
        <Route path="/viewhost/:id" element={<Hostdtls/>}/>
      </Routes>
    </div>
  );
}

export default Router;
