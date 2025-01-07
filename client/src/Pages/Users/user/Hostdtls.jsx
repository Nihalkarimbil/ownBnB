import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosinstance from '../../../axiosinstance';

function Hostdtls() {
    const { id } = useParams();
    const [host, setHost] = useState({});
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const Gethost = async () => {
            try {
                const response = await axiosinstance.get(`/user/gethost/${id}`);
                setHost(response.data);
                setLoading(false);
            } catch (err) {
                setError('Could not fetch host data');
                setLoading(false);
            }
        };
        Gethost();
    }, [id]);

    useEffect(() => {
        const listfetch = async () => {
            try {
                const res = await axiosinstance.get(`/user/getlistofhost/${id}`)
                setLists(res.data);

            } catch (error) {
                console.log(error);

            }
        }
        listfetch()
    }, [])

    if (loading) {
        return <div className="text-center text-xl font-semibold py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-xl font-semibold text-red-500 py-8">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-rose-400 to-pink-300 rounded-lg shadow-lg p-6 mb-12">
                <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                        src={host.profileimage || '/default-avatar.jpg'}
                        alt={host.username}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-left">
                    <h1 className="text-4xl font-semibold text-white">{host.username}</h1>
                    <p className="text-lg text-white mt-4 max-w-lg mx-auto md:mx-0">
                        As a host on Ownbnb, I’m committed to providing a welcoming and comfortable experience for all of my guests. Whether you’re here for a short stay or an extended vacation, I want to ensure your time in my space feels like a home away from home.
                    </p>
                    <p className="text-sm text-gray-200 mt-4">Kerala, India</p>
                </div>
            </div>


            <section className="bg-white p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">About {host.username}</h2>
                <p className="mt-4 text-gray-700">iam {host.username}. situated in kerala india i provide various dream properties according to your requirments</p>
            </section>


            <section className="bg-white p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">Reviews for {host.username}</h2>
                <div className="mt-4 space-y-4">
                    {host.reviews && host.reviews.length > 0 ? (
                        host.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <p className="text-gray-700 font-semibold">{review.username}</p>
                                <p className="text-gray-500 text-sm">{review.date}</p>
                                <p className="text-gray-700 mt-2">{review.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews yet.</p>
                    )}
                </div>
            </section>


            <section className="bg-white p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">Specialties of {host.username}</h2>
                <div className="mt-4 text-gray-700 space-y-4">
                    <p>1. <strong>Personalized Local Recommendations:</strong> The host provides insider tips on local attractions, hidden gems, and unique dining options, ensuring guests experience the best of the area.</p>
                    <p>2. <strong>Impeccable Cleanliness & Comfort:</strong> The host takes great pride in maintaining a spotless and cozy environment, offering high-quality bedding, fresh linens, and thoughtful touches to ensure a comfortable stay.</p>
                    <p>3. <strong>Quick Response Time:</strong> The host is known for being responsive and available, ensuring that any questions or concerns are addressed promptly, whether before or during the stay.</p>
                    <p>4. <strong>Warm & Welcoming Atmosphere:</strong> The host creates a friendly, welcoming environment where guests feel at home, offering extra touches like welcome snacks, local souvenirs, or a friendly chat to make guests feel like part of the community.</p>
                </div>
            </section>


            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hosted Properties</h2>
                {lists.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lists.map((property) => (
                            <Link to={`/details/${property._id}`} key={property._id}>
                                <div  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-sm">
                                    <img
                                        src={(property.images && property.images[0]) || '/default-property.jpg'}
                                        alt={property.title || 'Property'}
                                        className="w-full h-56 object-cover rounded-t-lg"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900">{property.title || 'Unknown Title'}</h3>
                                        <p className="text-gray-600 mt-2">{property.city || 'Unknown Location'}</p>
                                        <p className="text-gray-500 text-sm mt-1">₹{property.price || 'Price Unavailable'}</p>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No properties found for this host.</p>
                )}
            </section>

        </div>
    );
}

export default Hostdtls;
