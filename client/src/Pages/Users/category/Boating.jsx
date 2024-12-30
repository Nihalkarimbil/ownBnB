import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import AOS from "aos";
import { Carousel } from "@material-tailwind/react";
import Spinner from "../../../Spinner";
import axiosinstance from "../../../axiosinstance";
import { Link } from "react-router-dom";
import { addtowishlist } from "../../../Store/slices/Wishlistslice";
import { useDispatch, useSelector } from "react-redux";
import DialogWithForm from "../../../components/ui/Logindpopup";


function Boating() {
    const { user } = useSelector((state) => state.User)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [Boating, setBoating] = useState([]);
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()


    useEffect(() => {
        const fech = async () => {
            try {
                const respons = await axiosinstance.get("/user/listby/Boats")
                setBoating(respons.data)
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }
        fech()
    }, []);

   
    
    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    };
    const addtowish = (listings) => {
        if(!user){
            return toggleDialog()
        }
        dispatch(addtowishlist(listings))
    }

    AOS.init();

    return (
        <div>
            {loading ? (<Spinner />) : (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py- lg:max-w-max lg:px-20 w-screen">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {Boating.map((product) => (
                            <div
                                key={product.id}
                                className="group relative"
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-easing="ease-in-out"
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-lg">

                                    <Carousel className="rounded-xl">
                                        {product.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center"
                                            >
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
                                    <Link to={`/details/${product._id}`}>
                                        <div className="flex flex-col">
                                            <h3 className="text-sm text-gray-700">{product.title}</h3>
                                            <h3 className="text-sm text-gray-400">
                                                {product.host?.username}
                                            </h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">
                                                ${product.price}
                                            </p>
                                        </div>
                                    </Link>

                                    <div className="flex space-x-2">
                                        <button onClick={() => addtowish(product._id)} className="p-2 rounded-full bg-gray-100 hover:bg-red-300 text-gray-600 hover:text-red-800 transition-colors duration-300 ease-in-out">
                                            <FaHeart size={17} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <DialogWithForm open={dialogOpen} onToggle={toggleDialog} />
        </div>
    );
}

export default Boating;
