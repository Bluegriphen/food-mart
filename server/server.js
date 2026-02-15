import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import ChatbotRoutes from "./routes/chatbot.routes.js";
import staffMasterRouter from "./routes/staffMasterRoutes.js";  
import staffRouter from "./routes/staffRoutes.js";
import dashboardRouter from "./routes/dashboardRoute.js";  
import path from "path";
import "dotenv/config.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploads folder as static files
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "uploads")));

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/bot/v1", ChatbotRoutes);
app.use("/api/staff-master", staffMasterRouter);  
app.use("/api/staff", staffRouter);  
app.use("/api/dashboard", dashboardRouter);  

app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// DB connection + Start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server started on http://localhost:${port}`);
      console.log(`📊 Dashboard endpoints available at /api/dashboard`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
  });