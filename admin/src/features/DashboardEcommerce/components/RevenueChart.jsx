import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

const RevenueChart = ({ chartData, chartPeriod, onPeriodChange, formatCurrency }) => {
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
    <div className="chart-card full-width">
      <div className="chart-header">
        <h3><FiTrendingUp /> Revenue Trend</h3>
        <select 
          value={chartPeriod} 
          onChange={(e) => onPeriodChange(e.target.value)}
          className="chart-select"
        >
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3498db" 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">No revenue data available</div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;