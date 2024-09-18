import mongoose, { Mongoose } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [8, "Password must contain at least 8 characters!"],
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
