import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';
import { Button } from "@material-tailwind/react"

const EditListing = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    city: '',
    country: '',
    price: '',
    rating: '',
    trending: false,
    newitem: false,
    images: []
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosinstance.get(`/host/viewby/${id}`)

        setFormData({
          ...response.data,

        });
      } catch (error) {
        console.log(error);

      }
    };
    fetch();
  }, [id]);

  const handledeleteimg = async (imageToDelete) => {
    try {
      await axiosinstance.delete(`/host/deleteimg/${formData._id}`, {
        data: { imgurl: imageToDelete },
      });

      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((image) => image !== imageToDelete),
      }));

      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: filesArray,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData._id) {
      toast.error('Unable to identify the listing to update.');
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        Array.from(formData.images).forEach((file) => form.append('images', file));
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      await axiosinstance.put(`/host/editlisting/${formData._id}`, form);
      alert("updated")
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-rose-50">
      <form onSubmit={handleSubmit} className="p-8 mx-32">
        <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">Edit your Listing</h2>

        <label className="block mb-2 font-semibold text-blue-700 text-center">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter the title"
          required
        />

        <label className="block mb-2 font-semibold text-blue-700 text-center">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none scroll-auto"
          rows="4"
          placeholder="Provide a detailed description"
          required
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div>
            <label className="block mb-2 font-semibold text-blue-700 text-center">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter the category"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-700 text-center">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter the city"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-700 text-center">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter the country"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-700 text-center">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter the price"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-700 text-center">Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Provide a rating (e.g., 4.5)"
              required
            />
          </div>

          <div className="flex items-center space-x-32 col-span-2 lg:col-span-1">

            <div className="flex items-center">
              <input
                type="checkbox"
                name="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400 rounded"
              />
              <label className="ml-2 text-blue-700 font-semibold">Trending</label>
            </div>


            <div className="flex items-center">
              <input
                type="checkbox"
                name="newitem"
                checked={formData.newitem}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400 rounded"
              />
              <label className="ml-2 text-blue-700 font-semibold">Newitem</label>
            </div>
          </div>
        </div>

        <label className="block mb-2 font-semibold text-blue-700">Images</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <div className="mt-4">
          <h3 className=" font-semibold text-blue-700 mb-2">Existing Images</h3>
          <div className="flex flex-wrap gap-4">
            {formData?.images.map((image, index) => (
              <div key={index} className="mb-5 w-1/3 sm:w-1/4 lg:w-1/6">
                <img
                  src={image}
                  alt="img"
                  className="w-full h-32 object-cover border rounded-lg"
                />
                <button onClick={() => handledeleteimg(image)} className="text-red-500 mt-2 block">Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-96 bg-gradient-to-r from-rose-400 to-rose-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
    
  );
};

export default EditListing;
