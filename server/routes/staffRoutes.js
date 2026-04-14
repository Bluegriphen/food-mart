import express from "express";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
  getStaffByType,
  searchStaff
} from "../controllers/staffController.js";

const staffRouter = express.Router();

// Basic CRUD routes
staffRouter.post("/", createStaff);
staffRouter.get("/", getAllStaff);
staffRouter.get("/search", searchStaff);
staffRouter.get("/by-type/:typeId", getStaffByType);
staffRouter.get("/:id", getStaffById);
staffRouter.put("/:id", updateStaff);
staffRouter.delete("/:id", deleteStaff);
staffRouter.patch("/:id/toggle-status", toggleStaffStatus);

export default staffRouter;