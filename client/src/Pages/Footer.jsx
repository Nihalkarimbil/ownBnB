import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-white py-8 mx-auto">
      <div className="container mx-auto px-4 md:pl-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">About Own BnB</h3>
            <p className="text-gray-400 text-sm">
              Own BnB is your gateway to unique stays around the world. Whether
              you're looking for a weekend getaway or a luxurious retreat, we've
              got you covered.
            </p>
          </div>

         
          <div className="md:pl-12">
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a  className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a  className="hover:underline">
                  Explore
                </a>
              </li>
              <li>
                <a className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a  className="hover:underline">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
               
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Own BnB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
