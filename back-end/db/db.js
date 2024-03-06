import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connecting to Database ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
