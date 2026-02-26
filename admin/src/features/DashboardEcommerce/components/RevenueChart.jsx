import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

const RevenueChart = ({ chartData, chartPeriod, onPeriodChange, formatCurrency }) => {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    // Sort data by year and month to ensure correct order
    const sortedData = [...chartData].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
    
    return sortedData.map(item => ({
      month: item.label || `${item.monthName} ${item.year}`,
      revenue: item.revenue || 0,
      orders: item.orders || 0,
      avgOrderValue: item.avgOrderValue || 0
    }));
  };

  const data = getChartData();

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgMonthlyRevenue = data.length > 0 ? totalRevenue / data.length : 0;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-revenue">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="tooltip-orders">
            Orders: {payload[1]?.value || 0} orders
          </p>
          <p className="tooltip-avg">
            Avg Order: {formatCurrency(payload[0].value / (payload[1]?.value || 1))}
          </p>
        </div>
      );
    }
    return null;
  };

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
            <AreaChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#ccc' }}
                tickLine={{ stroke: '#ccc' }}
                interval={0}
                angle={0}
                textAnchor="middle"
                height={50}
              />
              <YAxis 
                yAxisId="left"
                tickFormatter={(value) => `₹${(value/1000).toFixed(1)}K`}
                tick={{ fill: '#3498db', fontSize: 12 }}
                axisLine={{ stroke: '#3498db' }}
                tickLine={{ stroke: '#3498db' }}
                width={80}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => value}
                tick={{ fill: '#2ecc71', fontSize: 12 }}
                axisLine={{ stroke: '#2ecc71' }}
                tickLine={{ stroke: '#2ecc71' }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: 20 }}
                iconType="circle"
                iconSize={10}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#3498db" 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                name="Revenue"
                strokeWidth={2}
                activeDot={{ r: 8 }}
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
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">
            <FiTrendingUp size={40} color="#999" />
            <p>No revenue data available for delivered orders</p>
            <small>Orders marked as "Delivered" will appear here</small>
          </div>
        )}
      </div>

      <div className="chart-footer">
        <div className="chart-stats">
          <span>📊 {data.length} months shown</span>
          <span>📦 {totalOrders} total orders</span>
          <span>💰 {formatCurrency(totalRevenue)} total revenue</span>
        </div>
        <small className="text-muted">
          * Revenue is calculated based on orders marked as "Delivered" only
        </small>
      </div>
    </div>
  );
};

export default RevenueChart;