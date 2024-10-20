import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toISOString().split('T')[0],
      cloud: Math.floor(Math.random() * 5000) + 3000,
      onPremises: Math.floor(Math.random() * 3000) + 2000,
    });
  }
  return data;
};

const data = generateData();

const SpendingTrendChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cloud" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="onPremises" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendingTrendChart;