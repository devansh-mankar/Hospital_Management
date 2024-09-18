import mongoose, { Mongoose } from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [15, "message must contain at least 15 characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
