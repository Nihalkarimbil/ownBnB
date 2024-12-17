import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getlistings } from '../../Store/slices/Dataslice';
import { FaHeart } from "react-icons/fa";
import { Carousel } from "@material-tailwind/react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

function Search() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.listing);
    const { City, Date, guest } = useSelector((state) => state.Serch);
    const [filtered, setFiltered] = useState([]);
    const [position, setPosition] = useState(null);

    const getCoordinatesForCity = (city) => {
        const locations = {
            "himachal": { lat: 32.084206, lng: 77.571167 },
            "shillong": { lat: 25.578773, lng: 91.893254 },
            "wayanad": { lat: 11.70408601018272, lng: 76.0850747992465 },
            "ooty": { lat: 11.411681459332051, lng: 76.69410703221182 },
            "pune": { lat: 18.527800352341206, lng: 73.86294852398464 },
            "goa": { lat: 15.47982490966591, lng: 73.80175780758807 },
            "kerala": { lat: 9.877460166883479, lng: 76.6477403487145 },
            "mumbai": { lat: 19.040065941003654, lng: 73.04083123273034 },
            "lakshadweep": { lat: 10.559739995841369, lng: 72.63605447330538 },
            "manali": { lat: 32.242982936229595, lng: 77.1889363072273 },
            "munnar": { lat: 10.08880676612927, lng: 77.06281276477056 },
            "leh": { lat: 34.151258603199494, lng: 77.57983613489891 },
            "ladakh": { lat: 34.602746712911234, lng: 77.32410845079595 },
            "kashmir": { lat: 34.08427825967856, lng: 74.93464869407336 },
            "kodaikanal": { lat: 10.23963994551313, lng: 77.49651755115728 },
            "bangalore": { lat: 12.96665953328283, lng: 77.59178127631468 },
            "delhi": { lat: 28.6171663291629, lng: 77.23323706165638 },
            "alappuzha": { lat: 9.497979520220676, lng: 76.33798113289345 },
        };
        return locations[city] || null;
    };

    useEffect(() => {
        dispatch(getlistings());
    }, [dispatch]);

    useEffect(() => {
        setFiltered(data.filter((value) => value.city === City));
        const coordinates = getCoordinatesForCity(City);
        if (coordinates) {
            setPosition(coordinates);
        }
    }, [data, City]);

    return (

        <div>
            <h1 className="text-center text-xl font-semibold text-gray-800 pt-9 px-4 sm:px-6 lg:px-8">
                Results for your search on <span className="text-indigo-600">{Date}</span> in <span className="text-indigo-600">{City}</span>
            </h1>
            <div className="flex flex-wrap mt-6 mx-12 px-2 ">

                <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-6 gap-y-10">
                        {filtered.map((product) => (
                            <div
                                key={product._id}
                                className="group relative"
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-easing="ease-in-out"
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                                    <Carousel className="rounded-xl">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="flex items-center justify-center">
                                                <img
                                                    src={image}
                                                    alt={product.title}
                                                    className="h-[300px] w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <h3 className="text-sm text-gray-700">{product.title}</h3>
                                        <h3 className="text-sm text-gray-400">
                                            {product.host?.username}
                                        </h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            ${product.price}
                                        </p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-red-300 text-gray-600 hover:text-red-800 transition-colors duration-300 ease-in-out">
                                            <FaHeart size={17} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center pl-6 pb-6">
                    {position ? (
                        <APIProvider apiKey="AIzaSyBGMH7ByRnz8AAQ93US7CffIL7VnRHdeGY">
                            <div className="h-full w-full lg:w-full shadow-lg rounded-lg overflow-hidden">
                                <Map zoom={9} center={position}>
                                    <Marker position={position} />
                                </Map>
                            </div>
                        </APIProvider>
                    ) : (
                        <p className="text-gray-500">Loading map...</p>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Search;
