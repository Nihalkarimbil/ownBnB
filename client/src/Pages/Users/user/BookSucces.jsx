import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosinstance from '../../../axiosinstance';
import { useNavigate } from 'react-router-dom';

function BookSucces() {
  const { sessionid } = useParams();
  const [Booking, setBooking] = useState([]);
  const [costomerdt, setcostomer] = useState({});
  const [methord, setmethord] = useState([]);

  useEffect(() => {
    const sessionfetch = async () => {
      try {
        const respons = await axiosinstance.get(`/user/sessions/${sessionid}`);
        setcostomer(respons.data.data.customer_details);
        setmethord(respons.data.data.payment_method_types);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    sessionfetch();
  }, [sessionid]);

  useEffect(() => {
    const fetchbooking = async () => {
      try {
        const respons = await axiosinstance.get(`/user/getbooking/${sessionid}`);
        setBooking(respons.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };
    fetchbooking();
  }, [sessionid]);

  const handleConfirm = () => {
    console.log('Order confirmed!');
  };

  const navigate=useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center tracking-wide">Booking Details</h1>

  
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Customer Details</h2>
          <div className="text-gray-700 text-lg flex space-x-10">
            <p><span className="font-bold">Name:</span> {costomerdt.name || 'N/A'}</p>
            <p><span className="font-bold">Email:</span> {costomerdt.email || 'N/A'}</p>
          </div>
        </div>

  
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Booking Details</h2>
          {Booking.length > 0 ? (
            <div className="space-y-6">
              {Booking.map((value, index) => (
                <div key={index} className="p-6 bg-blue-50 rounded-xl shadow-md">
                  <p className="text-gray-700 text-lg"><span className="font-bold">Guest Count:</span> {value.guestCount}</p>
                  <p className="text-gray-700 text-lg"><span className="font-bold">Check-In:</span> {value.checkIn}</p>
                  <p className="text-gray-700 text-lg"><span className="font-bold">Check-Out:</span> {value.checkOut}</p>
                  <p className="text-gray-700 text-lg"><span className="font-bold">Total Price:</span> ${value.totalPrice}</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {value.listing.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt="Booking"
                        className="rounded-lg shadow-md object-cover h-40 w-full"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-lg">No booking details available.</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Payment Method: {methord.join(', ') || 'N/A'}</h2>
          <p className="text-gray-700 text-lg"></p>
        </div>

       
        <div className="text-center">
          
          <button onClick={()=>navigate("/")}
           
            className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform transition-transform duration-300 "
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookSucces;
