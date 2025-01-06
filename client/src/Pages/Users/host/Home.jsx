import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.User);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50">
      <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 text-center w-full md:max-w-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Welcome, <span className="text-rose-600">{user.username}</span>!
        </h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          Unlock endless opportunities to create <br />
          <span className="font-semibold text-rose-500">
            unforgettable experiences.
          </span>
        </p>
        <p className="text-gray-600 mt-4 text-sm md:text-base">
          Start hosting today and earn while sharing the joy of travel. 
          <span className="block font-medium mt-1">
            Only a 20% commission goes to the admin.
          </span>
        </p>
        <div className="mt-6">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

