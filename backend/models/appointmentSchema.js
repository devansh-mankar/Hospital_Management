import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "first name must contain at least 3 characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "last name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: true,
    minLength: [validator.email, "Please provide a valid email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "phone must contain exact 10 digits!"],
    maxLength: [10, "phone must contain exact 10 digits!"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [10, "NIC must contain exact 10 digits!"],
    maxLength: [13, "NIC must contain exact 10 digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
    set: (value) => {
      // Parse the date in DD/MM/YYYY format
      const parts = value.split("/");
      if (parts.length === 3) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD
      }
      return value; // If format is incorrect, it will throw an error
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Accepted"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
