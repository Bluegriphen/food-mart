import express from "express";
import {
  createStaffType,
  getStaffTypes,
  updateStaffType,
  deleteStaffType,
} from "../controllers/staffMasterController.js";

const staffMasterRouter = express.Router();

staffMasterRouter.post("/", createStaffType);
staffMasterRouter.get("/", getStaffTypes);
staffMasterRouter.put("/:id", updateStaffType);
staffMasterRouter.delete("/:id", deleteStaffType);

export default staffMasterRouter;
