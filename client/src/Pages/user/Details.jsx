import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';
import Callender from '../../components/ui/Callender';
import { Button } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa';

function Details() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [checkinDate, setCheckinDate] = useState("DD/MM/YY");
    const [checkoutDate, setCheckoutDate] = useState("DD/MM/YY");
    const [callenderType, setCallenderType] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [review, setreview] = useState([])
    console.log('rrr', review);
    console.log(item);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axiosinstance.get(`user/getby/${id}`);
                setItem(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const fetchreview = async () => {
            try {
                const response = await axiosinstance.get(`/user/getreviewby/${item._id}`)
                setreview(response.data);

            } catch (error) {
                console.log(error);

            }
        }
        fetchreview()
    }, [item])

    const openCalendar = (type) => setCallenderType(type);
    const closeCalendar = () => setCallenderType(null);

    const calculateTotalPrice = () => {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);

        if (isNaN(checkin) || isNaN(checkout)) {
            return 0;
        }

        const timeDiff = checkout - checkin;
        const days = timeDiff / (1000 * 60 * 60 * 24);

        const validDays = days > 0 ? days : 0;
        return validDays * (item ? item.price : 0);
    };

    const onDateSelect = (date) => {
        if (callenderType === 'checkin') {
            setCheckinDate(date);
        } else if (callenderType === 'checkout') {
            setCheckoutDate(date);
        }
        closeCalendar();
    };

    useEffect(() => {
        if (checkinDate !== "DD/MM/YY" && checkoutDate !== "DD/MM/YY") {
            setTotalPrice(calculateTotalPrice());
        }
    }, [checkinDate, checkoutDate]);

    if (!item) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:mx-48">
            <div className="flex items-center justify-between text-3xl font-extrabold text-gray-800 mb-6">
                <h1 className="text-gray-800">{item.title}</h1>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-red-300 text-gray-600 hover:text-red-800 transition-colors duration-300 ease-in-out">
                    <FaHeart size={17} />
                </button>
            </div>
            <div className="bg-gray-100 p-6 border border-gray-200 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {item.images.map((image, index) => (
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
                <div className="lg:w-2/3">
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <img
                            src={item.host.profileimage}
                            alt={item.host.username}
                            className="w-14 h-14 rounded-full border-2 border-gray-300"
                        />
                        <div>
                            <p className="text-lg font-medium text-gray-800">
                                <strong>Host:</strong> {item.host.username}
                            </p>
                            <p className="text-gray-600">{item.host.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 text-gray-700 bg-white p-5 rounded-lg shadow-lg">
                        <p className="text-xl font-semibold mb-3">
                            <strong>Category:</strong> {item.category}
                        </p>
                        <p className="text-lg mb-2">
                            <strong>Location:</strong> {item.city}, {item.country}
                        </p>
                        <p className="text-lg mb-2 flex items-center">
                            <strong>Rating:</strong>
                            {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
                                <FaStar key={i} className="ml-1 text-yellow-500" />
                            ))}
                        </p>
                        <p className="mt-4 text-gray-600 text-justify">{item.description}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-md shadow-md lg:w-1/3">
                    <h2 className="text-2xl font-bold text-gray-800">₹{item.price} per day</h2>
                    <hr className="border-gray-300 mt-4 mb-6" />
                    <div className="space-y-4">
                        <div>
                            <button
                                onClick={() => openCalendar('checkin')}
                                className="w-full text-left text-gray-700 border p-3 rounded-lg shadow-sm"
                            >
                                <strong>Check-in Date:</strong> {checkinDate}
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => openCalendar('checkout')}
                                className="w-full text-left text-gray-700 border p-3 rounded-lg shadow-sm"
                            >
                                <strong>Check-out Date:</strong> {checkoutDate}
                            </button>
                        </div>
                        <div className="absolute z-10 bg-white shadow-lg">
                            {callenderType && (
                                <Callender onDateSelect={onDateSelect} />
                            )}
                        </div>
                    </div>
                    <hr className="border-gray-300 mt-6 mb-6" />
                    <Button className="w-full h-12 text-white bg-gradient-to-r from-rose-500 to-rose-500 font-bold hover:shadow-lg">
                        Reserve
                    </Button>
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-base font-light text-gray-800">Additonal charges</p>
                        <p className="text-base font-semibold text-gray-800">₹0.00</p>
                    </div>
                    <hr className="border-gray-300 mt-4 mb-4" />
                    <div className="flex justify-between items-center">
                        <p className="text-base font-semibold text-gray-800">Total</p>
                        <p className="text-lg font-bold text-gray-800">₹{totalPrice}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
                {review.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {review.map((value, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <div className="flex items-center mb-3">
                                    <img
                                        src={value.user.profileimage}
                                        alt={value.user.username}
                                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    />
                                    <div className="ml-4">
                                        <p className="text-lg font-medium text-gray-800">
                                            {value.user.username}
                                        </p>
                                        <p className="text-sm text-gray-600">{value.createdAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    {Array.from({ length: value.rating }).map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500" />
                                    ))}
                                    {Array.from({ length: 5 - value.rating }).map((_, i) => (
                                        <FaStar key={i} className="text-gray-300" />
                                    ))}
                                </div>
                                <p className="text-gray-700 text-justify">{value.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
                )}
            </div>


        </div>
    );
}

export default Details;
