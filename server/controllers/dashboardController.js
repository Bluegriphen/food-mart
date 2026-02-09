// controllers/dashboardController.js
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    // 1. Count total products
    const totalProducts = await foodModel.countDocuments();
    
    // 2. Count total orders
    const totalOrders = await orderModel.countDocuments();
    
    // 3. Count total users
    const totalUsers = await userModel.countDocuments();
    
    // 4. Calculate total revenue
    const revenueData = await orderModel.aggregate([
      { $match: { payment: true } }, // Only paid orders
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    
    // 5. Get recent orders (last 5)
    const recentOrders = await orderModel.find({})
      .sort({ date: -1 })
      .limit(5)
      .populate('userId', 'name email'); // User details
    
    // 6. Order status breakdown
    const statusBreakdown = await orderModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    // 7. Popular categories
    const popularCategories = await foodModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      success: true,
      data: {
        totals: {
          products: totalProducts,
          orders: totalOrders,
          users: totalUsers,
          revenue: totalRevenue
        },
        recentOrders,
        statusBreakdown,
        popularCategories
      }
    });
    
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false, message: "Error fetching dashboard data" });
  }
};

// Monthly Revenue Chart Data
const getRevenueChartData = async (req, res) => {
  try {
    const last6Months = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          },
          payment: true
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          revenue: { $sum: "$amount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    res.json({ success: true, data: last6Months });
  } catch (error) {
    console.error("Revenue chart error:", error);
    res.status(500).json({ success: false, message: "Error fetching chart data" });
  }
};

export { getDashboardStats, getRevenueChartData };