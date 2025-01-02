import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import axiosinstance from '../../axiosinstance'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { FaEnvelope, FaUserShield, FaIdBadge, FaUser } from "react-icons/fa";

function Hostdetails() {
    const { id } = useParams()
    const [host, setHost] = useState({})
    const [list, setList] = useState([])
    console.log(list);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchhost = async () => {
            try {
                const res = await axiosinstance.get(`/admin/getHostby/${id}`)
                setHost(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchhost()
    }, [])

    useEffect(() => {
        const fetchlist = async () => {
            try {
                const res = await axiosinstance.get(`/admin/gethostlist/${id}`)
                setList(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchlist()
    }, [])

    return (

        <div className="flex justify-center bg-white items-center ml-64 mt-20 w-7xl">
            <div className="bg-white p-12 rounded-lg shadow-xl flex flex-col space-y-8 ">
                <div className="flex space-x-8">
                    <Card className="w-1/3 shadow-md pb-5">
                        <CardHeader floated={false} className="h-full rounded-lg overflow-hidden">
                            <img
                                src={host.profileimage || 'https://via.placeholder.com/300'}
                                alt="profile-picture"
                                className="h-full w-full object-cover"
                            />
                        </CardHeader>
                    </Card>

                    <Card className="w-2/3 shadow-md pt-10">
                        <CardBody>
                            <Typography variant="h4" color="blue-gray" className="mb-4 font-semibold text-blue-800">
                                <FaUser className="inline-block mr-2 text-blue-600" /> {host.username || "N/A"}
                            </Typography>

                            <div className="space-y-4">
                                <Typography className="flex items-center text-lg text-gray-700">
                                    <FaEnvelope className="mr-2 text-gray-600" />
                                    <strong>Email:</strong> {host.email || "N/A"}
                                </Typography>

                                <Typography className="flex items-center text-lg text-gray-700">
                                    <strong>Status:</strong> {host.blocked ? (
                                        <span className="text-red-600 ml-2">Blocked</span>
                                    ) : (
                                        <span className="text-green-600 ml-2">Active</span>
                                    )}
                                </Typography>

                                <Typography className="flex items-center text-lg text-gray-700">
                                    <FaIdBadge className="mr-2 text-gray-600" />
                                    <strong>ID:</strong> {host._id || "N/A"}
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="w-full">
                    <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
                        Listings
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {list.map((item) => (
                            <Card key={item._id} className="shadow-md">
                                <CardHeader floated={false} className="h-48 rounded-lg overflow-hidden">
                                    <div className="flex space-x-2 overflow-x-auto">
                                        <Carousel>
                                            {Array.isArray(item?.images) &&
                                                item.images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-center"
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={item.title}
                                                            className="h-[300px] w-full object-cover"
                                                        />
                                                    </div>
                                                ))}

                                        </Carousel>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h6" color="blue-gray" className="mb-2 font-bold">
                                        {item.title || "No Title"}
                                    </Typography>

                                    <Typography className="text-gray-800 font-bold">
                                        Price: ${item.price || "N/A"}
                                    </Typography>
                                </CardBody>

                                <Button onClick={() => navigate(`/item-details/${item._id}`)}
                                    color="blue"
                                    size="sm"
                                    className="m-4"
                                >
                                    View Details
                                </Button>


                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Hostdetails
