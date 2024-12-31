import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

function ListingChart({ data }) {
    console.log(data);

    const COLORS = ['#75c8c8', '#9966ff', '#ff9f40', '#36a2eb', '#ffce56', '#ff6384'];

    return (
        <div className="w-[300px]">
            <ResponsiveContainer width="100%" height={400}>
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
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ fontSize: '10px' }} 
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ListingChart;
