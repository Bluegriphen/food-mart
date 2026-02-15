import React from 'react';
import { FiEye, FiEdit } from 'react-icons/fi';

const STATUS_COLORS = {
  'placed': '#ffeaa7',
  'processing': '#a29bfe',
  'delivered': '#55efc4',
  'cancelled': '#fab1a0',
  'order placed': '#ffeaa7',
  'food processing': '#a29bfe'
};

const RecentOrders = ({ recentOrders, totalOrders, formatCurrency, formatDate }) => {
  const getStatusColor = (status) => {
    const key = status?.toLowerCase() || '';
    return STATUS_COLORS[key] || '#95a5a6';
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
  };

  return (
    <div className="recent-orders-section">
      <div className="section-header">
        <h3>Recent Orders</h3>
        <span className="order-count">
          Total: {totalOrders?.toLocaleString() || 0} orders
        </span>
      </div>
      
      <div className="table-responsive">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders?.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="order-id">#{order._id.slice(-8)}</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">
                        {order.userId?.name || 'Guest User'}
                      </span>
                      {order.userId?.email && (
                        <span className="customer-email">{order.userId.email}</span>
                      )}
                    </div>
                  </td>
                  <td className="amount">{formatCurrency(order.amount)}</td>
                  <td>
                    <span 
                      className={getStatusClass(order.status)}
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status || 'N/A'}
                    </span>
                  </td>
                  <td>{formatDate(order.date)}</td>
                  <td>
                    <button className="action-btn" title="View">
                      <FiEye />
                    </button>
                    <button className="action-btn" title="Edit">
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No recent orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;