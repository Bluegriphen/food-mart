import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"; // Added order router
import ChatbotRoutes from "./routes/chatbot.routes.js";
<<<<<<< HEAD
import orderRouter from "./routes/orderRoute.js";
=======
import path from "path";
import "dotenv/config.js";
>>>>>>> b32db616d3f493326a8a499345dbaaf94957efd1

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
app.use("/api/order", orderRouter); // Order routes added
app.use("/api/bot/v1", ChatbotRoutes);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// DB connection + Start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
  });
