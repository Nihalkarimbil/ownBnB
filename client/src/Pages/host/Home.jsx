
import React from 'react';
import { useSelector } from 'react-redux';
import { FaStar, FaHome } from 'react-icons/fa';

function Home() {
  const { user } = useSelector((state) => state.User);

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 w-full">
      <div className="bg-transparent shadow-lg rounded-lg p-6 md:p-10  md:w-2/3 lg:w-96 text-center">
        
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Welcome, {user.username}!</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          <span className="font-semibold text-gray-500">start creating memorable stays today</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
