import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import air from "../assets/air.png";
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
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import DialogWithForm from "../components/ui/Logindrop";
import DialogWithreForm from "../components/ui/Registerdrop";
const Navbar = () => {
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
    setDialogOpen(!dialogOpen)
    setDropdownOpen(false);
  };

  const tooggleDialog = () => {
    setreDialogOpen(!redialogOpen)
    setDropdownOpen(false);
  };


  return (
    <nav className="relative">
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={air} className="h-9" alt="Logo" />
            <span
              className="self-center text-3xl font-semibold whitespace-nowrap"
              id="logo"
            >
              ownbnb
            </span>
          </a>

          <div className="flex justify-center space-x-7 p-2 pl-7 items-center border rounded-full shadow-sm">
            <div className="text-center">
              <span className="text-gray-600 font-semibold">Anywhere</span>
            </div>
            <div className="text-center">
              <span className="text-gray-600 font-semibold border-l-2 border-r-2 pl-3 pr-3">
                Any week
              </span>
            </div>
            <div className="text-center">
              <span className="text-gray-600 font-semibold">Add guest</span>
            </div>
            <div className="text-center border rounded-full bg-rose-500 p-2">
              <FaSearch size={17} className="text-white" />
            </div>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
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
                <div className="absolute right-[145px] mt-[175px] bg-white border rounded-lg shadow-md z-10 w-40">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button
                        onClick={toggleDialog}
                        className="block px-4 font-bold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={tooggleDialog}
                        className="block px-4 font-bold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                      >
                        Sign up
                      </button>
                    </li>
                    <div className="border-b-2"></div>
                    <li>
                      <a
                        className="block px-4 font-bold py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Help Center
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex overflow-x-scroll snap-x snap-mandatory bg-white scrollbar shadow-sm" id="scrollbar-none">
        {[
          { icon: <FontAwesomeIcon icon={faStar} />, name: "New" },
          { icon: <FontAwesomeIcon icon={faFire} />, name: "Trending" },
          { icon: <FontAwesomeIcon icon={faBed} />, name: "Rooms" },
          { icon: <FontAwesomeIcon icon={faUmbrellaBeach} />, name: "Beach" },
          { icon: <FontAwesomeIcon icon={faMountain} />, name: "Mountains" },
          { icon: <FontAwesomeIcon icon={faSnowflake} />, name: "Snowfall" },
          { icon: <FontAwesomeIcon icon={faWater} />, name: "Pools" },
          { icon: <FontAwesomeIcon icon={faShip} />, name: "Boating" },
          { icon: <FontAwesomeIcon icon={faHotel} />, name: "Hotels" },
          { icon: <FontAwesomeIcon icon={faCaravan} />, name: "Camping" },
          { icon: <FontAwesomeIcon icon={faCampground} />, name: "Campset" },
          { icon: <FontAwesomeIcon icon={faHouse} />, name: "Huts" },
          { icon: <FontAwesomeIcon icon={faTowerObservation} />, name: "Towers" },
          { icon: <FontAwesomeIcon icon={faCity} />, name: "Cities" },
          { icon: <FontAwesomeIcon icon={faGolfBallTee} />, name: "Golfplay" },
          { icon: <FontAwesomeIcon icon={faPalette} />, name: "Creative" },
        ].map((text, index) => (
          <div
            key={index}
            className="snap-center flex-shrink-0 h-20 flex items-center justify-center"
          >
            <div className="h-full w-28 flex flex-col justify-center items-center text-gray-500 hover:text-black cursor-pointer">
              <p className="mb-1">{text.icon}</p>
              <p className="font-semibold text-xs">{text.name}</p>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="absolute top-0 right-0 w-3/4 bg-white border-t-2 border-gray-300 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            <button className="w-full py-2 text-center text-lg font-semibold text-gray-700">
              Login
            </button>
            <button className="w-full py-2 text-center text-lg font-semibold text-gray-700">
              Sign Up
            </button>
          </div>
        </div>
      )}

      
      <DialogWithForm open={dialogOpen} onToggle={toggleDialog} />
      <DialogWithreForm open={redialogOpen} onToggle={tooggleDialog}/>
    </nav>
  );
};

export default Navbar;
