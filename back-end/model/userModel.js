import mongoose from "mongoose";
import validator from "validator";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone Number is required"],
    },
    photo: {
      data: Buffer,
      cantentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
