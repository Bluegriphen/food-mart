import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js"; 

// --- EXISTING PLACE ORDER FUNCTION ---
const placeOrder = async (req, res) => {
  try {
    const userId = req.body.userId; 
    if (!userId) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login." });
    }
    
    const { 
      cart, firstName, lastName, email, street, city, state, 
      zipCode, country, phone, amount 
    } = req.body;

    if (!cart || Object.keys(cart).length === 0 || !amount) {
      return res.status(400).json({ success: false, message: "Invalid request data: cart or amount missing." });
    }
    
    // Fetch all necessary food details from the database
    const itemIds = Object.keys(cart);
    const foodItemsDetails = await foodModel.find({ _id: { $in: itemIds } });
    
    const foodMap = {};
    foodItemsDetails.forEach(item => {
        foodMap[item._id.toString()] = {
            name: item.name,
            price: item.price
        };
    });
    
    let serverCalculatedAmount = 0;
    
    const items = Object.entries(cart).map(([itemId, quantity]) => {
        const productDetails = foodMap[itemId];
        
        if (!productDetails) {
             throw new Error(`Product with ID ${itemId} not found in database.`);
        }

        const itemPrice = productDetails.price;
        serverCalculatedAmount += itemPrice * quantity;
        
        return {
            foodId: itemId,
            quantity: Number(quantity),
            price: itemPrice, 
            name: productDetails.name 
        };
    });
    
    const address = { firstName, lastName, email, street, city, state, zipCode, country, phone };

    const newOrder = new orderModel({
      userId,
      items,
      amount: serverCalculatedAmount, 
      address,
      status: "Order Placed", 
      payment: false 
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ 
      success: true, 
      message: "Order placed successfully! Please pay the delivery person."
    });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal server error during order placement." });
  }
};

// --- EXISTING USER ORDERS FUNCTION ---
const listOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not Authorized." });
        }

        const orders = await orderModel.find({ userId: userId }).sort({ date: -1 });
        res.json({ success: true, data: orders });

    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders." });
    }
};

// =====================================================
//    NEW ADMIN FUNCTIONS
// =====================================================

/**
 * @desc Retrieves ALL orders from the database for the Admin Panel
 * @route GET /api/order/list
 * @access Admin (Should ideally be protected by admin middleware)
 */
const listAllOrders = async (req, res) => {
    try {
        // Fetch all orders, empty filter {} gets everything
        // Sort by 'date' descending (-1) so admins see new orders first
        const orders = await orderModel.find({}).sort({ date: -1 }); 
        
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}

/**
 * @desc Updates the status of an order (e.g., "Food Processing", "Out for Delivery")
 * @route POST /api/order/status
 * @access Admin
 */
const updateStatus = async (req, res) => {
    try {
        // We need the Order ID and the new Status string
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status: status });
        
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.json({ success: false, message: "Error updating status" });
    }
}

// Don't forget to export the new functions!
export { placeOrder, listOrders, listAllOrders, updateStatus };