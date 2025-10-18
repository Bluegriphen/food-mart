import express from "express";
import { placeOrder } from "../controllers/orderController.js";
<<<<<<< HEAD
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
=======
import { authMiddleware } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware,placeOrder);

export default orderRouter;
>>>>>>> b32db616d3f493326a8a499345dbaaf94957efd1
