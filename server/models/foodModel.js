import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// Use "Food" as the model name (Mongoose will create 'foods' collection)
const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;
