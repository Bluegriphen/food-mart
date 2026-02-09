import { useEffect, useState } from "react";
import RestaurantHeader from "../../components/RestaurantHeader";
import StatsCards from "../../components/StatsCards";
import RevenueChart from "../../components/RevenueChart";
import PopularItems from "../../components/PopularItems";
import RecentOrders from "../../components/RecentOrders";
import InventoryAlerts from "../../components/InventoryAlerts";
import DeliveryPerformance from "../../components/DeliveryPerformance";
import Loader from "../../components/Loader";
import { getMockDashboardData } from "./data/mockData";

const DashboardEcommerce = () => {
  document.title = "Food Mart Admin Dashboard";

  const [dashboardData, setDashboardData] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);

  const getDashboardData = async () => {
    try {
      setShowLoader(true);
      setError(null);

      const mockData = getMockDashboardData();
      setDashboardData(mockData);

      // Simulate API delay
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      
    } catch (err) {
      setError("Failed to load restaurant data");
      setShowLoader(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger text-center">
              <div className="h1 mb-3">⚠️</div>
              <h3>Failed to load Food Mart data</h3>
              <p className="mb-3">{error}</p>
              <button onClick={getDashboardData} className="btn btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      {/* Header */}
      <RestaurantHeader data={dashboardData} onRefresh={getDashboardData} />
      
      {/* Main Content */}
      <div className="container-fluid p-4">
        {showLoader ? (
          <Loader />
        ) : (
          <>
            {/* Stats Cards Row */}
            <div className="row mb-4 g-4">
              <StatsCards data={dashboardData} />
            </div>

            {/* Charts and Popular Items */}
            <div className="row mb-4 g-4">
              <div className="col-xl-8 col-lg-7">
                <RevenueChart data={dashboardData} />
              </div>
              <div className="col-xl-4 col-lg-5">
                <PopularItems data={dashboardData} />
              </div>
            </div>

            {/* Recent Orders and Side Widgets */}
            <div className="row g-4">
              <div className="col-xl-8 col-lg-7">
                <RecentOrders data={dashboardData} />
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="row g-4">
                  <div className="col-12">
                    <InventoryAlerts data={dashboardData} />
                  </div>
                  <div className="col-12">
                    <DeliveryPerformance data={dashboardData} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardEcommerce;