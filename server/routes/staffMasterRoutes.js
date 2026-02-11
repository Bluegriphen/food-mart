import express from "express";
import {createStaffType, getStaffTypes, updateStaffType, deleteStaffType } from "../controllers/staffMasterController";

const router = express.Router();

rotuer.post("/", createStaffType);
rotuer.get("/", getStaffTypes);
router.put("/:id", updateStaffType);
rotuer.delete("/:id", deleteStaffType);

export default router;