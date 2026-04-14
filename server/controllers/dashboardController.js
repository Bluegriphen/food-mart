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
        { $match: { status: "Delivered" } }, // Only count delivered orders
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
        // Create date range with proper timezone handling
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(today.getMonth() - months);
    startDate.setHours(0, 0, 0, 0); // Start from beginning of the day
    
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999); // End of today
    
    console.log("Date range:", { startDate, endDate });
    
    const chartData = await orderModel.aggregate([
      {
        $match: {
          date: {
             $gte: startDate,
            $lte: endDate
          },
          status: "Delivered"  // Only count orders marked as Delivered by admin
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          revenue: { $sum: "$amount" },
          orders: { $sum: 1 },
          // Optional: Track average order value
          avgOrderValue: { $avg: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          revenue: 1,
          orders: 1,
          avgOrderValue: { $round: ["$avgOrderValue", 2] }
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);
      console.log("Chart data found:", chartData);
    // Format month numbers to names for better readability
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const formattedData = chartData.map(item => ({
      ...item,
      monthName: monthNames[item.month - 1],
      label: `${monthNames[item.month - 1]} ${item.year}`
    }));
    
    res.json({ success: true, data: formattedData || [] });
    
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


// Add to your dashboard controller for testing
const testRevenueData = async (req, res) => {
  try {
    // Get all delivered orders
    const deliveredOrders = await orderModel.find({ status: "Delivered" });
    
    // Calculate total revenue manually
    let manualTotal = 0;
    deliveredOrders.forEach(order => {
      manualTotal += order.amount || 0;
    });
    
    // Check what your aggregate query returns
    const aggregateResult = await orderModel.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    res.json({
      success: true,
      debug: {
        deliveredCount: deliveredOrders.length,
        manualTotalRevenue: manualTotal,
        aggregateResult: aggregateResult,
        sampleOrder: deliveredOrders[0] // First order as sample
      }
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};


export { 
  getDashboardStats, 
  getRevenueChartData,
  getStaffByType,
  getStaffStatus,
  getStaffGender,
  testRevenueData 
};