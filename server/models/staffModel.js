import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phoneNumber: { 
      type: String, 
      required: true,
      match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    staffType: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'StaffMaster',
      required: true 
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'India' }
    },
    joiningDate: { type: Date, required: true },
    gender: { 
      type: String, 
      required: true,
      enum: ['Male', 'Female', 'Other']
    },
    about: { type: String, maxlength: 500 },
    cardColor: { 
      type: String, 
      default: '#3b82f6', // Default blue color
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color code']
    },
    pinCode: { 
      type: String, 
      required: true,
      minlength: 6,
      maxlength: 6,
      match: [/^[0-9]{6}$/, 'Pin code must be 6 digits']
    },
    status: { type: Boolean, default: true },
    profileImage: { type: String, default: null }
  },
  { timestamps: true }
);

// Virtual for full name
staffSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included in JSON output
staffSchema.set('toJSON', { virtuals: true });
staffSchema.set('toObject', { virtuals: true });

export default mongoose.model("Staff", staffSchema);