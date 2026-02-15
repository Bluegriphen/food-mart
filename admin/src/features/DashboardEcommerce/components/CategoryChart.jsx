import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

const CategoryChart = ({ categories }) => {
  const getChartData = () => {
    if (!categories || categories.length === 0) return [];
    return categories.map((item, index) => ({
      name: item._id,
      count: item.count,
      color: COLORS[index % COLORS.length]
    }));
  };

  const data = getChartData();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Popular Categories</h3>
      </div>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Products">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">No category data available</div>
        )}
      </div>
    </div>
  );
};

export default CategoryChart;