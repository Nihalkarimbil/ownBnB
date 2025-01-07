import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import New from "../Pages/Users/category/New";
import Trending from "../Pages/Users/category/Trending";
import Beach from "../Pages/Users/category/Beach";
import Mountain from "../Pages/Users/category/Mountain";
import Snowfall from "../Pages/Users/category/Snowfall";
import Pools from "../Pages/Users/category/Pools";
import Boating from "../Pages/Users/category/Boating";
import Home from "../Pages/Users/host/Home";
import Navbar from "../components/Layout/Navbar";
import HostNavbar from "../components/Layout/HostNavbar";
import Hostlisting from "../Pages/Users/host/Hostlisting";
import Editlisting from "../Pages/Users/host/Editlisting";
import Addlisting from "../Pages/Users/host/Addlisting";
import Profile from "../Pages/Users/user/Profile";
import Search from "../Pages/Users/user/Search";
import Details from "../Pages/Users/user/Details";
import Navbar2 from "../components/Layout/Navbar2";
import Wishlist from "../Pages/Users/user/Wishlist";
import Payment from "../Pages/Users/user/Payment";
import Paymentnavbar from "../components/Layout/Paymentnavbar";
import BookSucces from "../Pages/Users/user/BookSucces";
import Bookingdtls from "../Pages/Users/user/Bookingdtls";
import Allbookings from "../Pages/Users/user/Allbookings";
import Hostdtls from "../Pages/Users/user/Hostdtls";
import Reservations from "../Pages/Users/host/Reservations";
import ProtectedRoute from "../Protectedroute";
import { useSelector } from "react-redux";
import Dashbord from "../Pages/Admin/Dashbord";
import Footer from "../components/Layout/Footer";
import AdmNavbar from "../Pages/Admin/layout/Navbar";
import Sidebar from "../Pages/Admin/layout/Sidebar";
import Listings from "../Pages/Admin/Listings";
import Pendinglists from "../Pages/Admin/Pendinglists";
import AdmlistDetails from "../Pages/Admin/AdmlistDetails";
import Users from "../Pages/Admin/Users";
import AdmUserdtls from "../Pages/Admin/AdmUserdtls";
import BlockedUsers from "../Pages/Admin/BlockedUsers";
import CreateList from "../Pages/Admin/Createlist";
import Hosts from "../Pages/Admin/Hosts";
import Hostdetails from "../Pages/Admin/Hostdetails";
import Reservation from "../Pages/Admin/Reservation";
import Reservdtls from "../Pages/Admin/Reservdtls";
import PendigRserv from "../Pages/Admin/PendigRserv";


function Router() {
  const location = useLocation();
  const user = useSelector((state) => state.User.user);

  let NavbarComponent;
  if (location.pathname.startsWith("/host")) {
    NavbarComponent = HostNavbar;
  } else if (location.pathname.startsWith("/details") || location.pathname.startsWith("/wishlist") || location.pathname.startsWith("/user") || location.pathname.startsWith("/viewhost")) {
    NavbarComponent = Navbar2;
  } else if (location.pathname.startsWith("/payment")) {
    NavbarComponent = Paymentnavbar;
  } else {
    NavbarComponent = Navbar;
  }

  return (
    <>
      {!user?.admin ? (
        <>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<New />} />
            <Route path="/Trending" element={<Trending />} />
            <Route path="/Beach" element={<Beach />} />
            <Route path="/Mountains" element={<Mountain />} />
            <Route path="/Snowfall" element={<Snowfall />} />
            <Route path="/Pools" element={<Pools />} />
            <Route path="/Boating" element={<Boating />} />
            <Route path="/host-listing" element={
              <ProtectedRoute>
                <Hostlisting />
              </ProtectedRoute>} />
            <Route path="/host-listedit/:id" element={
              <ProtectedRoute>
                <Editlisting />
              </ProtectedRoute>} />

            <Route path="/host-addlist" element={
              <ProtectedRoute>
                <Addlisting />
              </ProtectedRoute>} />

            <Route path="host-reservation" element={
              <ProtectedRoute>
                <Reservations />
              </ProtectedRoute>} />

            <Route path="/host-home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />

            <Route path="/serched" element={<Search />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="payment-success/:sessionid" element={<BookSucces />} />
            <Route path="/user-Booking/:id" element={<Bookingdtls />} />
            <Route path="/user-allbooking" element={<Allbookings />} />
            <Route path="/viewhost/:id" element={<Hostdtls />} />

          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <AdmNavbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashbord />} />
            <Route path="/Admin-listing" element={<Listings />} />
            <Route path="/Admin-pendinglist" element={<Pendinglists />} />
            <Route path="/item-details/:id" element={<AdmlistDetails/>}/>
            <Route path="/Admin-User" element={<Users/>} />
            <Route path="/Admin-userby/:id" element={<AdmUserdtls/>}/>
            <Route path="/Blockedusers" element={<BlockedUsers/>}/>
            <Route path="/Create-listing" element={<CreateList />} />
            <Route path="/Admin-hosts" element={<Hosts/>}/>
            <Route path="/Admin-hostby/:id" element={<Hostdetails/>}/>
            <Route path="/Admin-Reservation" element={<Reservation/>}/>
            <Route path="/Admin-Reservationby/:id" element={<Reservdtls/>}/>
            <Route path="/pendingreserv" element={<PendigRserv/>}/>
          </Routes>
        </>
      )}

    </>
  );
}

export default Router;
