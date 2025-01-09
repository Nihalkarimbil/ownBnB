import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="mt-6  px-5 py-6 sm:px-6 lg:px-16 w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="group relative animate-pulse"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
          >
           
            <div className="aspect-w-1 aspect-h-1 bg-gray-300 rounded-lg w-full h-64 sm:h-64 lg:h-72 shadow-lg"></div>

            
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>

           
            <div className="mt-2 h-6 w-1/4 bg-gray-300 rounded"></div>

            
            <div className="mt-4 flex space-x-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
