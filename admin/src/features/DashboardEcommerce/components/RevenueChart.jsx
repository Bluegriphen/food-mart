// RevenueChart.jsx - Optional enhancement
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FiTrendingUp, FiInfo } from 'react-icons/fi';

const RevenueChart = ({ chartData, chartPeriod, onPeriodChange, formatCurrency }) => {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    return chartData.map(item => {
      if (item.label) {
        return {
          month: item.label,
          revenue: item.revenue || 0,
          orders: item.orders || 0,
          avgOrderValue: item.avgOrderValue || 0
        };
      } 
      else if (item._id) {
        return {
          month: `${item._id.month}/${item._id.year}`,
          revenue: item.revenue || 0,
          orders: item.orders || 0
        };
      }
      return null;
    }).filter(item => item !== null);
  };

  const data = getChartData();

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgMonthlyRevenue = data.length > 0 ? totalRevenue / data.length : 0;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="chart-card full-width">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3><FiTrendingUp /> Revenue Trend</h3>
          <div className="chart-summary">
            <span className="summary-badge total-revenue">
              Total: {formatCurrency(totalRevenue)}
            </span>
            <span className="summary-badge avg-monthly">
              Avg/Month: {formatCurrency(avgMonthlyRevenue)}
            </span>
            <span className="summary-badge total-orders">
              Orders: {totalOrders}
            </span>
            <span className="summary-badge avg-order">
              Avg Order: {formatCurrency(avgOrderValue)}
            </span>
          </div>
        </div>
        <select 
          value={chartPeriod} 
          onChange={(e) => onPeriodChange(e.target.value)}
          className="chart-select"
        >
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>
      
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2ecc71" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left"
                tickFormatter={(value) => `₹${value/1000}K`} 
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => value}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Revenue') return formatCurrency(value);
                  if (name === 'Orders') return `${value} orders`;
                  if (name === 'Avg Order Value') return formatCurrency(value);
                  return value;
                }}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#3498db" 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                name="Revenue"
                strokeWidth={2}
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="orders" 
                stroke="#2ecc71" 
                fillOpacity={1} 
                fill="url(#ordersGradient)" 
                name="Orders"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">
            <FiInfo size={40} color="#999" />
            <p>No revenue data available for delivered orders</p>
            <small>Orders marked as "Delivered" will appear here</small>
            <div className="status-example">
              <span className="status-badge">Order Placed</span> → 
              <span className="status-badge">Food Processing</span> → 
              <span className="status-badge">Out for Delivery</span> → 
              <span className="status-badge delivered">Delivered ✓</span>
            </div>
          </div>
        )}
      </div>

      <div className="chart-footer">
        <small className="text-muted">
          * Revenue is calculated based on orders marked as "Delivered" only
        </small>
      </div>
    </div>
  );
};

export default RevenueChart;