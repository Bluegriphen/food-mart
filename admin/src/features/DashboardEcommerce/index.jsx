
// import React, { useEffect, useState, useCallback } from 'react';
// import './dashboard.css';
// import {
//   AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   LineChart, Line
// } from 'recharts';
// import { 
//   FiPackage, FiShoppingBag, FiUsers, FiDollarSign, 
//   FiTrendingUp, FiClock, FiCheckCircle, FiXCircle,
//   FiRefreshCw, FiEye, FiEdit
// } from 'react-icons/fi';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [chartPeriod, setChartPeriod] = useState('6');
//   const [lastUpdated, setLastUpdated] = useState(new Date());

//   const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
  
//   const STATUS_COLORS = {
//     'placed': '#ffeaa7',
//     'processing': '#a29bfe',
//     'delivered': '#55efc4',
//     'cancelled': '#fab1a0',
//     'order placed': '#ffeaa7',
//     'food processing': '#a29bfe'
//   };

//   const getDashboardData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Parallel API calls for better performance
//       const [statsResponse, chartResponse] = await Promise.all([
//         fetch(`${API_URL}/api/dashboard/stats`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' }
//         }),
//         fetch(`${API_URL}/api/dashboard/chart`)
//       ]);

//       if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
//       if (!chartResponse.ok) throw new Error('Failed to fetch chart data');

//       const statsResult = await statsResponse.json();
//       const chartResult = await chartResponse.json();

//       if (statsResult.success) {
//         setDashboardData(statsResult.data);
//       }
      
//       if (chartResult.success) {
//         setChartData(chartResult.data);
//       }
      
//       setLastUpdated(new Date());

//     } catch (err) {
//       console.error('Dashboard fetch error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getDashboardData();
//     const interval = setInterval(getDashboardData, 60000);
//     return () => clearInterval(interval);
//   }, [getDashboardData]);

//   const formatCurrency = (value) => {
//     if (!value && value !== 0) return '₹0';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(value);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString('en-IN', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const getStatusColor = (status) => {
//     const key = status?.toLowerCase() || '';
//     return STATUS_COLORS[key] || '#95a5a6';
//   };

//   const getStatusClass = (status) => {
//     return `status-badge status-${status?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
//   };

//   // Chart Data Preparations
//   const getRevenueChartData = () => {
//     if (!chartData || chartData.length === 0) return [];
//     return chartData.map(item => ({
//       month: `${item._id.month}/${item._id.year}`,
//       revenue: item.revenue || 0,
//       orders: item.orders || 0
//     }));
//   };

//   const getStatusChartData = () => {
//     if (!dashboardData?.statusBreakdown || dashboardData.statusBreakdown.length === 0) {
//       return [];
//     }
//     return dashboardData.statusBreakdown.map(item => ({
//       name: item._id,
//       value: item.count,
//       color: getStatusColor(item._id)
//     }));
//   };

//   const getCategoryData = () => {
//     if (!dashboardData?.popularCategories || dashboardData.popularCategories.length === 0) {
//       return [];
//     }
//     return dashboardData.popularCategories.map((item, index) => ({
//       name: item._id,
//       count: item.count,
//       color: COLORS[index % COLORS.length]
//     }));
//   };

//   if (loading && !dashboardData) {
//     return (
//       <div className="dashboard-loading">
//         <div className="loader"></div>
//         <p>Loading dashboard data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       {/* Header Section */}
//       <div className="dashboard-header">
//         <div className="header-left">
//           <h1>Dashboard Overview</h1>
//           <p className="welcome-text">
//             {error ? (
//               <span className="error-text">⚠️ {error}</span>
//             ) : (
//               <>Last updated: {lastUpdated.toLocaleTimeString()}</>
//             )}
//           </p>
//         </div>
//         <div className="header-right">
//           <button 
//             onClick={getDashboardData} 
//             className="refresh-btn"
//             disabled={loading}
//           >
//             <FiRefreshCw className={loading ? 'spin' : ''} />
//             {loading ? 'Refreshing...' : 'Refresh'}
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon products">
//             <FiPackage />
//           </div>
//           <div className="stat-content">
//             <span className="stat-label">Total Products</span>
//             <span className="stat-value">
//               {dashboardData?.totals?.products?.toLocaleString() || '0'}
//             </span>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon orders">
//             <FiShoppingBag />
//           </div>
//           <div className="stat-content">
//             <span className="stat-label">Total Orders</span>
//             <span className="stat-value">
//               {dashboardData?.totals?.orders?.toLocaleString() || '0'}
//             </span>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon users">
//             <FiUsers />
//           </div>
//           <div className="stat-content">
//             <span className="stat-label">Total Users</span>
//             <span className="stat-value">
//               {dashboardData?.totals?.users?.toLocaleString() || '0'}
//             </span>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon revenue">
//             <FiDollarSign />
//           </div>
//           <div className="stat-content">
//             <span className="stat-label">Total Revenue</span>
//             <span className="stat-value">
//               {formatCurrency(dashboardData?.totals?.revenue)}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Charts Grid */}
//       <div className="charts-grid">
//         {/* Revenue Trend Chart */}
//         <div className="chart-card full-width">
//           <div className="chart-header">
//             <h3><FiTrendingUp /> Revenue Trend</h3>
//             <select 
//               value={chartPeriod} 
//               onChange={(e) => setChartPeriod(e.target.value)}
//               className="chart-select"
//             >
//               <option value="6">Last 6 Months</option>
//               <option value="12">Last 12 Months</option>
//             </select>
//           </div>
//           <div className="chart-container">
//             {getRevenueChartData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={350}>
//                 <AreaChart data={getRevenueChartData()}>
//                   <defs>
//                     <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
//                   <Tooltip formatter={(value) => formatCurrency(value)} />
//                   <Legend />
//                   <Area 
//                     type="monotone" 
//                     dataKey="revenue" 
//                     stroke="#3498db" 
//                     fillOpacity={1} 
//                     fill="url(#revenueGradient)" 
//                     name="Revenue"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="no-data-chart">No revenue data available</div>
//             )}
//           </div>
//         </div>

//         {/* Order Status Chart */}
//         <div className="chart-card">
//           <div className="chart-header">
//             <h3><FiClock /> Order Status</h3>
//           </div>
//           <div className="chart-container">
//             {getStatusChartData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={getStatusChartData()}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={5}
//                     dataKey="value"
//                     label={({ name, percent }) => 
//                       `${name} (${(percent * 100).toFixed(0)}%)`
//                     }
//                   >
//                     {getStatusChartData().map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="no-data-chart">No status data available</div>
//             )}
//           </div>
//         </div>

//         {/* Popular Categories Chart */}
//         <div className="chart-card">
//           <div className="chart-header">
//             <h3>Popular Categories</h3>
//           </div>
//           <div className="chart-container">
//             {getCategoryData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={getCategoryData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" name="Products">
//                     {getCategoryData().map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="no-data-chart">No category data available</div>
//             )}
//           </div>
//         </div>

//         {/* Orders vs Revenue Comparison */}
//         <div className="chart-card">
//           <div className="chart-header">
//             <h3>Orders vs Revenue</h3>
//           </div>
//           <div className="chart-container">
//             {getRevenueChartData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={getRevenueChartData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis yAxisId="left" />
//                   <YAxis yAxisId="right" orientation="right" />
//                   <Tooltip 
//                     formatter={(value, name) => {
//                       if (name === 'Revenue') return formatCurrency(value);
//                       return value;
//                     }}
//                   />
//                   <Legend />
//                   <Line 
//                     yAxisId="left"
//                     type="monotone" 
//                     dataKey="revenue" 
//                     stroke="#2ecc71" 
//                     name="Revenue"
//                     dot={{ r: 4 }}
//                   />
//                   <Line 
//                     yAxisId="right"
//                     type="monotone" 
//                     dataKey="orders" 
//                     stroke="#e74c3c" 
//                     name="Orders"
//                     dot={{ r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="no-data-chart">No comparison data available</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders Table */}
//       <div className="recent-orders-section">
//         <div className="section-header">
//           <h3>Recent Orders</h3>
//           <span className="order-count">
//             Total: {dashboardData?.totals?.orders?.toLocaleString() || 0} orders
//           </span>
//         </div>
        
//         <div className="table-responsive">
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dashboardData?.recentOrders?.length > 0 ? (
//                 dashboardData.recentOrders.map((order) => (
//                   <tr key={order._id}>
//                     <td className="order-id">#{order._id.slice(-8)}</td>
//                     <td>
//                       <div className="customer-info">
//                         <span className="customer-name">
//                           {order.userId?.name || 'Guest User'}
//                         </span>
//                         {order.userId?.email && (
//                           <span className="customer-email">{order.userId.email}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="amount">{formatCurrency(order.amount)}</td>
//                     <td>
//                       <span 
//                         className={getStatusClass(order.status)}
//                         style={{ backgroundColor: getStatusColor(order.status) }}
//                       >
//                         {order.status || 'N/A'}
//                       </span>
//                     </td>
//                     <td>{formatDate(order.date)}</td>
//                     <td>
//                       <button className="action-btn" title="View">
//                         <FiEye />
//                       </button>
//                       <button className="action-btn" title="Edit">
//                         <FiEdit />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     No recent orders found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quick Stats Footer */}
//       {dashboardData?.statusBreakdown && (
//         <div className="quick-stats">
//           <div className="stat-item">
//             <FiCheckCircle className="stat-icon success" />
//             <div>
//               <span className="stat-label">Delivered</span>
//               <span className="stat-value">
//                 {dashboardData.statusBreakdown.find(s => 
//                   s._id.toLowerCase().includes('delivered')
//                 )?.count || 0}
//               </span>
//             </div>
//           </div>
//           <div className="stat-item">
//             <FiClock className="stat-icon warning" />
//             <div>
//               <span className="stat-label">Processing</span>
//               <span className="stat-value">
//                 {dashboardData.statusBreakdown.find(s => 
//                   s._id.toLowerCase().includes('processing') || 
//                   s._id.toLowerCase().includes('placed')
//                 )?.count || 0}
//               </span>
//             </div>
//           </div>
//           <div className="stat-item">
//             <FiShoppingBag className="stat-icon info" />
//             <div>
//               <span className="stat-label">Avg Order</span>
//               <span className="stat-value">
//                 {dashboardData.totals?.orders > 0 
//                   ? formatCurrency(dashboardData.totals.revenue / dashboardData.totals.orders)
//                   : formatCurrency(0)}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState, useCallback } from 'react';
import './dashboard.css';

// Import all components
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import RevenueChart from './components/RevenueChart';
import OrderStatusChart from './components/OrderStatusChart';
import CategoryChart from './components/CategoryChart';
import OrdersVsRevenue from './components/OrdersVsRevenue';
import RecentOrders from './components/RecentOrders';
import QuickStats from './components/QuickStats';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('6');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, chartResponse] = await Promise.all([
        fetch(`${API_URL}/api/dashboard/stats`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch(`${API_URL}/api/dashboard/chart?months=${chartPeriod}`)
      ]);

      if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
      if (!chartResponse.ok) throw new Error('Failed to fetch chart data');

      const statsResult = await statsResponse.json();
      const chartResult = await chartResponse.json();

      if (statsResult.success) {
        console.log('Dashboard Data:', statsResult.data);
        setDashboardData(statsResult.data);
      }
      
      if (chartResult.success) {
        console.log('Chart Data:', chartResult.data);
        setChartData(chartResult.data);
      }
      
      setLastUpdated(new Date());

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [chartPeriod]);

  useEffect(() => {
    getDashboardData();
    const interval = setInterval(getDashboardData, 60000);
    return () => clearInterval(interval);
  }, [getDashboardData]);

  const formatCurrency = (value) => {
    if (!value && value !== 0) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleRefresh = () => {
    getDashboardData();
  };

  const handlePeriodChange = (period) => {
    setChartPeriod(period);
  };

  if (loading && !dashboardData) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header 
        error={error}
        lastUpdated={lastUpdated}
        loading={loading}
        onRefresh={handleRefresh}
      />

      <StatsCards 
        totals={dashboardData?.totals}
        formatCurrency={formatCurrency}
      />

      <div className="charts-grid">
        <RevenueChart 
          chartData={chartData}
          chartPeriod={chartPeriod}
          onPeriodChange={handlePeriodChange}
          formatCurrency={formatCurrency}
        />

        <OrderStatusChart 
          statusBreakdown={dashboardData?.statusBreakdown}
        />

        <CategoryChart 
          categories={dashboardData?.popularCategories}
        />

        <OrdersVsRevenue 
          chartData={chartData}
          formatCurrency={formatCurrency}
        />
      </div>

      <RecentOrders 
        recentOrders={dashboardData?.recentOrders}
        totalOrders={dashboardData?.totals?.orders}
        formatCurrency={formatCurrency}
        formatDate={(date) => {
          if (!date) return 'N/A';
          try {
            return new Date(date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });
          } catch {
            return 'Invalid Date';
          }
        }}
      />

      <QuickStats 
        statusBreakdown={dashboardData?.statusBreakdown}
        totals={dashboardData?.totals}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Dashboard;