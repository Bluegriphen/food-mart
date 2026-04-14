import express from "express";
import { 
  getDashboardStats, 
  getRevenueChartData,
  getStaffByType,
  getStaffStatus,
  getStaffGender,
  testRevenueData  // Add this import
} from "../controllers/dashboardController.js";

const router = express.Router();

// API endpoints for dashboard data
router.post("/stats", getDashboardStats);
router.get("/chart", getRevenueChartData);

// Staff analytics endpoints
router.get("/staff/distribution", getStaffByType);
router.get("/staff/status", getStaffStatus);
router.get("/staff/gender", getStaffGender);

// Test/Debug endpoint - Remove in production
router.get("/test-revenue", testRevenueData);  // Add this line

export default router;