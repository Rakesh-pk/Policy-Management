import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// import policyRoutes from "./routes/policyRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", uploadRoutes);
// app.use("/api/policies", policyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
