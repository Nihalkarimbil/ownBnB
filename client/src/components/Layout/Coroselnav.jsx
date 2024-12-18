import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

function Coroselnav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { icon: <FontAwesomeIcon icon={faStar} />, name: "New", path: "/" },
    { icon: <FontAwesomeIcon icon={faFire} />, name: "Trending", path: "/Trending" },
    { icon: <FontAwesomeIcon icon={faUmbrellaBeach} />, name: "Beach", path: "/Beach" },
    { icon: <FontAwesomeIcon icon={faMountain} />, name: "Mountains", path: "/Mountains" },
    { icon: <FontAwesomeIcon icon={faSnowflake} />, name: "Snowfall", path: "/Snowfall" },
    { icon: <FontAwesomeIcon icon={faWater} />, name: "Pools", path: "/Pools" },
    { icon: <FontAwesomeIcon icon={faShip} />, name: "Boating", path: "/Boating" },
    { icon: <FontAwesomeIcon icon={faHotel} />, name: "Hotels", path: "/Hotels" },
    { icon: <FontAwesomeIcon icon={faBed} />, name: "Rooms", path: "/Rooms" },
    { icon: <FontAwesomeIcon icon={faCaravan} />, name: "Camping", path: "/Camping" },
    { icon: <FontAwesomeIcon icon={faCampground} />, name: "Campset", path: "/Campset" },
    { icon: <FontAwesomeIcon icon={faHouse} />, name: "Huts", path: "/Huts" },
    { icon: <FontAwesomeIcon icon={faTowerObservation} />, name: "Towers", path: "/Towers" },
    { icon: <FontAwesomeIcon icon={faCity} />, name: "Cities", path: "/Cities" },
    { icon: <FontAwesomeIcon icon={faGolfBallTee} />, name: "Golfplay", path: "/Golfplay" },
    { icon: <FontAwesomeIcon icon={faPalette} />, name: "Creative", path: "/Creative" },
  ];

  return (
    <div
      className="w-screen flex overflow-x-scroll snap-x snap-mandatory bg-white scrollbar shadow-sm"
      id="scrollbar-none"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`snap-center flex-shrink-0 h-20 flex items-center justify-center ${
            activeIndex === index ? "text-black" : "text-gray-500"
          }`}
        >
          <div
            className={`h-full w-28 flex flex-col justify-center items-center hover:text-black cursor-pointer ${
              activeIndex === index ? "font-bold  border-black" : "font-normal"
            }`}
            onClick={() => setActiveIndex(index)} 
          >
            <Link to={item.path} className="mb-1">
              {item.icon}
            </Link>
            <p className="text-xs">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Coroselnav;
