import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Cloud', cost: 120000 },
  { name: 'On-Premises', cost: 80000 },
];

const ExpenseBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cost" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;