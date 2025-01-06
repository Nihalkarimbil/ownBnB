import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBars, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import air from "../../assets/air.png";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Store/slices/Userslice";
import { allwish } from "../../Store/slices/Wishlistslice";
import Coroselnav from "./Coroselnav";
import Searchbar from "./Searchbar";
import { BsHouse } from "react-icons/bs";
import { FaAirbnb } from "react-icons/fa";
import LoginPopup from "../ui/Logindpopup";
import Registerpopup from "../ui/Registerpopup";

const Navbar = () => {
  const { user } = useSelector((state) => state.User);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redialogOpen, setreDialogOpen] = useState(false);
  const [Count, setCount] = useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate()
  useEffect(() => {
    console.log('Wishlist:', wishlist);
    dispatch(allwish());
  }, [dispatch]);

  useEffect(() => {
    if (wishlist) {
      const totalCount = wishlist.reduce((acc, item) => acc + (item.Listings?.length || 0), 0);
      setCount(totalCount);
    }
  }, [wishlist, user]);

  const toggleDropdown = () => { setDropdownOpen(!dropdownOpen); };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setDropdownOpen(false);
  };

  const tooggleDialog = () => {
    setreDialogOpen(!redialogOpen);
    setDropdownOpen(false);
  };

  const handlelogout = () => {
    dispatch(logOut());
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      setIsOpen(isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="relative w-screen">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900 w-screen">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {!isOpen ? (<div className="flex items-center space-x-3 rtl:space-x-reverse hover:cursor-pointer">
            <img src={air} className="h-9" alt="Logo" />
            <Link to={"/"} className="self-center md:text-3xl font-semibold whitespace-nowrap" id="logo">ownbnb</Link>
          </div>) : null}

          {isOpen && (
            <Link to={"/"}>
              <img src={air} className="h-9" alt="Logo" />
            </Link>
          )}
          <Searchbar />

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {!isOpen && user && <Link to={"/host-home"} className="font-semibold text-sm">Switch to Hosting</Link>}

            <div className="hidden md:flex items-center space-x-6">
              <div className="text-2xl border border-gray-300 rounded-full p-2 flex space-x-3 hover:shadow-md cursor-pointer relative">
                <FaBars size={18} className="text-gray-600" />
                <div onClick={toggleDropdown} className="relative">
                  {user && user.image ? (
                    <img
                      src={user.image}
                      alt="User Avatar"
                      className="rounded-full w-6 object-cover"
                    />
                  ) : (
                    <FaUserCircle size={20} className="text-gray-600" />
                  )}
                  {user && Count ? (
                    <div className="absolute -top-2 -right-2 border rounded-full bg-red-600 w-4 h-4 text-xs text-white border-white text-center flex items-center justify-center">
                      {Count}
                    </div>
                  ) : (null)}
                </div>
              </div>
              {dropdownOpen && (
                user ? (
                  <div className="absolute lg:right-[135px] sm:right-[14px] mt-[320px] lg:right[12px] bg-white border rounded-lg shadow-md z-10 w-40">
                    <ul className=" py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                      <li>
                        <Link onClick={toggleDropdown} className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Notifications
                        </Link>
                      </li>
                      <li>
                        <Link onClick={toggleDropdown} to={"/user-allbooking"} className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Bookings
                        </Link>
                      </li>
                      <li>
                        <Link onClick={toggleDropdown} to={"/wishlist"} className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Wishlist
                        </Link>
                      </li>
                      <div className="border-b-2"></div>
                      <li>
                        <Link onClick={toggleDropdown} to={"/host-listing"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Your Home
                        </Link>
                      </li>
                      <li>
                        <Link to={"/user-profile"} onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Account
                        </Link>
                      </li>
                      <div className="border-b-2"></div>
                      <li>
                        <button onClick={handlelogout} className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                          Logout
                        </button>
                      </li>
                      <li>
                        <a className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" href="/help">
                          Help Center
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="absolute lg:right-[135px] sm:right-[14px] mt-[175px] lg:right[12px] bg-white border rounded-lg shadow-md z-10 w-40">
                    <ul className=" py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <button onClick={toggleDialog} className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                          Login
                        </button>
                      </li>
                      <li>
                        <button onClick={tooggleDialog} className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                          Sign Up
                        </button>
                      </li>
                      <div className="border-b-2"></div>
                      <li>
                        <a className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" href="/help">
                          Help Center
                        </a>
                      </li>
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Coroselnav />
      {isOpen && (
        <div className="w-full fixed bottom-0 z-50 bg-white shadow-lg border-t border-gray-300 md:hidden">
          <div className="flex justify-around py-4">
            <Link to={"/"} className="flex flex-col items-center">
              <BsHouse size={24} />
              <span className="text-sm">Home</span>
            </Link>
            <Link to={user ? "/user-profile" : "#"} className="flex flex-col items-center">
              {user ? (
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="rounded-full w-6 h-6 object-cover"
                />
              ) : (
                <FaUserCircle size={24} className="text-gray-600" />
              )}
              <span className="text-sm">{!user ? (<button onClick={toggleDialog}>Login</button>) : user?.username}</span>

            </Link>
            <div className="flex flex-col items-center relative">
              <FaAirbnb size={24} className="text-gray-600" />
              <span
                className="text-sm cursor-pointer"
                onClick={!user ? toggleDialog : () => navigate("/user-allbooking")}
              >
                Trips
              </span>
            </div>
            <div className="flex flex-col items-center relative">
              <FaRegHeart size={24} className="text-gray-600" />
              
              <span
                className="text-sm cursor-pointer"
                onClick={!user ? toggleDialog : () => navigate("/wishlist")}
              >
                Wishlist
              </span>
            </div>

          </div>
        </div>
      )}


      <LoginPopup open={dialogOpen} onToggle={toggleDialog} />
      <Registerpopup open={redialogOpen} onToggle={tooggleDialog} />
    </nav>
  );
};

export default Navbar;
