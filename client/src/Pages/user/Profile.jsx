import React, { useEffect, useState } from "react";
import BGimg from "../../assets/Bg.png"
import { useSelector } from "react-redux";
import { logOut } from "../../Store/slices/Userslice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axiosinstance from "../../axiosinstance";

function AirbnbProfile() {
  const { user } = useSelector((state) => state.User)
  const [Booking, setBooking] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(Booking);

  const handlelogout = () => {
    dispatch(logOut())
    navigate("/")
  }
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
    <section className="container  px-8 py-10 ">

      <Card shadow={false} className="border border-gray-300 rounded-2xl mx-16">
        <CardHeader shadow={false} className="relative h-60 rounded-t-2xl bg-gray-200">
          <img
            src={BGimg}
            alt="Cover"
            className="w-full h-[260px] object-cover rounded-t-2xl"
          />

        </CardHeader>
        <div className="absolute -bottom-12 left-8 z-50 mb-36 ">
          <Avatar
            src={user.image}
            alt="User Avatar"
            className="border-4 border-white rounded-full h-24 w-24 shadow-lg"
          />
        </div>

        <CardBody className="pt-14">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

            <div>
              <Typography color="blue-gray" variant="h5" className="font-bold">
                {user.username}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {user.email}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                Member since January 2023
              </Typography>
            </div>

            <div className="flex gap-4">
              <Button variant="outlined" className="border-gray-300">
                Edit Profile
              </Button>
              <Button onClick={handlelogout}
                variant="filled" className="bg-red-500 text-white">
                Logout
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>


      <div className="mt-10 mx-14">
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

    </section>
  );
}

export default AirbnbProfile;
