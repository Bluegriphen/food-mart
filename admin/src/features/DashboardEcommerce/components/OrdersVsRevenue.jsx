import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrdersVsRevenue = ({ chartData, formatCurrency }) => {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    return chartData.map(item => ({
      month: `${item._id.month}/${item._id.year}`,
      revenue: item.revenue || 0,
      orders: item.orders || 0
    }));
  };

  const data = getChartData();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Orders vs Revenue</h3>
      </div>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Revenue') return formatCurrency(value);
                  return value;
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#2ecc71" 
                name="Revenue"
                dot={{ r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="orders" 
                stroke="#e74c3c" 
                name="Orders"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">No comparison data available</div>
        )}
      </div>
    </div>
  );
};

export default OrdersVsRevenue;