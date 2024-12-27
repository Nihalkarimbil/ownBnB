import React, { useEffect, useState } from "react";
import axiosinstance from "../../axiosinstance";
import { useSelector } from "react-redux";

function Reservations() {
  const { user } = useSelector((state) => state.User);
  const [reserv, setReserve] = useState([]);

  useEffect(() => {
    const reservfetch = async () => {
      try {
        const res = await axiosinstance.get(`/host/reservations/${user.id}`);
        setReserve(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    reservfetch();
  }, [user.id]);

  return (
    <div className="p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Reservations</h1>

      {reserv.length === 0 ? (
        <p className="text-gray-500 text-center">No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">s/n</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Check-in</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Check-out</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Days</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Guests</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Guest Details</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {reserv.map((reservation, index) => {
                const checkInDate = new Date(reservation.checkIn);
                const checkOutDate = new Date(reservation.checkOut);
                const bookingDays = Math.ceil(
                  (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
                );

                return (
                  <tr key={reservation.sessionId} className="hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={reservation.listing.images[0]}
                          alt={reservation.listing.title}
                          className="w-16 h-16 rounded-md object-cover shadow"
                        />
                        <span>{reservation.listing.title}</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.listing.city}, {reservation.listing.country}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {checkInDate.toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {checkOutDate.toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{bookingDays}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {reservation.guestCount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <p><strong>Name:</strong> {reservation.guest.username}</p>
                      <p><strong>Email:</strong> {reservation.guest.email}</p>
                     
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center font-semibold ${
                        reservation.status === "pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      <select >
                        <option >{reservation.status}</option>
                        <option >approved</option>
                        <option >Cancell</option>
                      </select>
                      
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ₹{reservation.totalPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Reservations;
