import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import air from "../../assets/air.png";
import DialogWithForm from "../ui/Logindpopup";
import DialogWithreForm from "../ui/Registerpopup";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Store/slices/Userslice";

import Coroselnav from "./Coroselnav";
import Searchbar from "./Searchbar";



const Navbar = () => {
  const { user } = useSelector((state) => state.User)
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redialogOpen, setreDialogOpen] = useState(false);
  const dispatch = useDispatch()


  const toggleMenu = () => { setIsOpen(!isOpen) };
  const toggleDropdown = () => { setDropdownOpen(!dropdownOpen) };
  
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

  

  return (

    <nav className="relative w-screen">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900 w-screen">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse hover:cursor-pointer">
            <img src={air} className="h-9" alt="Logo" />
            <Link to={"/"}
              className="self-center md:text-3xl font-semibold whitespace-nowrap"
              id="logo"
            > ownbnb
            </Link>
          </div>

          <Searchbar/>

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
                          <Link onClick={toggleDropdown} to={"/wishlist"}
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
                          <Link to={"/user-profile"}
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
