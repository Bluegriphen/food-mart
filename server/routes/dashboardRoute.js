// routes/dashboardRoute.js (Corrected Version)
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getDashboardStats, getRevenueChartData } from "../controllers/dashboardController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// API endpoints for dashboard data
router.post("/stats", getDashboardStats);
router.get("/chart", getRevenueChartData);

// Admin Dashboard Page (HTML)
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

export default router;