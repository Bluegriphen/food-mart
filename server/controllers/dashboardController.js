
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    // Sabhi promises ko parallel me run karein (faster)
    const [
      totalProducts,
      totalOrders, 
      totalUsers,
      revenueData,
      recentOrders,
      statusBreakdown,
      popularCategories
    ] = await Promise.all([
      foodModel.countDocuments(),
      orderModel.countDocuments(),
      userModel.countDocuments(),
      orderModel.aggregate([
        { $match: { payment: true } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      orderModel.find({})
        .sort({ date: -1 })
        .limit(5)
        .populate('userId', 'name email'),
      orderModel.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),
      foodModel.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

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
    res.status(500).json({ 
      success: false, 
      message: "Error fetching dashboard data" 
    });
  }
};

// Monthly Revenue Chart Data
const getRevenueChartData = async (req, res) => {
  try {
    // URL se months le sakte hain, jaise ?months=6 ya ?months=12
    const months = req.query.months ? parseInt(req.query.months) : 6;
    
    const chartData = await orderModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - months))
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
    
    res.json({ success: true, data: chartData || [] });
    
  } catch (error) {
    console.error("Revenue chart error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching chart data" 
    });
  }
};

export { getDashboardStats, getRevenueChartData };