import React from 'react';
import { FiCheckCircle, FiClock, FiShoppingBag } from 'react-icons/fi';

const QuickStats = ({ statusBreakdown, totals, formatCurrency }) => {
  return (
    <div className="quick-stats">
      <div className="stat-item">
        <FiCheckCircle className="stat-icon success" />
        <div>
          <span className="stat-label">Delivered</span>
          <span className="stat-value">
            {statusBreakdown?.find(s => 
              s._id.toLowerCase().includes('delivered')
            )?.count || 0}
          </span>
        </div>
      </div>
      
      <div className="stat-item">
        <FiClock className="stat-icon warning" />
        <div>
          <span className="stat-label">Processing</span>
          <span className="stat-value">
            {statusBreakdown?.find(s => 
              s._id.toLowerCase().includes('processing') || 
              s._id.toLowerCase().includes('placed')
            )?.count || 0}
          </span>
        </div>
      </div>
      
      <div className="stat-item">
        <FiShoppingBag className="stat-icon info" />
        <div>
          <span className="stat-label">Avg Order</span>
          <span className="stat-value">
            {totals?.orders > 0 
              ? formatCurrency(totals.revenue / totals.orders)
              : formatCurrency(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;