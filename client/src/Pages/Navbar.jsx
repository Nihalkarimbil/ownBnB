import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import air from "../assets/air.png"; // Logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const bgColors = [
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
  ];

  return (
    <nav className="relative">
      {/* Navbar Section */}
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo Section */}
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={air} className="h-9" alt="Logo" />
            <span
              className="self-center text-3xl font-semibold whitespace-nowrap"
              id="logo"
            >
              ownbnb
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* Mobile Menu Button */}
            <button
              className="text-gray-700 dark:text-white md:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="hidden md:flex items-center space-x-6">
              {/* Search Icon */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <FaSearch size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="ml-2 bg-transparent border-none outline-none"
                />
              </div>
              {/* User Icon */}
              <div className="text-2xl border border-gray-300 rounded-full p-2 flex space-x-3 hover:shadow-md cursor-pointer">
                <FaBars size={18} className="text-gray-600"/>
                <FaUserCircle size={20} className="text-gray-600"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full flex overflow-x-scroll snap-x snap-mandatory bg-slate-300 scrollbar" id="scrollbar-none">
        {[
          "First slide",
          "Second slide",
          "Third slide",
          "Fourth slide",
          "Fifth slide",
          "Sixth slide",
          "First slide",
          "Second slide",
          "Third slide",
          "Fourth slide",
          "Fifth slide",
          "First slide",
          "Second slide",
         
        ].map((text, index) => (
          <div
            key={index}
            className="snap-center flex-shrink-0  h-20 flex items-center justify-center"
          >
            <div
              className={`h-full w-36 flex justify-center items-center ${
                bgColors[index % bgColors.length]
              }`}
            >
              <p className="text-gray-800">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
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
    </nav>
  );
};

export default Navbar;
