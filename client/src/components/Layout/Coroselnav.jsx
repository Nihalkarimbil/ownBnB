import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHotel,
  faSnowflake,
  faCampground,
  faPalette,
  faFire,
  faTowerObservation,
  faCity,
  faGolfBallTee,
  faCaravan,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { MdFiberNew } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { PiMountainsFill } from "react-icons/pi";
import { MdPool } from "react-icons/md";
import { FaSailboat } from "react-icons/fa6";
import { GiHut } from "react-icons/gi";

function Coroselnav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { icon: <MdFiberNew size={24} />, name: "New", path: "/" },
    { icon: <FontAwesomeIcon icon={faFire} />, name: "Trending", path: "/Trending" },
    { icon: <TbBeach size={24} />, name: "Beach", path: "/Beach" },
    { icon: <PiMountainsFill size={24} />, name: "Mountains", path: "/Mountains" },
    { icon: <FontAwesomeIcon icon={faSnowflake} />, name: "Snowfall", path: "/Snowfall" },
    { icon: <MdPool size={24} />, name: "Pools", path: "/Pools" },
    { icon: <FaSailboat size={24} />, name: "Boating", path: "/Boating" },
    { icon: <FontAwesomeIcon icon={faHotel} />, name: "Hotels", path: "/Hotels" },
    { icon: <FontAwesomeIcon icon={faBed} />, name: "Rooms", path: "/Rooms" },
    { icon: <FontAwesomeIcon icon={faCampground} />, name: "Campset", path: "/Campset" },
    { icon: <GiHut size={24} />, name: "Huts", path: "/Huts" },
    { icon: <FontAwesomeIcon icon={faTowerObservation} />, name: "Towers", path: "/Towers" },
    { icon: <FontAwesomeIcon icon={faCity} />, name: "Cities", path: "/Cities" },
    { icon: <FontAwesomeIcon icon={faGolfBallTee} />, name: "Golfplay", path: "/Golfplay" },
    { icon: <FontAwesomeIcon icon={faPalette} />, name: "Creative", path: "/Creative" },
    { icon: <FontAwesomeIcon icon={faCaravan} />, name: "Camping", path: "/Camping" },
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
