import mongoose from "mongoose"; 

// Define the structure for individual items within the order
const orderItemSchema = new mongoose.Schema({
    foodId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String } // Optional: Store the name for easy display
}, { _id: false }); // Disable automatic _id generation for array subdocuments

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    
    // Improved: items is now an array of structured subdocuments
    items: { type: [orderItemSchema], required: true },
    
    amount: { type: Number, required: true }, 
    address: { type: Object, required: true },
    status: { type: String, required: true, default: "pending" }, 
    date: { type: Date, default: Date.now }, 
    payment: { type: Boolean, default: false },
});


// Prevents model recompilation in watch mode
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;  