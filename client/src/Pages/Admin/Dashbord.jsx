import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminlist } from '../../Store/slices/Dataslice';
import ListingChart from '../../components/ui/Listingchart';

function Dashboard() {
  const { Adminlist } = useSelector((state) => state.listing);
 
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminlist());
  }, []);

  const listcount= Adminlist?.length
  const categoryData = Adminlist?.reduce((acc, item) => {
    const category = item.category; 
    const existingCategory = acc.find((cat) => cat.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 }); 
    }
    return acc;
  }, []);

  useEffect(()=>{
    try {
      
    } catch (error) {
      
    }
  },[])
  
  

  return (
    <div className="h-full">
      <div className="mt-20 ml-72">
        
        <div className="flex gap-4 h-52 hover:cursor-pointer">
          <div className="bg-gray-100 text-gray-700 p-4 pt-9 rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
            Listings
            <div className='pt-4'>{listcount}</div>
          </div>
          <div className="bg-gray-100 text-gray-700 p-4 pt-9 rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
            Users
          </div>
          <div className="bg-gray-100 text-gray-700 p-4 pt-9 rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
            Hosts
          </div>
          <div className="bg-gray-100 text-gray-700 p-4 pt-9  rounded w-72 text-center text-3xl h-40 shadow-md hover:shadow-lg" id="admdashbord">
            Revenue
          </div>
        </div>
        <div >
          <h1 >listing categories</h1>
          <ListingChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
