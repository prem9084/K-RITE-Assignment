import mongoose from "mongoose";

const DNSModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    photo: {
      data: Buffer,
      cantentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DNS", DNSModel);
