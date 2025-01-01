import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Revenewchart({ data }) {
  return (
    <div className="w-4xl mx-auto hover:cursor-pointer ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 pt-4 text-center" id="admdashbord">
        Revenue
      </h2>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg hover:cursor-pointer">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="month" tick={{ fill: '#374151', fontSize: 12 }} />
            <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
              labelStyle={{ color: '#6b7280', fontWeight: 'bold' }}
              itemStyle={{ color: '#4b5563' }}
            />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ top: 0 }} />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Revenewchart;
