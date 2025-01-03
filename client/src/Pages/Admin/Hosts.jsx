import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gethosts } from '../../Store/slices/Dataslice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

function Hosts() {
    const { Hosts } = useSelector((state) => state.listing);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(gethosts());
    }, [dispatch]);

    const profileImageTemplate = (rowData) => (
        <Link to={`/Admin-hostby/${rowData._id}`}>
            <img
                src={rowData.profileimage}
                alt={rowData.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-md"
            />
        </Link>
    );

    const footer = (
        <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-b-lg shadow-sm">
            Total Host: {Hosts ? Hosts.length : 0}
        </div>
    );

    return (
        <div className="container px-4 py-8 mt-16 ml-72 max-w-6xl">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center"id='admdashbord'>Hosts</h1>
                <DataTable
                    value={Hosts}
                    footer={footer}
                    paginator
                    rows={6}

                    className="p-datatable-gridlines"
                    responsiveLayout="scroll"
                    emptyMessage="No users found."
                    tableStyle={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}
                >

                    <Column
                        body={profileImageTemplate}
                        header="Profile Image"
                        className="text-center"
                        headerClassName="bg-gray-100 text-green-800 font-semibold pl-24 "
                        bodyClassName="pl-24"
                    />


                    <Column
                        field="username"
                        header="Username"
                        sortable
                        headerClassName="bg-gray-100 text-green-800 font-semibold"
                        bodyClassName="pl-4"
                    />


                    <Column
                        field="email"
                        header="Email"
                        sortable
                        headerClassName="bg-gray-100 text-green-800 font-semibold"
                    />

                    <Column
                        field="_id"
                        header="ID"
                        sortable
                        headerClassName="bg-gray-100 text-green-800 font-semibold h-14 pl-24"
                        bodyClassName="text-center"
                    />
                </DataTable>
            </div>
        </div>
    );
}

export default Hosts;

