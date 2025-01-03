import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminlist, gethosts, userfetch } from '../../Store/slices/Dataslice';
import ListingChart from '../../components/ui/Listingchart';
import axiosinstance from '../../axiosinstance';
import Revenewchart from '../../components/ui/Revenewchart';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { listings, Users, Hosts } = useSelector((state) => state.listing);
  const [revenew, setRevenew] = useState({})

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminlist());
    dispatch(userfetch());
    dispatch(gethosts());
  }, []);

  console.log(Users);



  const categoryData = listings?.reduce((acc, item) => {
    const category = item.category;
    const existingCategory = acc.find((cat) => cat.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  const listcount = listings?.length
  const revenewdata = revenew?.adminRevenue
  const usercount = Users?.length
  const hostcount = Hosts?.length

  const revenewdatas = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
    { month: 'Jul', revenue: 3490 },
    { month: 'Aug', revenue: 3000 },
    { month: 'Sep', revenue: 1890 },
    { month: 'Oct', revenue: 2780 },
    { month: 'Nov', revenue: 3200 },
    { month: 'Dec', revenue: revenewdata },
    
  ];

  useEffect(() => {
    const revenewfeth = async () => {
      try {
        const res = await axiosinstance.get("/admin/revenew")
        console.log(res.data);

        setRevenew(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    revenewfeth()
  }, [])



  return (
    <div className="h-full">
      <div className="mt-20 ml-72">

        <div className="flex gap-4 h-52 hover:cursor-pointer pt-5">
          <Link to={"/Admin-listing"}>
            <div className="bg-gray-100 text-gray-700 p-4 pt-9 rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
              Listings
              <div className='pt-4'>{listcount}</div>
            </div>
          </Link>
          <Link to={"/Admin-User"}>
            <div className="bg-gray-100 text-gray-700 p-4 pt-9 rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
              Users
              <div className='pt-4'>{usercount}</div>
            </div>
          </Link>
          <Link to={"/Admin-hosts"}>
            <div className="bg-gray-100 text-gray-700 p-4 pt-9 rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
              Hosts
              <div className='pt-4'>{hostcount}</div>
            </div>
          </Link>

          <div className="bg-gray-100 text-gray-700 p-4 pt-9  rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
            Revenue
            <div className='pt-4'>{revenewdata}</div>
          </div>
        </div>
        <div className="flex flex-wrap ">
          <div className="flex-1 w-[500px] ">
            <Revenewchart data={revenewdatas} />
          </div>
          <div className="flex-1 min-w-[300px]">
            <ListingChart data={categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
