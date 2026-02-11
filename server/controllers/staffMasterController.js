import StaffMaster from "../models/staffMasterModel.js";

// Create staff type
export const createStaffType = async (req, res) => {
  try {
    const staff = await StaffMaster.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff types
export const getStaffTypes = async (req, res) => {
  try {
    const staff = await StaffMaster.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff type
export const updateStaffType = async (req, res) => {
  try {
    const staff = await StaffMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!staff)
      return res.status(404).json({ message: "Staff not found" });

    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff type
export const deleteStaffType = async (req, res) => {
  try {
    await StaffMaster.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
