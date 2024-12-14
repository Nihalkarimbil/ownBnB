import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import air from "../../assets/air.png";
import DialogWithForm from "../ui/Logindpopup";
import DialogWithreForm from "../ui/Registerpopup";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Store/slices/Userslice";
import Citydrop from "../ui/Citydrop";
import Callender from "../ui/Callender";
import Coroselnav from "../ui/Coroselnav";
import { SearchParams } from "../../Store/slices/Serchaslice";


const Navbar = () => {
  const { user } = useSelector((state) => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redialogOpen, setreDialogOpen] = useState(false);
  const [Citydropopen, setdropopen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Anywhere");
  const [selectedDate, setSelectedDate] = useState("Any Date")
  const [callenderOpen, setCallenderOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false)



  const toggleMenu = () => { setIsOpen(!isOpen) };
  const toggleDropdown = () => { setDropdownOpen(!dropdownOpen) };
  const togglecitydrop = () => { setdropopen(!Citydropopen) };
  const toggleCallender = () => { setCallenderOpen(!callenderOpen) };
  const toggleGuestDropdown = () => setGuestDropdownOpen(!guestDropdownOpen)
  

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setDropdownOpen(false);
  };

  const tooggleDialog = () => {
    setreDialogOpen(!redialogOpen);
    setDropdownOpen(false);
  };
  const handlelogout = () => {
    dispatch(logOut())
    setDropdownOpen(!dropdownOpen)
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setdropopen(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCallenderOpen(false);
  };


  const incrementGuest = () => setGuestCount(guestCount + 1);
  const decrementGuest = () => {
    if (guestCount > 0) setGuestCount(guestCount - 1);
  };
 
  const handleSearch = () => {
    dispatch(SearchParams({ City: selectedCity, Date: selectedDate, Count: guestCount }));
    setSelectedCity("Anywhere")
    setSelectedDate("Any Date")
    setGuestCount(0)
    setGuestDropdownOpen(false)
    navigate("serched")
  };

  return (
    <nav className="relative w-screen">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900 w-screen">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse hover:cursor-pointer">
            <img src={air} className="h-9" alt="Logo" />
            <span
              className="self-center md:text-3xl font-semibold whitespace-nowrap"
              id="logo"
            > ownbnb
            </span>
          </div>

          <div className="flex justify-center md:space-x-7 p-2 pl-7 items-center border rounded-full shadow-sm hover:cursor-pointer">
            <button className="text-center relative" onClick={togglecitydrop}>
              <span className="text-gray-600 font-semibold">{selectedCity}</span>
              <Citydrop open={Citydropopen} onToggle={togglecitydrop} onSelect={handleCitySelect} />
            </button>
            <div className="relative text-center">
              <button
                onClick={toggleCallender}
                className="text-gray-600 font-semibold border-l-2 border-r-2 pl-3 pr-3"
              >
                {selectedDate}
              </button>
              {callenderOpen && (
                <div className="absolute z-10 bg-white shadow-lg rounded-md p-4 mt-2">
                  <Callender onDateSelect={handleDateSelect} />
                </div>
              )}
            </div>
            <div className="relative text-center">
              <button
                onClick={toggleGuestDropdown}
                className="text-gray-600 font-semibold"
              >
                {guestCount > 0 ? `${guestCount} Guests` : "Add guest"}
              </button>
              {guestDropdownOpen && (
                <div className="absolute z-10 bg-white shadow-lg rounded-md p-4 mt-2 w-48">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Guests</span>
                    <div className="flex space-x-3 items-center">
                      <button
                        onClick={decrementGuest}
                        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{guestCount}</span>
                      <button
                        onClick={incrementGuest}
                        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="text-center border rounded-full bg-rose-500 p-2" onClick={handleSearch}>
              <FaSearch size={17} className="text-white" />
            </button>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {user ? (<Link to={"/host-home"} className="font-semibold text-sm ">swich to hosting</Link>) : (null)}
            <button
              className="text-gray-700 dark:text-white md:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-2xl border border-gray-300 rounded-full p-2 flex space-x-3 hover:shadow-md cursor-pointer">
                <FaBars size={18} className="text-gray-600" />
                <FaUserCircle
                  size={20}
                  className="text-gray-600"
                  onClick={toggleDropdown}
                />
              </div>
              {dropdownOpen && (
                user ? (
                  <>
                    <div className="absolute lg:right-[135px] sm:right-[14px] mt-[320px] lg:right[12px] bg-white border rounded-lg shadow-md z-10 w-40">
                      <ul className=" py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                        <li>
                          <Link onClick={toggleDropdown}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"

                          >
                            Notifications
                          </Link>
                        </li>
                        <li>
                          <Link onClick={toggleDropdown}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Bookings
                          </Link>
                        </li>
                        <li>
                          <Link onClick={toggleDropdown}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"

                          >
                            Wishlist
                          </Link>
                        </li>
                        <div className="border-b-2"></div>
                        <li>
                          <Link onClick={toggleDropdown}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Your Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block px-4  py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Account
                          </Link>
                        </li>
                        <div className="border-b-2"></div>
                        <li>
                          <button
                            onClick={handlelogout}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                          >
                            Logout
                          </button>
                        </li>

                        <li>
                          <a
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            href="/help"
                          >
                            Help Center
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute lg:right-[135px] sm:right-[14px] mt-[175px] lg:right[12px] bg-white border rounded-lg shadow-md z-10 w-40">
                      <ul className=" py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button
                            onClick={toggleDialog}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                          >
                            Login
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={tooggleDialog}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                          >
                            Sign up
                          </button>
                        </li>
                        <div className="border-b-2"></div>
                        <li>
                          <a
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            href="/help"
                          >
                            Help Center
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Coroselnav/>
      {isOpen && (
        <div className="absolute top-1 right-1 w-36 bg-white shadow-lg border rounded-lg border-gray-300 md:hidden">
          <div className="flex flex-col items-center py-4 ">
            <button
              className="w-full  text-center text-md font-semibold border-b-2 text-gray-700"
              onClick={toggleDialog}
            >
              Login
            </button>
            <button
              className="w-full  text-center text-md font-semibold text-gray-700"
              onClick={tooggleDialog}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      <DialogWithForm open={dialogOpen} onToggle={toggleDialog} />
      <DialogWithreForm open={redialogOpen} onToggle={tooggleDialog} />
    </nav>
  );
};

export default Navbar;
