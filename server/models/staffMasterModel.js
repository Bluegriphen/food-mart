import mongoose from "mongoose";

const staffMasterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("StaffMaster", staffMasterSchema);
