import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    CardBody,

    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';

function Allbookings() {
    const [Booking, setBooking] = useState([]);
    useEffect(() => {
        const getbooking = async () => {
            try {
                const respons = await axiosinstance.get("/user/getuserbooking")
                setBooking(respons.data)
            } catch (error) {
                console.log(error);

            }
        }
        getbooking()
    }, [])
    return (
        <div>
            <div className="mt-10 mx-14 pb-7">
                <Typography variant="h5" className="font-bold mb-4">
                    Booking History
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

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
                                    className="rounded-t-2xl h-40 w-full object-cover"
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
                                <Link to={`/user-Booking/${value._id}`} >
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
            </div>
        </div>
    )
}

export default Allbookings
