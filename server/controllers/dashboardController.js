import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import staffModel from "../models/staffModel.js";
import staffMasterModel from "../models/staffMasterModel.js";

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    // Sabhi promises ko parallel me run karein
    const [
      totalProducts,
      totalOrders, 
      totalUsers,
      totalStaff,
      activeStaff,
      revenueData,
      recentOrders,
      statusBreakdown,
      popularCategories
    ] = await Promise.all([
      foodModel.countDocuments(),
      orderModel.countDocuments(),
      userModel.countDocuments(),
      staffModel.countDocuments(),
      staffModel.countDocuments({ status: true }),
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
          staff: totalStaff,
          activeStaff: activeStaff,
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

// Staff by Type Distribution
const getStaffByType = async (req, res) => {
  try {
    const staffByType = await staffModel.aggregate([
      { $group: { _id: "$staffType", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "staffmasters",
          localField: "_id",
          foreignField: "_id",
          as: "typeInfo"
        }
      },
      {
        $project: {
          typeName: { $arrayElemAt: ["$typeInfo.title", 0] },
          count: 1
        }
      }
    ]);
    
    res.json({ success: true, data: staffByType });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Staff Status Distribution
const getStaffStatus = async (req, res) => {
  try {
    const statusDistribution = await staffModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      {
        $project: {
          status: { 
            $cond: { if: { $eq: ["$_id", true] }, then: "Active", else: "Inactive" }
          },
          count: 1,
          _id: 0
        }
      }
    ]);
    
    res.json({ success: true, data: statusDistribution });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Staff Gender Distribution
const getStaffGender = async (req, res) => {
  try {
    const genderData = await staffModel.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } }
    ]);
    
    res.json({ success: true, data: genderData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { 
  getDashboardStats, 
  getRevenueChartData,
  getStaffByType,
  getStaffStatus,
  getStaffGender
};