import express from "express";
import { 
  getDashboardStats, 
  getRevenueChartData,
  getStaffByType,
  getStaffStatus,
  getStaffGender
} from "../controllers/dashboardController.js";

const router = express.Router();

// API endpoints for dashboard data
router.post("/stats", getDashboardStats);
router.get("/chart", getRevenueChartData);

// Staff analytics endpoints
router.get("/staff/distribution", getStaffByType);
router.get("/staff/status", getStaffStatus);
router.get("/staff/gender", getStaffGender);

export default router;