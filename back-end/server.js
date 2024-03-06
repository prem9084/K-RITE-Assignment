import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import morgan from "morgan";
import authRoute from "./routes/UserRoute.js";
import DNSRoute from "./routes/DNSRoute.js";
const app = express();

dotenv.config();

connectDB();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dns", DNSRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
