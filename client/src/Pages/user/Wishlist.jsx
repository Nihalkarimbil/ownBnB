import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allwish } from '../../Store/slices/Wishlistslice';
import { Link } from 'react-router-dom';

function Wishlist() {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(allwish());
    }, []);

    return (
        <div>
            {wishlist.length !== 0 ? (
                
                wishlist.map((value, index) => (
                    <div key={index}>
                        <h1 className='text-lg font-bold mx-20 pt-7'>Wishlist</h1>
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py- lg:max-w-max lg:px-20 w-screen">
                        
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {value.Listings.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative"
                                        data-aos="fade-up"
                                        data-aos-duration="600"
                                        data-aos-easing="ease-in-out"
                                    >
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-lg">
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className="h-[300px] w-full object-cover"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <Link to={`/details/${item._id}`}>
                                                <div className="flex flex-col">
                                                    <h3 className="text-sm text-gray-700">{item.title}</h3>
                                                    <h3 className="text-sm text-gray-400">
                                                        {item.host?.username}
                                                    </h3>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                                        ${item.price}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 w-full h-[400px] justify-center pt-36">No items in wishlist</p>
            )}
        </div>
    );
}

export default Wishlist;
