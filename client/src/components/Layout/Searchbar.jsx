import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchParams } from "../../Store/slices/Serchaslice";
import Citydrop from "../ui/Citydrop";
import Callender from "../ui/Callender";
import { useDispatch } from "react-redux";
import { FaSearch } from 'react-icons/fa';

function Searchbar() {
  const [selectedCity, setSelectedCity] = useState("Anywhere");
  const [Citydropopen, setdropopen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("Any Date")
  const [callenderOpen, setCallenderOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const togglecitydrop = () => { setdropopen(!Citydropopen) };
  const toggleCallender = () => { setCallenderOpen(!callenderOpen) };
  const toggleGuestDropdown = () => setGuestDropdownOpen(!guestDropdownOpen)
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
    navigate("/serched")
  };

  return (
    <div className="flex justify-center  md:space-x-7 p-2 pl-7 items-center border rounded-full shadow-sm hover:cursor-pointer :w-32">
      <div>
        
      </div>
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
          <div className="absolute z-50 bg-white shadow-lg rounded-md p-2
           mt-2">
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

  )
}

export default Searchbar
