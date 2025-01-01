import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

function ListingChart({ data }) {
    console.log(data);

    const COLORS = ['#75c8c8', '#9966ff', '#ff9f40', '#36a2eb', '#ffce56', '#ff6384'];

    return (
        <div className="w-[590px]  p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center"id="admdashbord">
                Categories
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg w">

                <ResponsiveContainer width="100%" height={300} >
                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="40%"
                        >
                            {data?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="left"
                            wrapperStyle={{ fontSize: '10px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default ListingChart;
