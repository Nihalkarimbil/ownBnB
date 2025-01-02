import React, { useEffect, useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import axiosinstance from '../../axiosinstance';


function BlockedUsers() {
    const [Users, setUsers] = useState([])
    useEffect(()=>{
        const Blockfecth= async()=>{
            try {
                const res= await axiosinstance.get("/admin/getblockedusers")
                setUsers(res.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        Blockfecth()
    },[])
    

    const profileImageTemplate = (rowData) => (
        <Link to={`/Admin-userby/${rowData._id}`}>
            <img
                src={rowData.profileimage}
                alt={rowData.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-md"
            />
        </Link>
    );

    const footer = (
        <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-b-lg shadow-sm">
            Total users: {Users ? Users.length : 0}
        </div>
    );

    return (
        <div>
            <div className="container px-4 py-8 mt-16 ml-72 max-w-6xl">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Users</h1>
                    <DataTable
                        value={Users}
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
                            headerClassName="bg-gray-100 text-gray-800 font-semibold pl-24 "
                            bodyClassName="pl-24"
                        />


                        <Column
                            field="username"
                            header="Username"
                            sortable
                            headerClassName="bg-gray-100 text-gray-800 font-semibold"
                            bodyClassName="pl-4"
                        />


                        <Column
                            field="email"
                            header="Email"
                            sortable
                            headerClassName="bg-gray-100 text-gray-800 font-semibold"
                        />

                        <Column
                            field="_id"
                            header="ID"
                            sortable
                            headerClassName="bg-gray-100 text-gray-800 font-semibold h-14 pl-24"
                            bodyClassName="text-center"
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default BlockedUsers
