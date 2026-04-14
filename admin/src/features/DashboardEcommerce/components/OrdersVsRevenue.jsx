import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const OrdersVsRevenue = ({ chartData, formatCurrency }) => {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    return chartData.map(item => {
      // Handle new format (with label)
      if (item.label) {
        return {
          month: item.label,
          revenue: item.revenue || 0,
          orders: item.orders || 0
        };
      } 
      // Handle old format (with _id)
      else if (item._id) {
        return {
          month: `${item._id.month}/${item._id.year}`,
          revenue: item.revenue || 0,
          orders: item.orders || 0
        };
      }
      // Fallback for any other format
      return {
        month: 'Unknown',
        revenue: 0,
        orders: 0
      };
    });
  };

  const data = getChartData();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3><FiBarChart2 /> Orders vs Revenue</h3>
        <span className="badge info">Delivered Orders Only</span>
      </div>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#3498db"
                tickFormatter={(value) => `₹${value/1000}K`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#2ecc71"
                tickFormatter={(value) => value}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return formatCurrency(value);
                  if (name === 'orders') return `${value} orders`;
                  return value;
                }}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="revenue" 
                fill="#3498db" 
                name="Revenue" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right" 
                dataKey="orders" 
                fill="#2ecc71" 
                name="Orders"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">
            <p>No orders vs revenue data available</p>
            <small>Data will appear when orders are delivered</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersVsRevenue;