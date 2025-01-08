import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axiosinstance from '../../../axiosinstance';

function Allbookings() {
    const [Booking, setBooking] = useState([]);

    useEffect(() => {
        const getbooking = async () => {
            try {
                const respons = await axiosinstance.get("/user/getuserbooking");
                setBooking(respons.data);
            } catch (error) {
                console.log(error);
            }
        };
        getbooking();
    }, []);

    return (
        <div>
            <div className="mt-10 mx-14  h-[700px]">
                <Typography variant="h5" className="font-bold mb- text-center">
                    Booking History
                </Typography>
                <div className="grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {Booking.length === 0 ? (
                        <div className="flex flex-col justify-center items-center space-y-4">
                            <p className="text-gray-500 text-center">No reservations found.</p>
                            <Link to="/">
                                <Button className="bg-rose-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-rose-600">
                                    Start Booking
                                </Button>
                            </Link>
                        </div>
                    ) : (

                        <div className="grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Booking.map((value, index) => (
                                <Card
                                    key={index}
                                    shadow={false}
                                    className="border border-gray-300 rounded-2xl"
                                >
                                    {value.listing.images.length > 0 && (
                                        <img
                                            src={value.listing.images[0]}
                                            alt="Property"
                                            className="rounded-t-2xl h-40 w-ful object-cover"
                                        />
                                    )}
                                    <CardBody>
                                        <Typography variant="h6" className="font-semibold">
                                            {value.listing.title}
                                        </Typography>
                                        <Typography variant="small" className="text-gray-500">
                                            {new Date(value.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="small" className="text-gray-500">
                                            Guests: {value.guestCount}
                                        </Typography>
                                        <Link to={`/user-Booking/${value._id}`}>
                                            <Button
                                                variant="filled"
                                                className="mt-4 bg-rose-500 text-white w-full"
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                            ))}

                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default Allbookings;
