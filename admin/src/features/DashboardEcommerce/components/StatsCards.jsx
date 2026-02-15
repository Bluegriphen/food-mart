import React from 'react';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

const StatsCards = ({ totals, formatCurrency }) => {
  const stats = [
    {
      icon: <FiPackage />,
      label: 'Total Products',
      value: totals?.products?.toLocaleString() || '0',
      iconClass: 'products'
    },
    {
      icon: <FiShoppingBag />,
      label: 'Total Orders',
      value: totals?.orders?.toLocaleString() || '0',
      iconClass: 'orders'
    },
    {
      icon: <FiUsers />,
      label: 'Total Users',
      value: totals?.users?.toLocaleString() || '0',
      iconClass: 'users'
    },
    {
      icon: <FiDollarSign />,
      label: 'Total Revenue',
      value: formatCurrency(totals?.revenue),
      iconClass: 'revenue'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className={`stat-icon ${stat.iconClass}`}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;