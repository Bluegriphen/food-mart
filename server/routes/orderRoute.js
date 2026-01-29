import express from "express";
import { placeOrder, listOrders, listAllOrders, updateStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js"; 

const orderRouter = express.Router();

// --- User Routes ---

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, listOrders); 

// --- Admin Routes ---

orderRouter.get("/list", listAllOrders); 
orderRouter.post("/status", updateStatus); 

export default orderRouter;