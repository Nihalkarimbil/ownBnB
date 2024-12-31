import React, { useState } from 'react'
import air from "../../../assets/admn-png.png";
import { Link } from 'react-router-dom';


function AdmNavbar() {

  return (
    <div>
      <nav className="w-screen shadow-sm fixed z-50">
        <div className="bg-white border-b border-gray-200 dark:bg-gray-900 w-screen">
          <div className="flex flex-wrap justify-between items-center mx-4 max-w-screen-xl p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse hover:cursor-pointer">

              <img src={air} className="h-9" alt="Logo" />
              <Link to={"/"}
                className="self-center md:text-3xl font-semibold whitespace-nowrap"
                id="admlogo"
              > ownbnb
              </Link>


            </div>
          </div>
        </div>

      </nav>

    </div>
  )
}

export default AdmNavbar
