import Staff from "../models/staffModel.js";
import StaffMaster from "../models/staffMasterModel.js";

// Create new staff
export const createStaff = async (req, res) => {
  try {
    // Check if staff type exists
    const staffTypeExists = await StaffMaster.findById(req.body.staffType);
    if (!staffTypeExists) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid staff type" 
      });
    }

    // Check if email already exists
    const existingEmail = await Staff.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    // Check if phone number already exists
    const existingPhone = await Staff.findOne({ phoneNumber: req.body.phoneNumber });
    if (existingPhone) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone number already exists" 
      });
    }

    const staff = await Staff.create(req.body);
    
    // Populate staff type
    await staff.populate('staffType', 'title description');
    
    res.status(201).json({
      success: true,
      data: staff,
      message: "Staff created successfully"
    });
  } catch (err) {
    console.error("Error creating staff:", err);
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find()
      .populate('staffType', 'title description')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: staff,
      count: staff.length
    });
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Get single staff by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate('staffType', 'title description');

    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: "Staff not found" 
      });
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Update staff
export const updateStaff = async (req, res) => {
  try {
    // Check if staff exists
    const existingStaff = await Staff.findById(req.params.id);
    if (!existingStaff) {
      return res.status(404).json({ 
        success: false, 
        message: "Staff not found" 
      });
    }

    // If email is being updated, check if it's already taken
    if (req.body.email && req.body.email !== existingStaff.email) {
      const emailExists = await Staff.findOne({ 
        email: req.body.email,
        _id: { $ne: req.params.id }
      });
      if (emailExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Email already exists" 
        });
      }
    }

    // If phone is being updated, check if it's already taken
    if (req.body.phoneNumber && req.body.phoneNumber !== existingStaff.phoneNumber) {
      const phoneExists = await Staff.findOne({ 
        phoneNumber: req.body.phoneNumber,
        _id: { $ne: req.params.id }
      });
      if (phoneExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Phone number already exists" 
        });
      }
    }

    // If staff type is being updated, verify it exists
    if (req.body.staffType) {
      const staffTypeExists = await StaffMaster.findById(req.body.staffType);
      if (!staffTypeExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid staff type" 
        });
      }
    }

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('staffType', 'title description');

    res.json({
      success: true,
      data: staff,
      message: "Staff updated successfully"
    });
  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: "Staff not found" 
      });
    }

    res.json({
      success: true,
      message: "Staff deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Toggle staff status
export const toggleStaffStatus = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: "Staff not found" 
      });
    }

    staff.status = !staff.status;
    await staff.save();

    res.json({
      success: true,
      data: staff,
      message: `Staff ${staff.status ? 'activated' : 'deactivated'} successfully`
    });
  } catch (err) {
    console.error("Error toggling staff status:", err);
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Get staff by staff type
export const getStaffByType = async (req, res) => {
  try {
    const staff = await Staff.find({ staffType: req.params.typeId })
      .populate('staffType', 'title description');

    res.json({
      success: true,
      data: staff,
      count: staff.length
    });
  } catch (err) {
    console.error("Error fetching staff by type:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// Search staff
export const searchStaff = async (req, res) => {
  try {
    const { query } = req.query;
    
    const staff = await Staff.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } }
      ]
    }).populate('staffType', 'title description');

    res.json({
      success: true,
      data: staff,
      count: staff.length
    });
  } catch (err) {
    console.error("Error searching staff:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};