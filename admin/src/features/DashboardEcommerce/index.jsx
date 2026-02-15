// import React, { useEffect, useState, useCallback } from 'react';
// import './dashboard.css';

// // Import all components
// import Header from './components/Header';
// import StatsCards from './components/StatsCards';
// import RevenueChart from './components/RevenueChart';
// import OrderStatusChart from './components/OrderStatusChart';
// import CategoryChart from './components/CategoryChart';
// import OrdersVsRevenue from './components/OrdersVsRevenue';
// import RecentOrders from './components/RecentOrders';
// import QuickStats from './components/QuickStats';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [chartPeriod, setChartPeriod] = useState('6');
//   const [lastUpdated, setLastUpdated] = useState(new Date());

//   const getDashboardData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const [statsResponse, chartResponse] = await Promise.all([
//         fetch(`${API_URL}/api/dashboard/stats`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' }
//         }),
//         fetch(`${API_URL}/api/dashboard/chart?months=${chartPeriod}`)
//       ]);

//       if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
//       if (!chartResponse.ok) throw new Error('Failed to fetch chart data');

//       const statsResult = await statsResponse.json();
//       const chartResult = await chartResponse.json();

//       if (statsResult.success) {
//         console.log('Dashboard Data:', statsResult.data);
//         setDashboardData(statsResult.data);
//       }
      
//       if (chartResult.success) {
//         console.log('Chart Data:', chartResult.data);
//         setChartData(chartResult.data);
//       }
      
//       setLastUpdated(new Date());

//     } catch (err) {
//       console.error('Dashboard fetch error:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [chartPeriod]);

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

//   const handleRefresh = () => {
//     getDashboardData();
//   };

//   const handlePeriodChange = (period) => {
//     setChartPeriod(period);
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
//       <Header 
//         error={error}
//         lastUpdated={lastUpdated}
//         loading={loading}
//         onRefresh={handleRefresh}
//       />

//       <StatsCards 
//         totals={dashboardData?.totals}
//         formatCurrency={formatCurrency}
//       />

//       <div className="charts-grid">
//         <RevenueChart 
//           chartData={chartData}
//           chartPeriod={chartPeriod}
//           onPeriodChange={handlePeriodChange}
//           formatCurrency={formatCurrency}
//         />

//         <OrderStatusChart 
//           statusBreakdown={dashboardData?.statusBreakdown}
//         />

//         <CategoryChart 
//           categories={dashboardData?.popularCategories}
//         />

//         <OrdersVsRevenue 
//           chartData={chartData}
//           formatCurrency={formatCurrency}
//         />
//       </div>

//       <RecentOrders 
//         recentOrders={dashboardData?.recentOrders}
//         totalOrders={dashboardData?.totals?.orders}
//         formatCurrency={formatCurrency}
//         formatDate={(date) => {
//           if (!date) return 'N/A';
//           try {
//             return new Date(date).toLocaleDateString('en-IN', {
//               day: 'numeric',
//               month: 'short',
//               year: 'numeric'
//             });
//           } catch {
//             return 'Invalid Date';
//           }
//         }}
//       />

//       <QuickStats 
//         statusBreakdown={dashboardData?.statusBreakdown}
//         totals={dashboardData?.totals}
//         formatCurrency={formatCurrency}
//       />
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
import StaffAnalytics from './components/StaffAnalytics'; // New component

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [staffAnalytics, setStaffAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('6');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch main dashboard stats and chart data
      const [statsResponse, chartResponse, staffTypeResponse, staffStatusResponse, staffGenderResponse] = await Promise.all([
        fetch(`${API_URL}/api/dashboard/stats`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch(`${API_URL}/api/dashboard/chart?months=${chartPeriod}`),
        fetch(`${API_URL}/api/dashboard/staff/distribution`),
        fetch(`${API_URL}/api/dashboard/staff/status`),
        fetch(`${API_URL}/api/dashboard/staff/gender`)
      ]);

      if (!statsResponse.ok) throw new Error('Failed to fetch dashboard stats');
      if (!chartResponse.ok) throw new Error('Failed to fetch chart data');

      const statsResult = await statsResponse.json();
      const chartResult = await chartResponse.json();
      const staffTypeResult = await staffTypeResponse.json();
      const staffStatusResult = await staffStatusResponse.json();
      const staffGenderResult = await staffGenderResponse.json();

      if (statsResult.success) {
        console.log('Dashboard Data:', statsResult.data);
        setDashboardData(statsResult.data);
      }
      
      if (chartResult.success) {
        console.log('Chart Data:', chartResult.data);
        setChartData(chartResult.data);
      }

      // Set staff analytics data
      setStaffAnalytics({
        byType: staffTypeResult.success ? staffTypeResult.data : [],
        byStatus: staffStatusResult.success ? staffStatusResult.data : [],
        byGender: staffGenderResult.success ? staffGenderResult.data : []
      });
      
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

      {/* Staff Analytics Section */}
      {staffAnalytics && (
        <div className="staff-analytics-section">
          <h2 className="section-title">Staff Analytics</h2>
          <StaffAnalytics data={staffAnalytics} />
        </div>
      )}

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