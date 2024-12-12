import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';

const EditListingForm = ({ initialData, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    images: [], // For new images to be uploaded
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        Array.from(formData.images).forEach((file) => form.append('images', file));
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      const response = await axiosinstance.put(`/host/editlisting/${formData._id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSubmitSuccess(response.data);
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update the listing.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        rows="4"
        required
      ></textarea>

      <label className="block mb-2 font-medium">Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium">City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium">Country</label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium">Rating</label>
      <input
        type="number"
        step="0.1"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-2 font-medium">Trending</label>
      <input
        type="checkbox"
        name="trending"
        checked={formData.trending}
        onChange={handleChange}
        className="mb-4"
      />

      <label className="block mb-2 font-medium">New</label>
      <input
        type="checkbox"
        name="new"
        checked={formData.new}
        onChange={handleChange}
        className="mb-4"
      />

      <label className="block mb-2 font-medium">Images</label>
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFileChange}
        className="w-full mb-4"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

const EditListing = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
    console.log(data);
    
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosinstance.get(`/host/viewby/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  const handleSuccess = (updatedData) => {
    console.log('Listing updated successfully:', updatedData);
    alert('Listing updated successfully!');
  };

  return (
    <div>
      {data ? (
        <EditListingForm initialData={data} onSubmitSuccess={handleSuccess} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditListing;

