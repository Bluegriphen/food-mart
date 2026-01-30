import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import "./dashboard.css";

const Widget = lazy(() => import("./Widgets"));
const Section = lazy(() => import("./Section"));
const Loader = lazy(() => import("./Loader"));

const DashboardEcommerce = () => {
  document.title = "Food Mart Admin";

  const [dashboardData, setDashboardData] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [userCategory, setUserCategory] = useState(
    localStorage.getItem("userCategory"),
  );
  const [error, setError] = useState(null);

  const getDashboardData = useCallback(async () => {
    try {
      setShowLoader(true);
      setError(null);

      // mock data (replace with API later)
      setDashboardData({
        orders: 120,
        products: 45,
        users: 78,
        revenue: 35600,
      });

      setShowLoader(false);
    } catch (err) {
      setError("Failed to load dashboard data");
      setShowLoader(false);
    }
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData, userCategory]);

  return (
    <div className="dashboard-page">
      <Suspense fallback={<div className="skeleton header" />}>
        <Section userCategory={userCategory} />
      </Suspense>

      <div className="dashboard-body">
        <Suspense fallback={<div className="skeleton widgets" />}>
          <div className={showLoader ? "blur" : ""}>
            {error ? (
              <div className="error-box">{error}</div>
            ) : (
              <Widget dashboard={dashboardData} />
            )}
          </div>
          {showLoader && <Loader />}
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardEcommerce;
