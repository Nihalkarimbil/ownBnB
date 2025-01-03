import React, { useEffect, useState } from 'react'
import axiosinstance from '../../axiosinstance';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

function PendigRserv() {
  const [Pending, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosinstance.get('/admin/admpendingres');
        setReservations(res.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <Link to={`/Admin-Reservationby/${rowData._id}`}>
        <img
          src={rowData.listing.images[0]}
          alt="Product"
          className="w-16 h-16 rounded-lg shadow-md object-cover"
        />
      </Link>
    );
  };

  const footer = (
    <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-b-lg shadow-sm">
      Total Reservations: {Pending ? Pending.length : 0}
    </div>
  );


  return (
    <div className="p-4 mt-16 pl-72">
      <h2 className="text-2xl font-bold mb-4 text-center"> Pending Reservation List</h2>
      <DataTable
        value={Pending}
        footer={footer}
        paginator rows={10}
        className="p-datatable-striped"
        tableStyle={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}
      >
        <Column
          field="_id"
          header="Reservation ID"
          sortable
          headerClassName="bg-gray-100 text-gray-800 font-semibold h-14 pl-14"
          bodyClassName="pl-10 w-auto"
        />
        <Column
          field="guest.username"
          header="guest Name"
          sortable
          body={(rowData) => rowData.guest?.username}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="listing.images"
          header="Image"
          body={imageBodyTemplate}
          headerClassName="bg-gray-100 text-gray-800 font-semibold "
        />
        <Column
          field="checkIn"
          header="Check-In"
          sortable
          body={(rowData) => formatDate(rowData.checkIn)}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="checkOut"
          header="Check-Out"
          sortable
          body={(rowData) => formatDate(rowData.checkOut)}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="listing.title"
          header="Listing Title"
          sortable
          body={(rowData) => rowData.listing?.title}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="guestCount"
          header="Guests"
          sortable
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="totalPrice"
          header="Total Price"
          sortable
          body={(rowData) => `₹${rowData.totalPrice}`}
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
        <Column
          field="status"
          header="Status"
          sortable
          headerClassName="bg-gray-100 text-gray-800 font-semibold"
        />
      </DataTable>
    </div>
  )
}

export default PendigRserv
