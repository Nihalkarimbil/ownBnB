import React from 'react'
import air from "../../assets/air.png";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
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
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
