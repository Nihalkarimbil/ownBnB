import React, { useState } from "react";
import air from "../../assets/air.png";
import { Button } from "@material-tailwind/react";
import { Link, NavLink,useNavigate } from "react-router-dom";

function HostNavbar() {
    const [selected, setSelected] = useState("Dashboard");
    const navigate=useNavigate()

    const handleSelect = (name) => {
        setSelected(name);
    };

    const navItems = [
        { name: "Dashboard", path: "/host-home" },
        { name: "Listings", path: "/host-listing" },
        { name: "Reviews", path: "/host-reviews" },
        { name: "Earnings", path: "/host-earnings" },
        { name: "Reservation", path: "/host-reservation" },
    ];

    return (
        <nav className="flex justify-between px-28 py-4 items-center bg-white border-b-2 ">
            <Link to={"/"}>
                <img src={air} className="h-9" alt="Logo" />
            </Link>

            <div className="flex items-center space-x-12 cursor-pointer">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => handleSelect(item.name)}
                        className={() =>
                            `font-semibold text-gray-400 hover:text-gray-500 relative pb-2 ${
                                selected === item.name ? "text-gray-800" : ""
                            }`
                        }
                    >
                        {item.name}
                        <span
                            className={`absolute bottom-0 left-0 h-[2px] w-full bg-rose-400 transition-all ${
                                selected === item.name ? "scale-x-100" : "scale-x-0"
                            } group-hover:scale-x-100`}
                        />
                    </NavLink>
                ))}
            </div>

            <div className="flex items-center">
                <Button onClick={()=>navigate("/host-addlist")} className="flex items-center rounded-md bg-gradient-to-r from-rose-400 to-rose-500 py-3 px-4 text-center text-sm text-white transition-all shadow-sm hover:shadow-lg">
                    <i className="fas fa-house-medical mr-2"></i>
                    <h2>Own BnB Setup</h2>
                </Button>
            </div>
        </nav>
    );
}

export default HostNavbar;
