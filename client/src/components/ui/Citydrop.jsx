import React from "react";

function Citydrop({ open, onToggle, onSelect }) {
  if (!open) {
    return null;
  }

  const cities = [
    "shillong",
    "wayanad",
    "himachal",
    "ooty",
    "pune",
    "goa",
    "kerala",
    "mumbai",
    "lakshadweep",
    "manali",
    "munnar",
    "leh",
    "ladakh",
    "kashmir",
    "kodaikanal",
    "bangalore",
    "delhi",
    "alappuzha",
  ];

  return (
    <div
      className="absolute rounded-md shadow-lg z-10 mt-2 bg-white w-64  overflow-hidden transform transition-all ease-in-out duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      <select
        id="city"
        name="city"
        className="block p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-gray-500 bg-gray-100 text-gray-800 transition-all ease-in-out duration-200 hover:bg-blue-50 scrollbar-none"
        onChange={(e) => onSelect(e.target.value)}
        size="7" 
      >
        {cities.map((city, index) => (
          <option
            key={index}
            value={city}
            className="transition-all ease-in-out duration-200 hover:bg-blue-100 text-xl font-semibold text-gray-400"
          >
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}



export default Citydrop;
