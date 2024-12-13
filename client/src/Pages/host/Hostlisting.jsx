import React, { useEffect, useState } from 'react';
import axiosinstance from '../../axiosinstance';
import { Button } from "@material-tailwind/react";
import Spinner from '../../Spinner';
import { Link } from 'react-router-dom';

function Hostlisting() {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axiosinstance.get('/host/allListing');
        setList(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [List]);

  const handledelete = async (itemid) => {
    try {
      const response = await axiosinstance.delete(`/host/deletelist/${itemid}`);
   
      if (response.status === 200) {
        alert("Listing deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting the listing:", error);
      alert("Failed to delete listing");
    }
  };


  if (List.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
        <p className="mb-4 text-lg font-semibold text-gray-600">
          You don’t have any listings yet.
        </p>
        <Button className="flex items-center rounded-md bg-gradient-to-r from-rose-400 to-rose-500 py-3 px-6 text-white text-sm font-medium transition-shadow shadow-sm hover:shadow-lg">
          <i className="fas fa-house-medical mr-2"></i>
          <span>Set up your Own BnB</span>
        </Button>
      </div>
    );
  }


  if (loading) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Listings</h1>
      <div className="mx-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {List.map((item) => (
          <div
            key={item.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <Link to={`/host-listedit/${item._id}`}
              className="absolute top-2 right-2 text-white hover:text-red-700 shadow-md rounded-full p-2 transition"
              aria-label="Edit"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="flex p-4 justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-500 truncate">
                {item.title}
              </h2>
              <button
                className="text-gray-500 hover:text-red-700 transition"
                aria-label="Delete"
                onClick={()=>handledelete(item._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default Hostlisting;