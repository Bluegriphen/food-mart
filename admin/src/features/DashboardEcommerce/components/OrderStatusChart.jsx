import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiClock } from 'react-icons/fi';

const STATUS_COLORS = {
  'placed': '#ffeaa7',
  'processing': '#a29bfe',
  'delivered': '#55efc4',
  'cancelled': '#fab1a0',
  'order placed': '#ffeaa7',
  'food processing': '#a29bfe'
};

const OrderStatusChart = ({ statusBreakdown }) => {
  const getStatusColor = (status) => {
    const key = status?.toLowerCase() || '';
    return STATUS_COLORS[key] || '#95a5a6';
  };

  const getChartData = () => {
    if (!statusBreakdown || statusBreakdown.length === 0) return [];
    return statusBreakdown.map(item => ({
      name: item._id,
      value: item.count,
      color: getStatusColor(item._id)
    }));
  };

  const data = getChartData();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3><FiClock /> Order Status</h3>
      </div>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data-chart">No status data available</div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusChart;