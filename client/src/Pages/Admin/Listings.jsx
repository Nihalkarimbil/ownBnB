import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminlist } from '../../Store/slices/Dataslice';
import { Link } from 'react-router-dom';

export default function Listings() {
  const { listings } = useSelector((state) => state.listing);
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0); 
  const [rows, setRows] = useState(6); 
  const [active,setActive]=useState([])
 
  useEffect(() => {
    dispatch(getAdminlist());
  }, [dispatch]);

  useEffect(()=>{
    setActive(listings.filter((item)=>item.approved===true))
  },[dispatch,listings])

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={product.images[0]}
        alt="Product"
        className="w-16 h-16 rounded-lg shadow-md object-cover"
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return <span className="text-green-600 font-semibold">{formatCurrency(product.price)}</span>;
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} className="text-yellow-500" />;
  };



  const titleBodyTemplate = (product) => {
    return (<Link to={`/item-details/${product._id}`} className="text-blue-600 font-semibold">
      {product.title || 'No Title'}
    </Link>)
  };

 

  const footer = (
    <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-b-lg shadow-sm">
      Total products: {active ? active.length : 0}
    </div>
  );

 
  const onPageChange = (event) => {
    setFirst(event.first); 
    setRows(event.rows);   
  };

  return (
    <div className="p-6 mt-16 ml-64 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 text-center" id='admdashbord'> Active Listings</h1>
      <DataTable
        value={active}
        paginator
        first={first}
        rows={rows}
        onPage={onPageChange}
        totalRecords={active ? active.length : 0}
        footer={footer}
        stripedRows
        tableStyle={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}
      >
        <Column
          field="title"
          header="Title"
          body={titleBodyTemplate}
          headerClassName="bg-gray-100 text-gray-800 font-semibold h-14 pl-52 "
          bodyClassName="pl-32 w-auto"
        />
        <Column
          header="Image"
          body={imageBodyTemplate}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="price"
          header="Price"
          body={priceBodyTemplate}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="category"
          header="Category"
          className="text-gray-600 font-semibold"
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="rating"
          header="Reviews"
          body={ratingBodyTemplate}
          headerClassName="bg-gray-100 text-gray-800 font-semibold "
        />
      </DataTable>
    </div>
  );
}
