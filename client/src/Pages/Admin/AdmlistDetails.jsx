import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';
import { FaHeart, FaStar } from 'react-icons/fa';

function AdmlistDetails() {
  const { id } = useParams();
  console.log(id);

  const [item, setItem] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(item);

  useEffect(() => {
    const fetchlist = async () => {
      try {
        const response = await axiosinstance.get(`/admin/getlistby/${id}`);
        setItem(response.data);
        setLoading(false);  // Set loading to false when data is fetched
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
        console.log(error);
      }
    };
    fetchlist();
  }, [id]);

  // Show loading spinner or message if data is being fetched
  if (loading) {
    return <div>Loading...</div>; // Add a spinner or skeleton loader here
  }

  // Show error message if data fetch fails
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mt-20 ml-72'>
      <div className="p-7">
        <div className="flex items-center justify-between text-3xl font-extrabold text-gray-800 mb-6">
          <h1 className="text-gray-800">{item.title}</h1>

        </div>
        <div className="bg-gray-100 p-6 border border-gray-200 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(item?.images) &&
              item.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[400px] rounded-xl object-cover shadow-md transform"
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 mt-8">
          {/* User Profile Section */}
          <div className="lg:w-1/3 flex-shrink-0 h-full">
            <Link className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition h-80">
              <img
                src={item.host?.profileimage}
                alt={item.host?.username}
                className="w-20 h-20 rounded-full border-2 border-gray-300"
              />
              <div className="mt-4 text-center lg:text-left">
                <p className="text-lg font-medium text-gray-800">
                  <strong>Host:</strong> {item.host?.username}
                </p>
                <p className="text-gray-600">{item.host?.email}</p>
              </div>
            </Link>
          </div>

          {/* Description Section */}
          <div className="lg:w-2/3 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-xl font-semibold mb-3">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="text-lg mb-2">
              <strong>Location:</strong> {item.city}, {item.country}
            </p>
            <p className="text-lg mb-2 flex items-center">
              <strong>Rating:</strong>
              {Array.from({ length: Math.round(item?.rating) }).map((_, i) => (
                <FaStar key={i} className="ml-1 text-yellow-500" />
              ))}
            </p>
            <p className="mt-4 text-gray-600 text-justify">{item.description}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdmlistDetails;
