import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosinstance from "../../axiosinstance";

function Bookingdtls() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coment,setComment]=useState("")

  const [rating,setRating]=useState("")

  
  const [reviewpop, setReviewpop] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axiosinstance.get(`/user/Getbookingby/${id}`);
        setBooking(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "N/A" : parsedDate.toLocaleDateString();
  };

  const handlereviewsubmit = async () => {
    try {
    
      const reviewdata= {
        listing:booking.listing._id,
        rating:rating,
        comment:coment
      }

      const res = await axiosinstance.post("/user/addreview",reviewdata)
      console.log(res);
      setReviewpop(false)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  

  const toglepop = () => { setReviewpop(!reviewpop) }

  if (loading) {
    return <p className="text-center text-blue-500">Loading booking details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!booking) {
    return <p className="text-center text-gray-500">No booking found.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-rose-400 to-rose-500 text-white p-6">
          <h1 className="text-2xl font-bold">Booking Details</h1>
        </div>


        <div className="p-6 space-y-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Booking Information of {booking.listing.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p className="text-gray-700">
                <span className="font-bold">Guest Count:</span> {booking.guestCount || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Check-In:</span> {formatDate(booking.checkIn)}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Check-Out:</span> {formatDate(booking.checkOut)}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Total Price:</span> ${booking.totalPrice || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Status:</span> {booking.status || "N/A"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {booking.listing?.images?.length > 0 ? (
                booking.listing.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Booking"
                    className="rounded-lg shadow-md object-cover h-48 w-full "
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-2">No images available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 border-t flex">
          <h2 className="text-xl font-semibold text-blue-600">
            Payment Method: <span className="text-gray-800">Card</span>
          </h2>
          <button onClick={toglepop} className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Add Review
          </button>

          {reviewpop && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Add Review</h2>
                <form onSubmit={handlereviewsubmit}>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e)=>setRating(e.target.value)}
                    className="border rounded-lg w-full p-2 mb-4"
                    placeholder="Enter rating (1-5)"
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-700">Comment</label>
                  <textarea
                    className="border rounded-lg w-full p-2 mb-4"
                    placeholder="Write your review"
                    value={coment}
                    onChange={(e)=>setComment(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
                      onClick={toglepop}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


        </div>

      </div>
    </div>
  );
}

export default Bookingdtls;
