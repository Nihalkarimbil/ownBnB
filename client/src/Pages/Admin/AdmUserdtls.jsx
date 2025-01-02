import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { FaEnvelope, FaUserShield, FaIdBadge, FaUser } from "react-icons/fa";

function AdmUserdtls() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    console.log(bookings);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosinstance.get(`/admin/getuserby/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [id]);


    const toggleBlockStatus = async () => {
        setLoading(true);
        try {
            const response = await axiosinstance.put(`/admin/updateuser/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error("Error updating user status:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getbooking = async () => {
            try {
                const res = await axiosinstance.get(`/admin/getuserbooking/${id}`)
                setBookings(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getbooking()
    }, [user])

    return (
        <div className="min-h-screen flex justify-center items-center pl-24 h-screen mt-14">
            <div className="bg-white p-8 rounded-lg shadow-xl flex space-x-8 w-3/4 ">
                <Card className="w-1/3 shadow-md pb-5">
                    <CardHeader floated={false} className="h-full rounded-lg overflow-hidden">
                        <img
                            src={user.profileimage || 'https://via.placeholder.com/300'}
                            alt="profile-picture"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                </Card>

                <Card className="w-2/3 shadow-md pt-2">
                    <CardBody>
                        <Typography variant="h4" color="blue-gray" className="mb-4 font-semibold text-blue-800">
                            <FaUser className="inline-block mr-2 text-blue-600" /> {user.username || "N/A"}
                        </Typography>

                        <div className="space-y-4">
                            <Typography className="flex items-center text-lg text-gray-700">
                                <FaUserShield className="mr-2 text-gray-600" />
                                <strong>Role:</strong> {user.role || "N/A"}
                            </Typography>

                            <Typography className="flex items-center text-lg text-gray-700">
                                <FaEnvelope className="mr-2 text-gray-600" />
                                <strong>Email:</strong> {user.email || "N/A"}
                            </Typography>

                            <Typography className="flex items-center text-lg text-gray-700">
                                <strong>Status:</strong> {user.blocked ? (
                                    <span className="text-red-600 ml-2">Blocked</span>
                                ) : (
                                    <span className="text-green-600 ml-2">Active</span>
                                )}
                            </Typography>

                            <Typography className="flex items-center text-lg text-gray-700">
                                <FaIdBadge className="mr-2 text-gray-600" />
                                <strong>ID:</strong> {user._id || "N/A"}
                            </Typography>
                        </div>

                        <div className="mt-6">
                            <Button
                                onClick={toggleBlockStatus}
                                color={user.blocked ? "red" : "green"}
                                className="w-full"
                                disabled={loading}
                            >
                                {loading
                                    ? "Updating..."
                                    : user.blocked
                                        ? "Unblock User"
                                        : "Block User"}
                            </Button>
                        </div>

                        <Typography variant="h4" color="blue-gray" className="mb-4 font-semibold text-blue-800 pt-3">
                            Bookings
                        </Typography>
                        <div className="space-y-4">
                            {bookings.length === 0 && (
                                <Typography className="text-lg text-gray-700">No bookings found.</Typography>)}
                            {bookings.map((booking) => (
                                <div key={booking._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                                    <div>
                                        <Typography className="text-lg text-gray-700">
                                            <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                                        </Typography>
                                        <Typography className="text-lg text-gray-700">
                                            <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography className="text-lg text-gray-700">
                                            <strong>Listing:</strong> {booking.listing?.title || "N/A"}
                                        </Typography>
                                        <Typography className="text-lg text-gray-700">
                                            <strong>Host:</strong> {booking?.host.username || "N/A"}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default AdmUserdtls;
