import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import air from "../../assets/air.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUmbrellaBeach,
  faWater,
  faHotel,
  faSnowflake,
  faCampground,
  faShip,
  faPalette,
  faStar,
  faFire,
  faHouse,
  faTowerObservation,
  faCity,
  faGolfBallTee,
  faCaravan,
  faMountain,
  faBed,} from "@fortawesome/free-solid-svg-icons";
import DialogWithForm from "../ui/Logindrop";
import DialogWithreForm from "../ui/Registerdrop";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Store/slices/Userslice";


const Navbar = () => {
  const { user } = useSelector((state) => state.User)
  const dispatch = useDispatch()
  console.log("user", user);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redialogOpen, setreDialogOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
            <span
              className="self-center md:text-3xl font-semibold whitespace-nowrap"
              id="logo"
            >
              ownbnb
            </span>
          </div>

          <div className="flex justify-center md:space-x-7 p-2 pl-7 items-center border rounded-full shadow-sm hover:cursor-pointer">
            <div className="text-center">
              <span className="text-gray-600 font-semibold ">Anywhere</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600 font-semibold border-l-2 border-r-2 pl-3 pr-3">
                Any week
              </span>
            </div>
            <div className="text-center">
              <span className="text-gray-600 font-semibold">Add guest</span>
            </div>
            <button className="text-center border rounded-full bg-rose-500 p-2">
              <FaSearch size={17} className="text-white" />
            </button>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {user?(<Link to={"/host-home"} className="font-semibold text-sm ">swich to hosting</Link>):(null)}
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
                          <Link  onClick={toggleDropdown}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                           
                          >
                            Notifications
                          </Link>
                        </li>
                        <li>
                          <Link  onClick={toggleDropdown}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Bookings
                          </Link>
                        </li>
                        <li>
                          <Link  onClick={toggleDropdown}
                            className="block px-4 font-semibold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        
                          >
                            Wishlist
                          </Link>
                        </li>
                        <div className="border-b-2"></div>
                        <li>
                          <Link  onClick={toggleDropdown}
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

      <div
        className="w-screen flex overflow-x-scroll snap-x snap-mandatory bg-white scrollbar shadow-sm"
        id="scrollbar-none"
      >
        {[
          { icon: <FontAwesomeIcon icon={faStar} />, name: "New", path: "/" },
          {
            icon: <FontAwesomeIcon icon={faFire} />,
            name: "Trending",
            path: "/Trending",
          },
          {
            icon: <FontAwesomeIcon icon={faUmbrellaBeach} />,
            name: "Beach",
            path: "/Beach",
          },
          {
            icon: <FontAwesomeIcon icon={faMountain} />,
            name: "Mountains",
            path: "/Mountains",
          },
          {
            icon: <FontAwesomeIcon icon={faSnowflake} />,
            name: "Snowfall",
            path: "/Snowfall",
          },
          {
            icon: <FontAwesomeIcon icon={faWater} />,
            name: "Pools",
            path: "/Pools",
          },

          {
            icon: <FontAwesomeIcon icon={faShip} />,
            name: "Boating",
            path: "/Boating",
          },
          {
            icon: <FontAwesomeIcon icon={faHotel} />,
            name: "Hotels",
            path: "/Hotels",
          },
          {
            icon: <FontAwesomeIcon icon={faBed} />,
            name: "Rooms",
            path: "/Rooms",
          },
          {
            icon: <FontAwesomeIcon icon={faCaravan} />,
            name: "Camping",
            path: "/Camping",
          },
          {
            icon: <FontAwesomeIcon icon={faCampground} />,
            name: "Campset",
            path: "/Campset",
          },
          {
            icon: <FontAwesomeIcon icon={faHouse} />,
            name: "Huts",
            path: "/Huts",
          },
          {
            icon: <FontAwesomeIcon icon={faTowerObservation} />,
            name: "Towers",
            path: "/Towers",
          },
          {
            icon: <FontAwesomeIcon icon={faCity} />,
            name: "Cities",
            path: "/Cities",
          },
          {
            icon: <FontAwesomeIcon icon={faGolfBallTee} />,
            name: "Golfplay",
            path: "/Golfplay",
          },
          {
            icon: <FontAwesomeIcon icon={faPalette} />,
            name: "Creative",
            path: "/Creative",
          },
        ].map((text, index) => (
          <div
            key={index}
            className="snap-center flex-shrink-0 h-20 flex items-center justify-center"
          >
            <div className="h-full w-28 flex flex-col justify-center items-center text-gray-500 hover:text-black cursor-pointer">
              <Link to={text.path} className="mb-1">
                {text.icon}
              </Link>
              <p className="font-semibold text-xs">{text.name}</p>
            </div>
          </div>
        ))}
      </div>

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
